// @flow

import type { Ast } from "../../data/ast";
import { application, abstraction } from "../../data/ast/constructors";
import { match } from "../../data/ast/match";

/*
  Takes a reference and substitutes every occurrence of it respecting lexical scoping rules.
  It's β-reduction implementation.
*/
export const reify = <Identifier>(
  reference: Identifier,
  value: Ast<Identifier> /* being substituted in the ast */,
  term: Ast<Identifier> /* where the value will be substituted */
): Ast<Identifier> =>
  match(term, {
    Reference: ({ identifier }) => (reference === identifier ? value : term),
    Application: ({ left, right }) =>
      application(
        reify(reference, value, left),
        reify(reference, value, right)
      ),
    Abstraction: ({ head, body }) =>
      reference === term.head
        ? term
        : abstraction(head, reify(reference, value, body))
  });
