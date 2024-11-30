import { Injectable } from "@nestjs/common";
import { MappingService } from "../../../common";
import { DataAccessService } from "../../../database/services";
import { CreateServiceRequestDto, ServiceDto } from "../dto/service.dto";
import { Service } from "@prisma/client";

@Injectable()
export class ServicesService {
  constructor(
    private dbService: DataAccessService,
    private mapper: MappingService,
  ) {}

  async createService(request: CreateServiceRequestDto): Promise<ServiceDto> {
    let service: Service = await this.dbService.service.create({ data: { ...request } });
    return this.mapper.map(ServiceDto, service);
  }
}
