import { _someCallback_ } from './signatures';

export let stringType: string;

export const stringLiteralType = 'blue';

export type unionType = 'ease-in' | 'ease-out';

export type unionTypeWithSymbols =
  | ' '
  | 'string'
  | 'strong|with|pipes'
  | 'type`with`backticks'
  | '*';

export type unionTypeWithSymbolsDeclarations = {
  bar: ' ' | 'string' | 'strong|with|pipes' | 'type`with`backticks' | '*';
};

export let literalType: {
  valueZ: string;
  valueY: { (): string };
  valueX: {
    valueZ: string;
    valueY: { (z: string): { a: string; b: string } };
    valueA: number[];
  };
  valueA?: number;
  valueB?: boolean;
};

export const basicObjectLiteralType = { x: 1 };

export const objectLiteralType = {
  '<': '<foo>',
  '<foo>': 'foo',
  '\\n': 'foo',
  '|': 'foo',
  '~': 'foo',
  prop_with_underscore: 'foo',
  'prop|with|pipes': 'foo',
  'prop`with`backticks': 'foo',
  _: 'foo',
  valueZ: '_foo_',
  valueY: function (
    cbParam: _someCallback_,
    unionParam: 'a' | 'b',
    _undercoreParam_: string,
  ) {
    return 'foo';
  },
  valueX: {
    valueZ: 'foo',
    valueY: (z: string) => {
      return { a: 'test', b: z };
    },
    valueA: [100, 200, 300],
  },
  valueA: 100,
  valueB: true,
};

export let tupleType: [string, number];

export class IntersectionClassA {}
export class IntersectionClassB {}

export type intersectionType = IntersectionClassA & IntersectionClassB;

export const arrayType: string[] = ['Apple', 'Orange', 'Banana'];

export function restUnionTypes(
  arg: boolean[] | number,
  ...args: (string | number)[]
): any {
  return null;
}

export function generic<T>(arg: T): T {
  return arg;
}

export const functionReflectionType: <T>(arg: T) => T = generic;

export const typeOperatorType: unique symbol = Symbol.for('__type__');

export type objectLiteralUnionType = string | { z: string };

export type PartialMappedType<T> = {
  [P in keyof T]?: T[P];
};

export type ReadonlyMapedType<T> = {
  readonly [P in keyof T]: T[P];
};

export type ConditionalType<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : 'object';

export type Bar<T, R> = (foos: ConditionalType<T>[]) => R; // defined elsewhere
export const baz: Bar<string, string> = (foos) => '...';

export const fooBigInt = BigInt(100); // the BigInt function
export const barBigInt = 100n; // a BigInt literal
