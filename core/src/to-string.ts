import { ValueType } from "./all-types";
import { ANY_VALUE } from "./value-any";
import { EMPTY_VALUE } from "./value-empty";
import { FUNCTION_VALUE } from "./value-function";
import { INTERSECTION_VALUE } from "./value-intersection";
import { LIST_VALUE } from "./value-list";
import { MAP_VALUE } from "./value-map";
import { NATIVE_VALUE } from "./value-native";
import { TUPLE_VALUE } from "./value-tuple";
import { UNION_VALUE } from "./value-union";


export function toString(type: ValueType): string {
  switch (type.__type) {
    case NATIVE_VALUE:
      return `native ${type.native}`;
    case MAP_VALUE:
      return `map {${Object.entries(type.members)
        .map(([key, value]) => `${key}: ${toString(value)}`)
        .join(", ")}}`;
    case LIST_VALUE:
      return `list [${toStringList([type.members])}]`;
    case TUPLE_VALUE:
      return `tuple [${toStringList(type.members)}]`;
    case FUNCTION_VALUE:
      return `function (${toStringList(type.args)}) => ${toString(
        type.returns
      )}`;
    case UNION_VALUE:
      return `union [${toStringList(type.members)}]`;
    case INTERSECTION_VALUE:
      return `intersection [${toStringList(type.members)}]`;
    case EMPTY_VALUE:
      return `[empty]`;
    case ANY_VALUE:
      return `[any]`;
  }
}

function toStringList(types: ValueType[]): string {
    return types.map(toString).join(", ");
  }