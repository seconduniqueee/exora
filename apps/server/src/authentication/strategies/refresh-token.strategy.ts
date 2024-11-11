import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_RT_STRATEGY, JwtPayload } from "../models";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, JWT_RT_STRATEGY) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get("JWT_RT_SECRET_KEY"),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload): JwtPayload {
    let refreshToken = req.get("authorization").replace("Bearer ", "").trim();
    return { ...payload, refreshToken };
  }
}
