import { ValueTypeType } from "./base";
import { ValueType } from "./all-types";

export const TUPLE_VALUE = "tuple" as const;
export type TupleType = ValueTypeType<typeof TUPLE_VALUE> & {
  members: ValueType[];
};

