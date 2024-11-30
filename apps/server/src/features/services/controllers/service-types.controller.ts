import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ServiceTypesService } from "../services/service-types.service";
import { NamedEntityDto } from "../../../common";

@ApiTags("ServiceTypes")
@Controller()
export class ServiceTypesController {
  constructor(private service: ServiceTypesService) {}

  @Get("service-types")
  getServiceTypes(): Promise<NamedEntityDto[]> {
    return this.service.getAll();
  }
}
