import { Injectable } from "@angular/core";
import { ServiceTypesClient } from "../../core/api/api-client";
import { NewServiceRepository } from "./new-service.repository";
import { firstValueFrom } from "rxjs";

@Injectable()
export class NewServiceService {
  constructor(
    private serviceTypesClient: ServiceTypesClient,
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

  private async loadServiceTypes(): Promise<void> {
    let request = this.serviceTypesClient.serviceTypes();
    let result = await firstValueFrom(request);

    this.repository.setServiceTypes(result);
  }
}
