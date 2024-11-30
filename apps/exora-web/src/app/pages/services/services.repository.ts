import { BaseQuery, PropRepository } from "../../core/common";
import { ServicesState } from "./services.model";
import { ServiceModel } from "@exora/shared-models";
import { Injectable } from "@angular/core";

@Injectable()
export class ServicesRepository extends PropRepository<ServicesState> {
  setServices(services: ServiceModel[]): void {
    this.update({ services });
  }

  constructor() {
    super({ name: "[SERVICES]" }, { services: null });
  }
}

@Injectable()
export class ServicesQuery extends BaseQuery<ServicesState> {
  services$ = this.select((s) => s.services);

  constructor(protected repository: ServicesRepository) {
    super(repository);
  }
}
