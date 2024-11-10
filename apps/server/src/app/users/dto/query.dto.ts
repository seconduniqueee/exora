import { IsOptional } from "class-validator";
import { CoerceToBoolean } from "../../common/decorators";

export class GetUserQuery {
  @CoerceToBoolean()
  @IsOptional()
  includeRole?: boolean = false;
}
