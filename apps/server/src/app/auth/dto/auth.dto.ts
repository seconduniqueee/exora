import {
  AuthResponseModel,
  LoginRequestModel,
  NamedEntityModel,
  SignupRequestModel,
  TokensModel,
  UpdatePasswordRequestModel,
  UserModel,
} from "@exora/shared-models";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginRequest implements LoginRequestModel {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdatePasswordRequest implements UpdatePasswordRequestModel {
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

export class SignupRequest implements SignupRequestModel {
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

export class Tokens implements TokensModel {
  accessToken: string;
  refreshToken: string;
}

export class NamedEntity implements NamedEntityModel {
  id: number;
  name: string;
}

export class AuthResponse implements AuthResponseModel {
  tokens: Tokens;
}

export class UserData implements UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  roleID: number;
  role: NamedEntity;
}
