// @flow

import { truthTables } from "../../../src/data/common/boolean";
import { eager } from "../../../src/evaluate/reify/eager";

test(`boolean truth tables`, () => {
  for (let operator of Object.keys(truthTables)) {
    for (let rule of truthTables[operator]) {
      expect(eager(rule.given)).toEqual(rule.expect);
    }
  }
});
