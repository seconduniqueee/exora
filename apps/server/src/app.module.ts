import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { AccessTokenGuard } from "./authentication/guards";
import { AuthenticationModule } from "./authentication/authentication.module";
import { FeaturesModule } from "./features/features.module";
import { CommonModule } from "./common";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    AuthenticationModule,
    DatabaseModule,
    FeaturesModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AccessTokenGuard }],
})
export class AppModule {}
