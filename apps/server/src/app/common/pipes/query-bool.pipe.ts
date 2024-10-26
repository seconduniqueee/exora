import { ParseBoolPipe } from "@nestjs/common";

export const QueryBoolPipe = new ParseBoolPipe({ optional: true });
