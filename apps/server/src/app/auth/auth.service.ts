import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { DataAccessService } from "../data-access/data-access.service";
import { AuthResponseModel, TokensModel, UserInfoModel } from "@exora/shared-models";
import { LoginRequest, SignupRequest, UpdatePasswordRequest } from "./dto";
import { User } from "@prisma/client";
import * as argon from "argon2";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private dbService: DataAccessService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async signUp(request: SignupRequest): Promise<AuthResponseModel> {
    await this.checkIfUserExists(request.email);

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

    return { tokens };
  }

  async logIn(request: LoginRequest): Promise<AuthResponseModel> {
    let user = await this.dbService.user.findUnique({ where: { email: request.email } });
    let passwordMatch = !!user && (await argon.verify(user.hash, request.password));

    if (!passwordMatch) throw new UnauthorizedException("Invalid credentials");

    // TODO implement max login attempts

    let tokens = await this.getTokens(user.id, user.email);

    await this.updateRefreshTokenHash(tokens.refreshToken, user.id);

    return { tokens };
  }

  async logOut(userID: number): Promise<void> {
    await this.dbService.user.updateMany({
      where: { id: userID, hashedRt: { not: null } },
      data: { hashedRt: null },
    });
  }

  async updatePassword(userID: number, request: UpdatePasswordRequest): Promise<void> {
    let user = await this.getUserByID(userID);
    let passwordMatch = !!user && (await argon.verify(user.hash, request.currentPassword));

    if (!passwordMatch) throw new ForbiddenException("Access Denied");

    // TODO implement password history (length 5?)
    // TODO make sure password is not present in password history
    // TODO implement max changePassword attempts

    let hash = await argon.hash(request.newPassword);

    await this.dbService.user.update({ where: { id: user.id }, data: { hash } });
  }

  async refreshToken(userID: number, refreshToken: string): Promise<TokensModel> {
    let user = await this.getUserByID(userID);
    let refreshTokenMatch = user && (await argon.verify(user.hashedRt, refreshToken));

    if (!refreshTokenMatch) throw new ForbiddenException("Access denied");

    let tokens = await this.getTokens(user.id, user.email);

    await this.updateRefreshTokenHash(tokens.refreshToken, user.id);

    return tokens;
  }

  async getUser(userID: number): Promise<UserInfoModel> {
    let user = await this.dbService.user.findUnique({ where: { id: userID } });

    if (!user) throw new NotFoundException("User does not exist");

    return await this.getUserInfo(user);
  }

  private async getUserInfo(user: User): Promise<UserInfoModel> {
    let role = await this.dbService.role.findUnique({ where: { id: user.roleId } });

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      roleID: user.roleId,
      role: role,
    };
  }

  private async getTokens(userID: number, email: string): Promise<TokensModel> {
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

  private async checkIfUserExists(email: string): Promise<void> {
    let user = await this.dbService.user.findUnique({ where: { email: email } });
    if (user) throw new ConflictException("User with provided email already exists");
  }

  private async updateRefreshTokenHash(refreshToken: string, userID: number): Promise<void> {
    let hashedRt = await argon.hash(refreshToken);
    await this.dbService.user.update({ where: { id: userID }, data: { hashedRt } });
  }

  private getUserByID(userID: number): Promise<User> {
    console.log(userID, "MLEEEEEEEEEEEEEEEEEEEEEM");
    return this.dbService.user.findUnique({ where: { id: userID } });
  }
}
