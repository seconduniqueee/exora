import { AuthGuard } from "@nestjs/passport";
import { JWT_RT_STRATEGY } from "../models";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RefreshTokenGuard extends AuthGuard(JWT_RT_STRATEGY) {
  constructor() {
    super();
  }
}
