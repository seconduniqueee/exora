import { ServiceModel } from "@exora/shared-models";
import { NamedEntityDto } from "../../../common";

export class ServiceDto implements ServiceModel {
  id: number;
  name: string;
  description: string;
  serviceTypeID: number;
  serviceType: NamedEntityDto;
  price: number;
}
