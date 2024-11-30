import { Injectable } from "@angular/core";
import { ServicesClient } from "../../core/api/api-client";
import { firstValueFrom } from "rxjs";
import { ServicesRepository } from "./services.repository";

@Injectable()
export class ServicesService {
  constructor(
    private servicesClient: ServicesClient,
    private repository: ServicesRepository,
  ) {}

  async loadServices() {
    let request = this.servicesClient.services();
    let result = await firstValueFrom(request);

    this.repository.setServices(result);
  }
}
