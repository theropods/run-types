import { ValueTypeType } from "./base";
import { ValueType } from "./all-types";
import { NATIVE_VALUE } from "./value-native";

export const INTERSECTION_VALUE = "intersection" as const;
/* 'And' type */
export type IntersectionType = ValueTypeType<typeof INTERSECTION_VALUE> & {
  members: ValueType[];
};


export function createIntersectionType(types: ValueType[]) {
  // if any of the types are native, they must all be native and matching
  const native = types.find((type) => type.__type === NATIVE_VALUE);
  if (native) {
    const all = types.every(
      (type) => type.__type === NATIVE_VALUE && type.native === native.native
    )
    if (!all) {
      throw new Error(`Native types may not intersect, found ${types}`);
    }
  }

  return {
    __type: INTERSECTION_VALUE,
    members: types,
  };
}