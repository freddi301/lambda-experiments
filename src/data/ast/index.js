// @flow

export type Reference<Identifier> = {
  type: "Reference",
  identifier: Identifier
};

export type Application<Identifier> = {
  type: "Application",
  left: Ast<Identifier>,
  right: Ast<Identifier>
};

export type Abstraction<Identifier> = {
  type: "Abstraction",
  head: Identifier,
  body: Ast<Identifier>
};

export type Ast<Identifier> =
  | Reference<Identifier>
  | Application<Identifier>
  | Abstraction<Identifier>;
