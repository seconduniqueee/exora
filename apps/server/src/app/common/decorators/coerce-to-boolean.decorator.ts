import { Transform } from "class-transformer";
import { coerceToBoolean } from "../utils";

export function CoerceToBoolean() {
  return Transform(({ value }) => coerceToBoolean(value));
}
