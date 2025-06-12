import { ValueTypeType } from "./base";
import { ValueType } from "./all-types";

export const LIST_VALUE = "list" as const;
export type ListType = ValueTypeType<typeof LIST_VALUE> & {
  members: ValueType;
};