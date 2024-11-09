import { Module } from "@nestjs/common";
import { ServiceTypesController } from "./controllers/service-types.controller";
import { ServiceTypesService } from "./services/service-types.service";

@Module({
  controllers: [ServiceTypesController],
  providers: [ServiceTypesService],
})
export class ServicesModule {}
