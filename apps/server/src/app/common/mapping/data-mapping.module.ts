import { Global, Module } from "@nestjs/common";
import { UserMapper } from "./user/user.mapper";

@Global()
@Module({
  providers: [UserMapper],
  exports: [UserMapper],
})
export class DataMappingModule {}
