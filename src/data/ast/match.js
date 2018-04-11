// @flow

import type { Ast, Reference, Application, Abstraction } from "./";

export const match = <
  Identifier,
  ReferenceCase,
  ApplicationCase,
  AbstractionCase
>(
  ast: Ast<Identifier>,
  matchers: {
    Reference: (Reference<Identifier>) => ReferenceCase,
    Application: (Application<Identifier>) => ApplicationCase,
    Abstraction: (Abstraction<Identifier>) => AbstractionCase
  }
): ReferenceCase | ApplicationCase | AbstractionCase =>
  matchers[ast.type]((ast: any));

export const matchPartial = <
  Identifier,
  ReferenceCase,
  ApplicationCase,
  AbstractionCase,
  DefaultCase
>(
  ast: Ast<Identifier>,
  matchers: {
    Reference?: (Reference<Identifier>) => ReferenceCase,
    Application?: (Application<Identifier>) => ApplicationCase,
    Abstraction?: (Abstraction<Identifier>) => AbstractionCase,
    otherwise: (Ast<Identifier>) => DefaultCase
  }
): ReferenceCase | ApplicationCase | AbstractionCase | DefaultCase =>
  (matchers[ast.type] || matchers.otherwise)((ast: any));
