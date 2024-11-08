import {
  AuthResponseModel,
  LoginRequestModel,
  MessageModel,
  NamedEntityModel,
  SignupRequestModel,
  TokensModel,
  UpdatePasswordRequestModel,
  UserModel,
} from "@exora/shared-models";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class MessageDto implements MessageModel {
  message: string;
}

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

export class NamedEntityDto implements NamedEntityModel {
  id: number;
  name: string;
}

export class AuthResponseDto implements AuthResponseModel {
  tokens: TokensDto;
  isSuccess: boolean;
  errorMessage: string;
}

export class UserDataDto implements UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  roleID: number;
  role: NamedEntityDto;
}
