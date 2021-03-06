// @flow

import { truthTables } from "../../../src/data/common/boolean";
import { lazy } from "../../../src/evaluate/reify/lazy";

test(`boolean truth tables`, () => {
  for (let operator of Object.keys(truthTables)) {
    for (let rule of truthTables[operator]) {
      expect(lazy(rule.given)).toEqual(rule.expect);
    }
  }
});
