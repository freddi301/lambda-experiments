// @flow

import { ref, app, abs, curry, apply } from "../ast/constructors";

export const TRUE = abs("x", abs("y", ref("x")));

export const FALSE = abs("x", abs("y", ref("y")));

export const NOT = abs("p", app(app(ref("p"), FALSE), TRUE));

export const AND = curry(["a", "b"], apply([ref("a"), ref("b"), FALSE]));

export const OR = curry(["a", "b"], apply([ref("a"), TRUE, ref("b")]));

export const truthTables = {
  NOT: [
    { given: app(NOT, TRUE), expect: FALSE },
    { given: app(NOT, FALSE), expect: TRUE }
  ],
  AND: [
    { given: apply([AND, TRUE, TRUE]), expect: TRUE },
    { given: apply([AND, TRUE, FALSE]), expect: FALSE },
    { given: apply([AND, FALSE, TRUE]), expect: FALSE },
    { given: apply([AND, FALSE, FALSE]), expect: FALSE }
  ],
  OR: [
    { given: apply([OR, TRUE, TRUE]), expect: TRUE },
    { given: apply([OR, TRUE, FALSE]), expect: TRUE },
    { given: apply([OR, FALSE, TRUE]), expect: TRUE },
    { given: apply([OR, FALSE, FALSE]), expect: FALSE }
  ]
};
