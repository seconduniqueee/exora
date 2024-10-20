import { AuthGuard } from "@nestjs/passport";
import { JWT_AT_STRATEGY } from "../../auth.model";

export class AccessTokenGuard extends AuthGuard(JWT_AT_STRATEGY) {}
