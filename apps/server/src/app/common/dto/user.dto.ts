import { UserModel } from "@exora/shared-models";
import { Expose } from "class-transformer";
import { NamedEntityDto } from "./named-entity.dto";

export class UserDto implements UserModel {
  @Expose() id: number;
  @Expose() firstName: string;
  @Expose() lastName: string;
  @Expose() email: string;
  @Expose() phone?: string;
  @Expose() roleID: number;
  @Expose() role: NamedEntityDto;
}
