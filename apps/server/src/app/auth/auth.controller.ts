import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResponseModel, TokensModel } from "@exora/shared-models";
import { LoginRequest, SignupRequest, UpdatePasswordRequest } from "./dto";
import { Request } from "express";
import { RefreshTokenGuard } from "./common/guards";
import { Public, UserID } from "./common/decorators";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("sign-up")
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() request: SignupRequest): Promise<AuthResponseModel> {
    return this.authService.signUp(request);
  }

  @Public()
  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  login(@Body() request: LoginRequest): Promise<AuthResponseModel> {
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

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() request: Request): Promise<TokensModel> {
    let user = request.user;
    return this.authService.refreshToken(user["sub"], user["refreshToken"]);
  }
}
