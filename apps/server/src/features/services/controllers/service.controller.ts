import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateServiceRequestDto, ServiceDto } from "../dto/service.dto";
import { ServicesService } from "../services/services.service";

@ApiTags("Services")
@Controller()
export class ServicesController {
  constructor(private service: ServicesService) {}

  @Get("services")
  getServices(): Promise<ServiceDto[]> {
    return this.service.getAll();
  }

  @Post("service")
  createService(@Body() request: CreateServiceRequestDto): Promise<ServiceDto> {
    return this.service.createService(request);
  }
}
