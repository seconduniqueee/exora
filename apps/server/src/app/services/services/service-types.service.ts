import { Injectable } from "@nestjs/common";
import { DataAccessService } from "../../data-access/services";
import { MappingService } from "../../common/mapping";
import { NamedEntityDto } from "../../common/dto";

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
