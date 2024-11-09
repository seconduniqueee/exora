import { Global, Module } from "@nestjs/common";
import { UserMapper } from "./user/user.mapper";
import { ServiceMapper } from "./service/service.mapper";
import { NamedEntityMapper } from "./named-entity/named-entity.mapper";

@Global()
@Module({
  providers: [UserMapper, ServiceMapper, NamedEntityMapper],
  exports: [UserMapper, ServiceMapper, NamedEntityMapper],
})
export class DataMappingModule {}
