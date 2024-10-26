import { IsBoolean } from "class-validator";
import { Type } from "class-transformer";

export class GetUserQueryDto {
  @Type(() => Boolean)
  @IsBoolean()
  includeRole: boolean;
}
