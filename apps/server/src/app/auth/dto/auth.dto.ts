import { LoginRequestModel, SignupRequestModel } from "@exora/shared-models";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class LoginRequest implements LoginRequestModel {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignupRequest implements SignupRequestModel {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, { message: "Password doesn't match the requirements" })
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsString()
  phone?: string;
}
