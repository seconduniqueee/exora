import { Injectable } from "@angular/core";
import { ServiceTypesClient } from "../../core/api/api-client";
import { NamedEntityModel } from "@exora/shared-models";
import { firstValueFrom } from "rxjs";

@Injectable()
export class ServicesService {
  constructor(private serviceTypesClient: ServiceTypesClient) {}

  async getServiceTypes(): Promise<NamedEntityModel[]> {
    let request = this.serviceTypesClient.serviceTypes();
    let result = await firstValueFrom(request);

    return result;
  }
}
