// @flow

import type { Ast } from "../../data/ast";
import { application, abstraction } from "../../data/ast/constructors";
import { matchPartial } from "../../data/ast/match";
import { reify } from "../../evaluate/reify/reify";

/*
  Eagerly evaluates a lambda term using the reify mechanism.
  There is no scope, as soon variable gets bound, every occurrence is substituted with its value.
*/
export const eager = <Identifier>(term: Ast<Identifier>): Ast<Identifier> =>
  matchPartial(term, {
    Application: ({ left, right }) =>
      left.type === "Abstraction" && right.type === "Abstraction"
        ? eager(reify(left.head, right, left.body))
        : eager(application(eager(left), eager(right))),
    otherwise: () => term
  });
