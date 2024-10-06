import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SimpleMessage } from '@exora/shared-models';

@Controller({})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("sign-up")
  signUp(): SimpleMessage {
    return this.authService.signUp();
  }

  @Post('log-in')
  login(): SimpleMessage {
    return this.authService.logIn();
  }
}
