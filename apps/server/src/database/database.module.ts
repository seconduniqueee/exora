import { Global, Module } from "@nestjs/common";
import { DataAccessService } from "./services";

@Global()
@Module({
  providers: [DataAccessService],
  exports: [DataAccessService],
})
export class DatabaseModule {}
