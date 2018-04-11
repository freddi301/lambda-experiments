// @flow

import type { Ast } from "../../data/ast";
import { application, abstraction } from "../../data/ast/constructors";
import { matchPartial } from "../../data/ast/match";
import { reify } from "../../evaluate/reify/reify";

/*
  Lazily evaluates a lambda term using the reify mechanism.
  The execution is lazy, application right side is not evaluated until needed.
  There is no scope, as soon variable gets bound, every occurrence is substituted with its value
*/
export const lazy = <Identifier>(term: Ast<Identifier>): Ast<Identifier> =>
  matchPartial(term, {
    Application: ({ left, right }) =>
      matchPartial(left, {
        Abstraction: ({ head, body }) => lazy(reify(head, right, body)),
        otherwise: () => lazy(application(lazy(left), right))
      }),
    otherwise: () => term
  });
