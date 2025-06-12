import { ValueTypeType } from "./base";
import { isAssignableTo } from "./is-assignable-to";
import { ValueType } from "./all-types";
import { toString } from "./to-string";

export const MAP_VALUE = "map" as const;
export type MapType = ValueTypeType<typeof MAP_VALUE> & {
  members: Record<string, ValueType>;
};

export function createMapType(members: Record<string, ValueType>): MapType {
  return {
    __type: MAP_VALUE,
    members,
  };
}

/**
 * Merges two maps. If a key is present in both maps,
 * the types must be compatible. If not, an error is thrown.
 *
 * @param map1 - The first map.
 * @param map2 - The second map.
 * @returns A new map with the merged members.
 */
export function join(map1: MapType, map2: MapType): MapType {
  const nextMembers = { ...map1.members, ...map2.members };

  Object.keys(map1.members)
    .filter((key) => key in map2.members)
    .forEach((key) => {
      const result1 = isAssignableTo(map2.members[key], {})(map1.members[key]);
      const result2 = isAssignableTo(map1.members[key], {})(map2.members[key]);

      if (!result1.valid && !result2.valid) {
        throw new Error(
          `Could not join maps as there were incompatible types: ${key}: ${toString(
            map1.members[key]
          )} vs ${toString(map2.members[key])}`
        );
      }

      nextMembers[key] = result1.valid ? map1.members[key] : map2.members[key];
    });

  // if they are, merge
  return {
    __type: MAP_VALUE,
    members: { ...map1.members, ...map2.members },
  };
}
