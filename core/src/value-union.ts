import { create } from "domain";
import { ValueTypeType } from "./base";
import { ValueType } from "./all-types";
import { createEmptyType } from "./value-empty";

export const UNION_VALUE = "union" as const;
/* 'Or' type */
export type UnionType = ValueTypeType<typeof UNION_VALUE> & {
  members: ValueType[];
};

export function createUnionType(types: ValueType[]) {
  return {
    __type: UNION_VALUE,
    members: types,
  };
}

/**
 * Creates an optional type by constructing a union type.
 * The resulting type allows the provided type or an empty type.
 *
 * @param type - The type to be made optional.
 * @returns A union type consisting of the provided type and an empty type.
 */

export function createOptionalType(type: ValueType): ValueType {
  return {
    __type: "union",
    members: [type, createEmptyType()],
  };
}