import { ValueTypeType } from "./base";
import { ConstraintContext, ConstraintName, VALID, ValidationResult, ValueConstraints } from "./constraints.model";
import { FunctionType } from "./value-function";
import { ListType } from "./value-list";
import { MapType } from "./value-map";
import { NATIVE_VALUE, NativeTypeKey, NativeType } from "./value-native";
import { UnionType } from "./value-union";
import { IntersectionType } from "./value-intersection";
import { EmptyType } from "./value-empty";
import { AnyType } from "./value-any";
import { TupleType } from "./value-tuple";












export type ValueType =
  | NativeType
  | MapType
  | ListType
  | FunctionType
  | TupleType
  | UnionType
  | IntersectionType
  | EmptyType
  | AnyType;
