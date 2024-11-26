import { Injectable } from "@angular/core";
import { BaseQuery, PropRepository } from "../../core/common";
import { NamedEntityModel } from "@exora/shared-models";
import { NewServiceState } from "./new-service.model";

@Injectable()
export class NewServiceRepository extends PropRepository<NewServiceState> {
  setServiceTypes(serviceTypes: NamedEntityModel[]) {
    this.update({ serviceTypes });
  }

  constructor() {
    super({ name: "[NEW-SERVICE]" }, { serviceTypes: null });
  }
}

@Injectable({ providedIn: "root" })
export class NewServiceQuery extends BaseQuery<NewServiceState> {
  serviceTypes$ = this.select((s) => s.serviceTypes);

  constructor(protected repository: NewServiceRepository) {
    super(repository);
  }
}
