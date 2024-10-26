import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { DataAccessModule } from "./data-access/data-access.module";
import { AccessTokenGuard } from "./auth/common/guards";
import { APP_GUARD } from "@nestjs/core";
import { UserModule } from "./apps/server/src/app/user/user.module";
import { UserModule } from "./user.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DataAccessModule, AuthModule, UserModule],
  providers: [{ provide: APP_GUARD, useClass: AccessTokenGuard }],
})
export class AppModule {}
