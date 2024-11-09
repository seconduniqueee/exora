import { Injectable } from "@nestjs/common";
import { DataAccessService } from "../../data-access/data-access.service";
import { NamedEntityModel } from "@exora/shared-models";
import { NamedEntityMapper } from "../../common/mapping/named-entity/named-entity.mapper";

@Injectable()
export class ServiceTypesService {
  constructor(
    private dbService: DataAccessService,
    private namedEntityMapper: NamedEntityMapper,
  ) {}

  async getServiceTypes(): Promise<NamedEntityModel[]> {
    let serviceTypes = await this.dbService.serviceType.findMany({ orderBy: { name: "asc" } });
    return this.namedEntityMapper.mapMany(serviceTypes);
  }
}
