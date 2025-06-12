import { ValueTypeType } from "./base";
import { VALID, ValidationResult } from "./constraints.model";
import { TypeValidator, expectedErrorMessage, typeLabel } from "./constraints.utils";
import { ValueType } from "./all-types";

export const NATIVE_VALUE = "native" as const;

export type NativeType = ValueTypeType<typeof NATIVE_VALUE> & {
  native: NativeTypeKey;
};

export type NativeTypeKey = "string" | "number" | "boolean";


export const NativeTypes: Record<NativeType[typeof NATIVE_VALUE], NativeType> =
  {
    string: {
      __type: NATIVE_VALUE,
      native: "string",
    },
    number: {
      __type: NATIVE_VALUE,
      native: "number",
    },
    boolean: {
      __type: NATIVE_VALUE,
      native: "boolean",
    },
  };


export function createNativeType(type: NativeTypeKey): NativeType {
  return {
    __type: NATIVE_VALUE,
    native: type,
  };
}
export const isNativeType: TypeValidator = (value: ValueType) => {
  if (value.__type === NATIVE_VALUE) {
    return VALID;
  }
  return {
    valid: false,
    errors: {
      type: expectedErrorMessage(
        typeLabel(NATIVE_VALUE),
        typeLabel(value.__type)
      ),
    },
  };
};


export const nativeTypeValidator: (type: NativeTypeKey) => TypeValidator =
  (type: NativeTypeKey) =>
  (value: ValueType): ValidationResult => {
    if (value.__type === NATIVE_VALUE && value.native === type) {
      return VALID;
    }
    return {
      valid: false,
      errors: {
        type: expectedErrorMessage(`native ${type}`, typeLabel(value.__type)),
      },
    };
  };
