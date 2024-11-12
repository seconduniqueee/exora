import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import {
  AuthResponseDto,
  LoginRequestDto,
  SignupRequestDto,
  TokensDto,
  UpdatePasswordRequestDto,
} from "../dto";
import { Request } from "express";
import { RefreshTokenGuard } from "../guards";
import { ActionResultDto, Public, UserID } from "../../common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("sign-up")
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() request: SignupRequestDto): Promise<AuthResponseDto> {
    return this.authService.signUp(request);
  }

  @Public()
  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  login(@Body() request: LoginRequestDto): Promise<AuthResponseDto> {
    return this.authService.logIn(request);
  }

  @Post("log-out")
  @HttpCode(HttpStatus.OK)
  logout(@UserID() userID: number): Promise<void> {
    return this.authService.logOut(userID);
  }

  @Post("update-password")
  @HttpCode(HttpStatus.NO_CONTENT)
  updatePassword(
    @UserID() userID: number,
    @Body() request: UpdatePasswordRequestDto,
  ): Promise<ActionResultDto> {
    return this.authService.updatePassword(userID, request);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post("refreshToken")
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() request: Request): Promise<TokensDto> {
    let user = request.user;
    return this.authService.refreshToken(user["sub"], user["refreshToken"]);
  }
}
