import { CreateServiceRequestModel, ServiceModel } from "@exora/shared-models";
import { NamedEntityDto } from "../../../common";
import { Expose, Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class ServiceDto implements ServiceModel {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  serviceTypeID: number;

  @Expose()
  serviceType: NamedEntityDto;

  @Type(() => Number)
  @Expose()
  price: number;
}

export class CreateServiceRequestDto implements CreateServiceRequestModel {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  serviceTypeID: number;

  @IsNumber()
  price: number;
}
