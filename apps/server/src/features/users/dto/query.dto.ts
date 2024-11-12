import { IsOptional } from "class-validator";
import { CoerceToBoolean } from "../../../common";

export class GetUserQuery {
  @CoerceToBoolean()
  @IsOptional()
  includeRole?: boolean = false;
}
