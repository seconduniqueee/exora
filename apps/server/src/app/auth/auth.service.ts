import { Injectable, UnauthorizedException } from "@nestjs/common";
import { DataAccessService } from "../data-access/data-access.service";
import { AuthResponseModel, UserInfoModel } from "@exora/shared-models";
import { LoginRequest, SignupRequest } from "./dto";
import * as argon from "argon2";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(private dbService: DataAccessService) {}

  async signUp(request: SignupRequest): Promise<AuthResponseModel> {
    let hash = await argon.hash(request.password);
    let user = await this.dbService.user.create({
      data: {
        firstName: request.firstName,
        lastName: request.lastName,
        hash: hash,
        email: request.email,
      },
    });
    let userInfo = await this.getUserInfo(user);

    return { userInfo: userInfo };
  }

  async logIn(request: LoginRequest): Promise<AuthResponseModel> {
    let user = await this.dbService.user.findUnique({ where: { email: request.email } });
    let passwordMatch = !!user && (await argon.verify(user.hash, request.password));

    if (!passwordMatch) {
      throw new UnauthorizedException("Invalid credentials");
    }

    let userInfo = await this.getUserInfo(user);

    return { userInfo };
  }

  async getUser(userID: number): Promise<UserInfoModel> {
    let user = await this.dbService.user.findUnique({ where: { id: userID } });
    return await this.getUserInfo(user);
  }

  private async getUserInfo(user: User): Promise<UserInfoModel> {
    let role = await this.dbService.role.findUnique({ where: { id: user.roleId } });

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roleID: user.roleId,
      role: role,
    };
  }
}
