import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "@prisma/client";
import { DataAccessService } from "../../data-access/services";
import { MappingService } from "../../common/mapping";
import { UserDto } from "../../common/dto";

@Injectable()
export class UsersService {
  constructor(
    private dbService: DataAccessService,
    private mapper: MappingService,
  ) {}

  async getUserByID(userID: number, includeRole = false): Promise<UserDto> {
    let user = await this.getUser(userID, includeRole);
    return this.mapper.map(UserDto, user);
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
