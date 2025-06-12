import { ValueConstraints } from "./constraints.model";

export type ValueTypeType<T extends string> = {
  __type: T;
  constraints?: ValueConstraints;
};

