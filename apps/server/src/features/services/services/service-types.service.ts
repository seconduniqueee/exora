import { Injectable } from "@nestjs/common";
import { MappingService, NamedEntityDto } from "../../../common";
import { DataAccessService } from "../../../database/services";

@Injectable()
export class ServiceTypesService {
  constructor(
    private dbService: DataAccessService,
    private mapper: MappingService,
  ) {}

  async getServiceTypes(): Promise<NamedEntityDto[]> {
    let serviceTypes = await this.dbService.serviceType.findMany({ orderBy: { name: "asc" } });
    return this.mapper.mapMany(NamedEntityDto, serviceTypes);
  }
}
