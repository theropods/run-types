import { ConstraintContext, VALID, ValidationResult, ValueConstraints } from "./constraints.model";
import { ValueType } from "./all-types";
import { NATIVE_VALUE, NativeTypeKey } from "./value-native"; 



export function checkConstraints(
  constraints: ValueConstraints | undefined,
  context: ConstraintContext,
  value: ValueType
) {
  if (constraints) {
    const results = Object.entries(constraints).map(([name, data]) => {
      if (context[name]) {
        const validator = context[name](data);
        const result = validator(value.constraints?.[name]);
        if (!result.valid) {
          return {
            valid: false,
            errors: {
              [name]: result.errors[name],
            },
          };
        }
      }
      return VALID;
    });

    return flattenResults(results);
  }
  return VALID;
}



function flattenResults(results: ValidationResult[]) {
  return results.reduce((acc, result) => {
    if (result.valid) {
      return acc;
    }
    return {
      valid: false,
      errors: {
        ...(acc.valid ? {} : acc.errors),
        ...result.errors,
      },
    };
  }, VALID);
}


export type TypeValidator = (value: ValueType) => ValidationResult;


export const expectedErrorMessage = (expected: string, actual: string) => {
  return `Expected ${expected} but got ${actual}`;
};

export const typeLabel = (type: string) => `type: ${type}`;




