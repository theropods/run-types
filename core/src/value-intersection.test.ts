import {test} from "node:test";
import assert from 'node:assert';

import { createIntersectionType } from "./value-intersection";
import { createNativeType } from "./value-native";

test('createIntersectionType', async (t) => {
    await t.test('empty intersection', () => {
        const intersection = createIntersectionType([]);
        assert.equal(intersection.members.length, 0);
    });

    await t.test('intersection with one member', () => {
        const intersection = createIntersectionType([createNativeType("string")]);
        assert.equal(intersection.members.length, 1);
    });

    await t.test('intersection with multiple native members (matching)', () => {
        const intersection = createIntersectionType([createNativeType("string"), createNativeType("string")]);
        assert.equal(intersection.members.length, 2);
    });

    await t.test('intersection with multiple native members (non-matching)', () => {
        assert.throws(() => createIntersectionType([createNativeType("string"), createNativeType("number")]));
    });
});