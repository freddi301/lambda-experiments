// @flow

import type { Ast, Reference, Application, Abstraction } from "./";

export const reference = <Identifier>(
  identifier: Identifier
): Reference<Identifier> => ({ type: "Reference", identifier });

export const ref = reference;

export const application = <Identifier>(
  left: Ast<Identifier>,
  right: Ast<Identifier>
): Application<Identifier> => ({ type: "Application", left, right });

export const app = application;

export const abstraction = <Identifier>(
  head: Identifier,
  body: Ast<Identifier>
): Abstraction<Identifier> => ({ type: "Abstraction", head, body });

export const abs = abstraction;

export const curry = <Identifier>(
  args: Identifier[],
  body: Ast<Identifier>
): Ast<Identifier> =>
  args.reverse().reduce((memo, arg) => abstraction(arg, memo), body);

export const apply = <Identifier>(terms: Ast<Identifier>[]): Ast<Identifier> =>
  terms.reduce((memo, term) => application(memo, term));
