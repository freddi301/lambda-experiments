import { truthTables } from "../../../src/data/common/boolean";
import { lazy } from "../../../src/evaluate/reify/lazy";

// @flow

test("not truth table", () => {
  for (let rule of truthTables.NOT) {
    expect(lazy(rule.given)).toEqual(rule.expect);
  }
});
test("and truth table", () => {
  for (let rule of truthTables.AND) {
    expect(lazy(rule.given)).toEqual(rule.expect);
  }
});
test("or truth table", () => {
  for (let rule of truthTables.OR) {
    expect(lazy(rule.given)).toEqual(rule.expect);
  }
});
