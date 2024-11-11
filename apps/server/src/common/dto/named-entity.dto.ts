import { NamedEntityModel } from "@exora/shared-models";
import { Expose } from "class-transformer";

export class NamedEntityDto implements NamedEntityModel {
  @Expose() id: number;
  @Expose() name: string;
}
