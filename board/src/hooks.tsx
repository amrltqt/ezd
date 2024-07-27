import { Dataset, Row, Variable } from "./core";

export function resolveDataset(
  value: Dataset,
  data: { [key: string]: Dataset | string | number }
): Row[] {
  if (Array.isArray(value)) {
    return value;
  } else {
    return data[value.key] as Row[];
  }
}

export function resolveString(
  value: Variable,
  data: { [key: string]: Dataset | string | number }
): string | number {
  if (typeof value === "number" || typeof value === "string") {
    return value;
  } else {
    return data[value.key] as string;
  }
}
