import { ValueTypeType } from "./base";

export const ANY_VALUE = "any" as const;

export type AnyType = ValueTypeType<typeof ANY_VALUE>;