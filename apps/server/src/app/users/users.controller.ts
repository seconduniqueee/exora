import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { QueryBoolPipe } from "../common/pipes";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":id")
  getUserByID(
    @Param("id", ParseIntPipe) id: number,
    @Query("includeRole", QueryBoolPipe) includeRole: boolean
  ) {
    return this.usersService.getUserByID(id, includeRole);
  }
}
