import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResponseModel, UserInfoModel } from "@exora/shared-models";
import { LoginRequest, SignupRequest } from "./dto";

@Controller({})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("sign-up")
  async signUp(@Body() request: SignupRequest): Promise<AuthResponseModel> {
    return await this.authService.signUp(request);
  }

  @Post("sign-in")
  async login(@Body() request: LoginRequest): Promise<AuthResponseModel> {
    return await this.authService.logIn(request);
  }

  @Get("user/:id")
  async getUser(@Param("id", ParseIntPipe) id: number): Promise<UserInfoModel> {
    return await this.authService.getUser(id);
  }
}
