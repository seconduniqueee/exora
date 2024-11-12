import { Controller, Get, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { ApiTags } from "@nestjs/swagger";
import { GetUserQuery } from "../dto";
import { UserDto, UserID } from "../../../common";

@ApiTags("Users")
@Controller("user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("user-info")
  @HttpCode(HttpStatus.OK)
  getUserInfo(@UserID() userID: number, @Query() query: GetUserQuery): Promise<UserDto> {
    return this.usersService.getUserByID(userID, query.includeRole);
  }
}
