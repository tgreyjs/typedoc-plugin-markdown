/**
 * comments
 */
export class ReflectionClass {}

export interface CallableReflection {
  (): string;
}

export interface IndexableReflection {
  [index: number]: string;
}

export enum EnumReflection {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

export class ImplementedClass implements ReflectionClass {}

export class ParentClass {}
export class ChildClassA extends ParentClass {}
export class ChildClassB extends ParentClass {}
export class GrandChildClassA extends ChildClassA {}
