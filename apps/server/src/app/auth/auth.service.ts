import { Injectable } from '@nestjs/common';
import { SimpleMessage } from '@exora/shared-models';

@Injectable({})
export class AuthService {
  signUp(): SimpleMessage {
    return { message: 'Here is sign up' };
  }

  logIn(): SimpleMessage {
    return { message: "I'm login" };
  }
}
