import { ValueTypeType } from "./base";
import { ValueType } from "./all-types";

export const FUNCTION_VALUE = "function" as const;
export type FunctionType = ValueTypeType<typeof FUNCTION_VALUE> & {
  args: ValueType[];
  returns: ValueType;
};



/**
 * Creates a `FunctionType` object with the specified arguments and return type.
 * 
 * @param args - An array of `ValueType` representing the function arguments.
 * @param returns - A `ValueType` representing the function's return type.
 * @returns A `FunctionType` object.
 */

export function createFunctionType(
    args: ValueType[],
    returns: ValueType
  ): FunctionType {
    return {
      __type: "function",
      args,
      returns,
    };
  }
  