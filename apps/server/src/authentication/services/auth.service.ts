import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { DataAccessService } from "../../database/services";
import {
  AuthResponseDto,
  LoginRequestDto,
  SignupRequestDto,
  TokensDto,
  UpdatePasswordRequestDto,
} from "../dto";
import { PasswordHistory, User } from "@prisma/client";
import * as argon from "argon2";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { MAX_PASSWORDS_STORED } from "../models";
import { Base64Helper } from "../../common/helpers/base64.helper";
import { ActionResultDto } from "../../common/dto";
import { MappingService } from "../../common/mapping";

@Injectable()
export class AuthService {
  constructor(
    private dbService: DataAccessService,
    private jwtService: JwtService,
    private authMapper: MappingService,
    private configService: ConfigService,
  ) {}

  async signUp(request: SignupRequestDto): Promise<AuthResponseDto> {
    let userExists = await this.checkIfUserExists(request.email);

    if (userExists) return this.getAuthResponse(null, "User with provided email already exists");

    let hash = await argon.hash(request.password);
    let user = await this.dbService.user.create({
      data: {
        firstName: request.firstName,
        lastName: request.lastName,
        phone: request.phone,
        hash: hash,
        email: request.email,
      },
    });

    let tokens = await this.getTokens(user.id, user.email);

    await this.updateRefreshTokenHash(tokens.refreshToken, user.id);
    await this.updatePasswordHistory(user.id, hash);

    return this.getAuthResponse(tokens);
  }

  async logIn(request: LoginRequestDto): Promise<AuthResponseDto> {
    let user = await this.dbService.user.findUnique({ where: { email: request.email } });
    let passwordMatch = !!user && (await argon.verify(user.hash, request.password));

    if (!passwordMatch) {
      return this.getAuthResponse(null, "Provided email or password is incorrect");
    }

    let tokens = await this.getTokens(user.id, user.email);

    await this.updateRefreshTokenHash(tokens.refreshToken, user.id);

    return this.getAuthResponse(tokens);
  }

  async logOut(userID: number): Promise<void> {
    await this.dbService.user.updateMany({
      where: { id: userID, hashedRt: { not: null } },
      data: { hashedRt: null },
    });
  }

  async updatePassword(
    userID: number,
    request: UpdatePasswordRequestDto,
  ): Promise<ActionResultDto> {
    let user = await this.getUserByID(userID);
    let passwordMatch = await argon.verify(user.hash, request.currentPassword);

    if (!passwordMatch) throw new ForbiddenException("Access Denied");

    let passwordHash = await argon.hash(request.newPassword);
    let passwordUnused = await this.isUnusedPassword(userID, request.newPassword);

    if (!passwordUnused) {
      let message = "This password has been used recently. Please choose a different password.";
      return { isSuccess: false, errorMessage: message };
    }

    await this.updatePasswordHistory(userID, passwordHash);
    await this.dbService.user.update({ where: { id: user.id }, data: { hash: passwordHash } });

    return { isSuccess: true };
  }

  async refreshToken(userID: number, refreshToken: string): Promise<TokensDto> {
    let user = await this.getUserByID(userID);
    let refreshTokenMatch = user && (await argon.verify(user.hashedRt, refreshToken));

    if (!refreshTokenMatch) throw new ForbiddenException("Access denied");

    let tokens = await this.getTokens(user.id, user.email);

    await this.updateRefreshTokenHash(tokens.refreshToken, user.id);

    return tokens;
  }

  private async getTokens(userID: number, email: string): Promise<TokensDto> {
    let payload = { sub: userID, email };
    let atConfig = { expiresIn: 60 * 15, secret: this.configService.get("JWT_AT_SECRET_KEY") };
    let rtConfig = {
      expiresIn: 60 * 60 * 24 * 15,
      secret: this.configService.get("JWT_RT_SECRET_KEY"),
    };

    let [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, atConfig),
      this.jwtService.signAsync(payload, rtConfig),
    ]);

    return { accessToken, refreshToken };
  }

  private async checkIfUserExists(email: string): Promise<boolean> {
    let user = await this.dbService.user.findUnique({ where: { email: email } });
    return !!user;
  }

  private async updateRefreshTokenHash(refreshToken: string, userID: number): Promise<void> {
    let hashedRt = await argon.hash(refreshToken);
    await this.dbService.user.update({ where: { id: userID }, data: { hashedRt } });
  }

  private async getUserByID(userID: number, includeRole = false): Promise<User> {
    let user = await this.dbService.user.findUnique({
      where: { id: userID },
      include: { role: includeRole },
    });

    if (!user) throw new NotFoundException("User does not exist");

    return user;
  }

  private async updatePasswordHistory(
    userID: number,
    passwordHash: string,
  ): Promise<PasswordHistory> {
    let entity = await this.dbService.passwordHistory.findUnique({ where: { userID } });
    let history: string[] = entity ? Base64Helper.parse<string[]>(entity.passwordHistory) : [];

    history.push(passwordHash);

    if (history.length > MAX_PASSWORDS_STORED) {
      history = history.slice(-MAX_PASSWORDS_STORED);
    }

    let encoded = Base64Helper.encode(history);
    let data = { passwordHistory: encoded, userID };
    let result = entity
      ? await this.dbService.passwordHistory.update({ where: { userID }, data })
      : await this.dbService.passwordHistory.create({ data });

    return result;
  }

  private async isUnusedPassword(userID: number, password: string): Promise<boolean> {
    let entity = await this.dbService.passwordHistory.findUnique({ where: { userID } });

    if (!entity) return true;

    let history = Base64Helper.parse<string[]>(entity.passwordHistory);
    let passwordsCheck = history.map((hash) => argon.verify(hash, password));
    let passwordUsed = (await Promise.all(passwordsCheck)).some(Boolean);

    return !passwordUsed;
  }

  private getAuthResponse(tokens: TokensDto, errorMessage?: string): AuthResponseDto {
    return { tokens, errorMessage, isSuccess: !!tokens };
  }
}
