import {
  AuthResponseModel,
  LoginRequestModel,
  SignupRequestModel,
  TokensModel,
  UpdatePasswordRequestModel,
} from "@exora/shared-models";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginRequestDto implements LoginRequestModel {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdatePasswordRequestDto implements UpdatePasswordRequestModel {
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

export class SignupRequestDto implements SignupRequestModel {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsString()
  phone?: string;
}

export class TokensDto implements TokensModel {
  accessToken: string;
  refreshToken: string;
}

export class AuthResponseDto implements AuthResponseModel {
  tokens: TokensDto;
  isSuccess: boolean;
  errorMessage: string;
}
