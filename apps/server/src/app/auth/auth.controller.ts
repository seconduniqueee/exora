import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResponseModel, TokensModel, UserInfoModel } from "@exora/shared-models";
import { LoginRequest, SignupRequest } from "./dto";
import { Request } from "express";
import { AccessTokenGuard, RefreshTokenGuard } from "./common/guards";
import { UserID } from "./common/decorators";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("sign-up")
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() request: SignupRequest): Promise<AuthResponseModel> {
    return this.authService.signUp(request);
  }

  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  login(@Body() request: LoginRequest): Promise<AuthResponseModel> {
    return this.authService.logIn(request);
  }

  @UseGuards(AccessTokenGuard)
  @Post("log-out")
  @HttpCode(HttpStatus.OK)
  logout(@UserID() userID: number): Promise<void> {
    return this.authService.logOut(userID);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() request: Request): Promise<TokensModel> {
    let user = request.user;
    return this.authService.refreshToken(user["sub"], user["refreshToken"]);
  }

  @Get("user/:id")
  getUser(@Param("id", ParseIntPipe) id: number): Promise<UserInfoModel> {
    return this.authService.getUser(id);
  }
}
