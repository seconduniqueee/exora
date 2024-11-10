export function coerceToBoolean(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value === "true";
  if (value == null) return undefined;

  return !!value;
}
