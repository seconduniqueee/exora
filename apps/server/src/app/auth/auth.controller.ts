import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  Tokens,
  UpdatePasswordRequest,
  UserData,
} from "./dto";
import { Request } from "express";
import { RefreshTokenGuard } from "./common/guards";
import { Public, UserID } from "./common/decorators";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("sign-up")
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() request: SignupRequest): Promise<AuthResponse> {
    return this.authService.signUp(request);
  }

  @Public()
  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  login(@Body() request: LoginRequest): Promise<AuthResponse> {
    return this.authService.logIn(request);
  }

  @Post("log-out")
  @HttpCode(HttpStatus.OK)
  logout(@UserID() userID: number): Promise<void> {
    return this.authService.logOut(userID);
  }

  @Post("update-password")
  @HttpCode(HttpStatus.NO_CONTENT)
  updatePassword(@UserID() userID: number, @Body() request: UpdatePasswordRequest): Promise<void> {
    return this.authService.updatePassword(userID, request);
  }

  @Get("user-info")
  @HttpCode(HttpStatus.OK)
  getUserInfo(@UserID() userID: number): Promise<UserData> {
    return this.authService.getUserInfo(userID);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post("refreshToken")
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() request: Request): Promise<Tokens> {
    let user = request.user;
    return this.authService.refreshToken(user["sub"], user["refreshToken"]);
  }
}
