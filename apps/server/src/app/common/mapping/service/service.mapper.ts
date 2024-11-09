import { Injectable } from "@nestjs/common";
import { Service as PrismaService } from "@prisma/client";
import { NamedEntityModel, ServiceModel } from "@exora/shared-models";

@Injectable()
export class ServiceMapper {
  map(dbService: PrismaService): ServiceModel {
    let service = dbService as Service;

    return {
      id: service.id,
      serviceTypeID: service.service_type_id,
      name: service.name,
      description: service.description,
      price: service.price.toNumber(),
      serviceType: service.serviceType,
    };
  }
}

export interface Service extends PrismaService {
  serviceType: NamedEntityModel;
}
