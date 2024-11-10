import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { DataAccessModule } from "./data-access/data-access.module";
import { AccessTokenGuard } from "./auth/guards";
import { APP_GUARD } from "@nestjs/core";
import { UsersModule } from "./users/users.module";
import { ServicesModule } from "./services/services.module";
import { MappingModule } from "./common/mapping/mapping.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DataAccessModule,
    MappingModule,
    AuthModule,
    UsersModule,
    ServicesModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AccessTokenGuard }],
})
export class AppModule {}
