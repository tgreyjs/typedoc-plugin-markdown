export const stringConstWithDefaultValue = 'hello';
export let stringLetWithDefaultValue = 'hello';
stringLetWithDefaultValue = 'world';

export let undefinedNumberDeclaration: number;

/**
 * @param objectLiteralDeclaration.valueX description for valueX
 * @param objectLiteralDeclaration.valueZ description for valueZ
 * @param objectLiteralDeclaration.valueY description for valueY
 */
export const objectLiteralDeclaration = {
  /**
   * Comment for valueZ
   */
  valueZ: 'foo',
  /**
   * Comment for value Y
   */
  valueY: function () {
    return 'foo';
  },
  /**
   * Comment for valueX
   */
  valueX: {
    valueZ: 'foo',
    valueA: [100, 200, 300],
  },
  /**
   * Comment for valueA
   */
  valueA: 100,
  valueB: true,
  valueC: {},
};

export let typeLiteralDeclaration: {
  /**
   * Comment for valueZ
   */
  valueZ: string;
  valueY: { (): string };
  /**
   * Comment for valueX
   */
  valueX: {
    /**
     * Nested comment for valueZ
     */
    valueZ: string;
    valueY: { (z: string): { a: string; b: string } };
    valueA: number[];
  };
  /**
   * Comments for valueA
   */
  valueA?: number;
  valueB?: boolean;
};

export let functionDeclaration: (someArg: number) => boolean;

export let callableDeclaration: {
  (someArg: number): boolean;
  arg1: string;
  arg2: number;
};

export let indexableDeclaration: {
  [index: number]: string;
  arg1: string;
};

/**
 * Comments
 * @param {Object} objectLiteralAsConstDeclaration - Comment for object.
 * @param {string} objectLiteralAsConstDeclaration.Prop1 - Comment for Prop1.
 * @param {string} objectLiteralAsConstDeclaration.Prop2 - Comment for Prop2.
 */
export const objectLiteralAsConstDeclaration = {
  Prop1: 'Prop1',
  Prop2: 'Prop2',
  Prop3: 'Prop3',
} as const;

export const __DOUBLE_UNDERSCORES_DECLARATION__ = true;

export type AnyFunctionType<A = any> = (...input: any[]) => A;

export enum EnumDeclarations {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
