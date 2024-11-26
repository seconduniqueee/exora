import { NamedEntityModel } from "@exora/shared-models";

export interface NewServiceForm {
  name: string;
  description: string;
  serviceTypeID: number;
  price: number;
  date: Date;
}

export interface NewServiceState {
  serviceTypes: NamedEntityModel[];
}
