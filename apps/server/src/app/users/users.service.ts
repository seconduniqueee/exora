import { Injectable, NotFoundException } from "@nestjs/common";
import { DataAccessService } from "../data-access/data-access.service";
import { UserModel } from "@exora/shared-models";
import { UserMapper } from "../common/mapping/user/user.mapper";
import { User } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private dbService: DataAccessService, private userMapper: UserMapper) {}

  async getUserByID(userID: number, includeRole = false): Promise<UserModel> {
    let user = await this.getUser(userID, includeRole);
    return this.userMapper.map(user);
  }

  private async getUser(userID: number, includeRole = false): Promise<User> {
    let user = await this.dbService.user.findUnique({
      where: { id: userID },
      include: { role: includeRole },
    });

    if (!user) throw new NotFoundException(`User with ID ${userID} not found`);

    return user;
  }
}
