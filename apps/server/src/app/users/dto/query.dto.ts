import { IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class GetUserQuery {
  @Type(() => Boolean)
  @IsOptional()
  includeRole?: boolean = false;
}
