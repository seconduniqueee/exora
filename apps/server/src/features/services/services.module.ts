import { Module } from "@nestjs/common";
import { ServiceTypesController } from "./controllers/service-types.controller";
import { ServiceTypesService } from "./services/service-types.service";
import { ServicesController } from "./controllers/service.controller";
import { ServicesService } from "./services/services.service";

@Module({
  controllers: [ServiceTypesController, ServicesController],
  providers: [ServiceTypesService, ServicesService],
})
export class ServicesModule {}
