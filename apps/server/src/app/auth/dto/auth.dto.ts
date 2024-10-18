import { LoginRequestModel, SignupRequestModel } from "@exora/shared-models";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginRequest implements LoginRequestModel {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  get passwordLength(): number {
    return this.password.length;
  }
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
  phone?: string;
}
