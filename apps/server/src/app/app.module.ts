import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { DataAccessModule } from "./data-access/data-access.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DataAccessModule, AuthModule],
})
export class AppModule {}
