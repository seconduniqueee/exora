import { Injectable } from "@nestjs/common";
import { Role, User as PrismaUser } from "@prisma/client";
import { UserModel } from "@exora/shared-models";

@Injectable()
export class UserMapper {
  map(dbUser: PrismaUser): UserModel {
    let user = dbUser as User;

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      roleID: user.roleId,
      role: user.role,
    };
  }
}

export interface User extends PrismaUser {
  role: Role;
}
