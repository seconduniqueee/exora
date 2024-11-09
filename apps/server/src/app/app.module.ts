import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { DataAccessModule } from "./data-access/data-access.module";
import { AccessTokenGuard } from "./auth/common/guards";
import { APP_GUARD } from "@nestjs/core";
import { UsersModule } from "./users/users.module";
import { DataMappingModule } from "./common/mapping/data-mapping.module";
import { ServicesModule } from "./services/services.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DataAccessModule,
    DataMappingModule,
    AuthModule,
    UsersModule,
    ServicesModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AccessTokenGuard }],
})
export class AppModule {}
