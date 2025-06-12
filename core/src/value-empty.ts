import { ValueTypeType } from "./base";

export const EMPTY_VALUE = "empty" as const;

export type EmptyType = ValueTypeType<typeof EMPTY_VALUE>;

export function createEmptyType(): EmptyType {
    return {
        __type: EMPTY_VALUE,
    };
}