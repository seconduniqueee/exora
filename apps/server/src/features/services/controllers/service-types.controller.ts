import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ServiceTypesService } from "../services/service-types.service";
import { NamedEntityDto } from "../../../common";

@ApiTags("ServiceTypes")
@Controller("service-types")
export class ServiceTypesController {
  constructor(private service: ServiceTypesService) {}

  @Get("")
  getServiceById(): Promise<NamedEntityDto[]> {
    return this.service.getServiceTypes();
  }
}
