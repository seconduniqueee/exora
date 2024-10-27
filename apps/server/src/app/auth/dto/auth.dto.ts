import {
  LoginRequestModel,
  SignupRequestModel,
  UpdatePasswordRequestModel,
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
