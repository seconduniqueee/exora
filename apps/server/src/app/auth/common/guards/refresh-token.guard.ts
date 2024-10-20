import { AuthGuard } from "@nestjs/passport";
import { JWT_RT_STRATEGY } from "../../auth.model";

export class RefreshTokenGuard extends AuthGuard(JWT_RT_STRATEGY) {}
