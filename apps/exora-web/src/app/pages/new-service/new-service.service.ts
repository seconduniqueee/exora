import { Injectable } from "@angular/core";
import { ServicesClient, ServiceTypesClient } from "../../core/api/api-client";
import { NewServiceRepository } from "./new-service.repository";
import { firstValueFrom } from "rxjs";
import { NewServiceForm } from "./new-service.model";
import { ServiceModel } from "@exora/shared-models";

@Injectable()
export class NewServiceService {
  constructor(
    private serviceTypesClient: ServiceTypesClient,
    private servicesClient: ServicesClient,
    private repository: NewServiceRepository,
  ) {}

  async loadRelatedData(): Promise<void> {
    try {
      this.repository.startLoading();

      await Promise.all([this.loadServiceTypes()]);
    } catch (err) {
      console.error(err);
    } finally {
      this.repository.stopLoading();
    }
  }

  async createService(formValue: NewServiceForm): Promise<ServiceModel> {
    try {
      let request = this.servicesClient.service(formValue);
      let result = await firstValueFrom(request);

      return result;
    } catch (error) {
      console.error(error);
    }
  }

  private async loadServiceTypes(): Promise<void> {
    let request = this.serviceTypesClient.serviceTypes();
    let result = await firstValueFrom(request);

    this.repository.setServiceTypes(result);
  }
}
