import { Controller, Get, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { ApiTags } from "@nestjs/swagger";
import { UserID } from "../../auth/decorators";
import { UserDto } from "../../common/dto";
import { GetUserQuery } from "../dto";

@ApiTags("Users")
@Controller("user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("user-info")
  @HttpCode(HttpStatus.OK)
  getUserInfo(@UserID() userID: number, @Query() query: GetUserQuery): Promise<UserDto> {
    console.log(query.includeRole);
    return this.usersService.getUserByID(userID, query.includeRole);
  }
}
