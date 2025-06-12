import {test} from "node:test";
import assert from 'node:assert';
import {createMapType, join} from "./value-map";
import { createNativeType } from "./value-native";

test("join", async (t) => {
    await t.test("no overlap", () => {
        const one = createMapType({
            a: createNativeType("string"),
        });

        const two = createMapType({
            b: createNativeType("number"),
        });

        const three = join(one, two);

        assert.deepEqual(three.members, {
            a: createNativeType("string"),
            b: createNativeType("number"),
        });
    });

    await t.test("single matching overlap", () => {
        const one = createMapType({
            a: createNativeType("string"),
            b: createNativeType("number"),
        });

        const two = createMapType({
            b: createNativeType("number"),
            c: createNativeType("boolean"),
        });

        const three = join(one, two);

        assert.deepEqual(three.members, {
            a: createNativeType("string"),
            b: createNativeType("number"),
            c: createNativeType("boolean"),
        });
    });

    await t.test("single non-matching overlap", () => {
        const one = createMapType({
            a: createNativeType("string"),
            b: createNativeType("number"),
        });

        const two = createMapType({
            b: createNativeType("string"),
            c: createNativeType("boolean"),
        });

        assert.throws(() => join(one, two));
    });
});