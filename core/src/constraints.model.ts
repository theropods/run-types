export type ConstraintName = string;

export type ValueConstraints = Record<ConstraintName, unknown>;


export type ValidationSuccess = {
  valid: true;
};

export type ValidationError = {
  valid: false;
  errors: Record<ConstraintName, string>;
};

export type ValidationResult = ValidationSuccess | ValidationError;
export type ConstraintValidator<T> = (data: T) => ValidationResult;

export type ConstraintContext = Record<
  ConstraintName,
  <T>(data: T) => ConstraintValidator<T>
>;

export const VALID = Object.freeze({
    valid: true,
  });