import { NamedEntityModel } from "../common";

export interface ServiceModel {
  id: number;
  name: string;
  description: string;
  serviceTypeID: number;
  serviceType: NamedEntityModel;
  price: number;
}
