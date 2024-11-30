import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ServiceTypesService } from "../services/service-types.service";
import { NamedEntityDto } from "../../../common";

@ApiTags("ServiceTypes")
@Controller("service-type")
export class ServiceTypesController {
  constructor(private service: ServiceTypesService) {}

  @Get("")
  getServiceTypes(): Promise<NamedEntityDto[]> {
    return this.service.getServiceTypes();
  }
}
