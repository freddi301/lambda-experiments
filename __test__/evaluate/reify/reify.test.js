// @flow

import { reify } from "../../../src/evaluate/reify/reify";
import { ref, app, abs } from "../../../src/data/ast/constructors";

test("reify", () => {
  const key = "replaceme";
  const value = ref("replaced");
  const term = app(ref(key), abs("x", ref(key)));
  const reified = reify(key, value, term);
  const expected = app(value, abs("x", value));
  expect(reified).toEqual(expected);
  expect(reify(key, value, app(ref(key), ref("random")))).toEqual(
    app(value, ref("random"))
  );
  expect(reify(key, value, app(abs(key, ref(key)), ref(key)))).toEqual(
    app(abs(key, ref(key)), value)
  );
});
