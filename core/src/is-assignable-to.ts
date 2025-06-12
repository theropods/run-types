import { toString } from "./to-string";
import { ConstraintContext, VALID } from "./constraints.model";
import { ValueType } from "./all-types";
import { NativeType, NATIVE_VALUE } from "./value-native";
import { checkConstraints, TypeValidator } from "./constraints.utils";
import { LIST_VALUE, ListType } from "./value-list";
import { FUNCTION_VALUE, FunctionType } from "./value-function";
import { ANY_VALUE } from "./value-any";
import { EMPTY_VALUE } from "./value-empty";
import { INTERSECTION_VALUE, IntersectionType } from "./value-intersection";
import { MapType, MAP_VALUE } from "./value-map";
import { TUPLE_VALUE, TupleType } from "./value-tuple";
import { UNION_VALUE, UnionType } from "./value-union";

function assignableErrorMessage(
  actual: ValueType,
  expected: ValueType,
  context: string
) {
  return `${toString(expected)} not assignable to ${toString(
    actual
  )}; ${context}`;
}

const isAssignableToNative = (type: NativeType, context: ConstraintContext) => {
    return (value: ValueType) => {
      const result = checkConstraints(type.constraints, context, value);
      if (!result.valid) {
        return result;
      }
  
      if (value.__type === NATIVE_VALUE && value.native === type.native) {
        return VALID;
      }
  
      return {
        valid: false,
        errors: {
          type: assignableErrorMessage(value, type, "native types do not match"),
        },
      };
    };
  };
  
  const isAssignableToMap = (type: MapType, context: ConstraintContext) => {
    return (value: ValueType) => {
      const result = checkConstraints(type.constraints, context, value);
      if (!result.valid) {
        return result;
      }
  
      if (value.__type === "map") {
        // compare keys
        const typeKeys = Object.keys(type.members);
  
        // compare values
        for (let i = 0; i < typeKeys.length; i++) {
          const typeKey = typeKeys[i];
  
          if (!(typeKey in value.members)) {
            return {
              valid: false,
              errors: {
                type: assignableErrorMessage(
                  value,
                  type,
                  `missing key: "${typeKey}"`
                ),
              },
            };
          }
          const valueValueType = value.members[typeKey];
          const typeValueType = type.members[typeKey];
          if (!isAssignableTo(typeValueType, context)(valueValueType).valid) {
            return {
              valid: false,
              errors: {
                type: assignableErrorMessage(
                  value,
                  type,
                  `key "${typeKey}" not assignable to ${toString(valueValueType)}`
                ),
              },
            };
          }
        }
        return VALID;
      }
      return {
        valid: false,
        errors: {
          type: assignableErrorMessage(value, type, `type is not a map`),
        },
      };
    };
  };
  
  function isAssignableToList(type: ListType, context: ConstraintContext) {
    return (value: ValueType) => {
      if (value.__type === "list") {
        const constraint_result = checkConstraints(
          type.constraints,
          context,
          value
        );
        if (!constraint_result.valid) {
          return constraint_result;
        }
  
        const result = isAssignableTo(type.members, context)(value.members);
        if (result.valid) {
          return VALID;
        }
  
        return {
          valid: false,
          errors: {
            type: assignableErrorMessage(
              value,
              type,
              `list members do not match: ${result.errors.type}`
            ),
          },
        };
      }
      return {
        valid: false,
        errors: {
          type: assignableErrorMessage(value, type, `type is not a list`),
        },
      };
    };
  }
  
  function isAssignableToTuple(type: TupleType, context: ConstraintContext) {
    return (value: ValueType) => {
      if (value.__type === "tuple") {
        const constraint_result = checkConstraints(
          type.constraints,
          context,
          value
        );
        if (!constraint_result.valid) {
          return constraint_result;
        }
  
        if (value.members.length !== type.members.length) {
          return {
            valid: false,
            errors: {
              type: assignableErrorMessage(
                value,
                type,
                `tuple length does not match`
              ),
            },
          };
        }
        for (let i = 0; i < type.members.length; i++) {
          if (!isAssignableTo(type.members[i], context)(value.members[i]).valid) {
            return {
              valid: false,
              errors: {
                type: assignableErrorMessage(
                  value,
                  type,
                  `tuple member ${i} not assignable to ${toString(
                    value.members[i]
                  )}`
                ),
              },
            };
          }
        }
        return VALID;
      }
      return {
        valid: false,
        errors: {
          type: assignableErrorMessage(value, type, `type is not a tuple`),
        },
      };
    };
  }
  
  function isAssignableToFunction(
    type: FunctionType,
    context: ConstraintContext
  ) {
    return (value: ValueType) => {
      if (value.__type === "function") {
        const constraint_result = checkConstraints(
          type.constraints,
          context,
          value
        );
        if (!constraint_result.valid) {
          return constraint_result;
        }
        const return_result = isAssignableTo(
          type.returns,
          context
        )(value.returns);
  
        if (!return_result.valid) {
          return return_result;
        }
  
        if (type.args.length !== value.args.length) {
          return {
            valid: false,
            errors: {
              type: assignableErrorMessage(
                value,
                type,
                `function argument length does not match`
              ),
            },
          };
        }
        for (let i = 0; i < type.args.length; i++) {
          if (!isAssignableTo(type.args[i], context)(value.args[i]).valid) {
            return {
              valid: false,
              errors: {
                type: assignableErrorMessage(
                  value,
                  type,
                  `function argument ${i} not assignable to ${toString(
                    value.args[i]
                  )}`
                ),
              },
            };
          }
        }
        return VALID;
      }
      return {
        valid: false,
        errors: {
          type: assignableErrorMessage(value, type, `type is not a function`),
        },
      };
    };
  }
  
  function isAssignableToUnion(type: UnionType, context: ConstraintContext) {
    return (value: ValueType) => {
      const constraint_result = checkConstraints(
        type.constraints,
        context,
        value
      );
      if (!constraint_result.valid) {
        return constraint_result;
      }
      for (let i = 0; i < type.members.length; i++) {
        if (isAssignableTo(type.members[i], context)(value).valid) {
          return VALID;
        }
      }
      return {
        valid: false,
        errors: {
          type: assignableErrorMessage(
            value,
            type,
            `type assignable to any member of union`
          ),
        },
      };
    };
  }
  
  function isAssignableToIntersection(
    type: IntersectionType,
    context: ConstraintContext
  ) {
    return (value: ValueType) => {
      const constraint_result = checkConstraints(
        type.constraints,
        context,
        value
      );
      if (!constraint_result.valid) {
        return constraint_result;
      }
      for (let i = 0; i < type.members.length; i++) {
        const result = isAssignableTo(type.members[i], context)(value);
        if (!result.valid) {
          return {
            valid: false,
            errors: {
              type: assignableErrorMessage(value, type, result.errors.type),
            },
          };
        }
      }
      return VALID;
    };
  }
  
  export const isAssignableTo: (
    type: ValueType,
    context: ConstraintContext
  ) => TypeValidator = (type: ValueType, context: ConstraintContext) => {
    switch (type.__type) {
      case NATIVE_VALUE:
        return isAssignableToNative(type, context);
      case MAP_VALUE:
        return isAssignableToMap(type, context);
      case LIST_VALUE:
        return isAssignableToList(type, context);
      case TUPLE_VALUE:
        return isAssignableToTuple(type, context);
      case FUNCTION_VALUE:
        return isAssignableToFunction(type, context);
      case UNION_VALUE:
        return isAssignableToUnion(type, context);
      case INTERSECTION_VALUE:
        return isAssignableToIntersection(type, context);
      case EMPTY_VALUE:
      case ANY_VALUE:
        return () => VALID;
    }
  };