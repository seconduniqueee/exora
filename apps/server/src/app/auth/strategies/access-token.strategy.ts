import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { JWT_AT_STRATEGY, JwtPayload } from "../models";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, JWT_AT_STRATEGY) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get("JWT_AT_SECRET_KEY"),
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
