import { TypeComponent } from '../../src/renderer/components/shared/type';
import { TestApp } from '../test-app';

describe(`Types:`, () => {
  let testApp: TestApp;

  beforeAll(async () => {
    testApp = new TestApp(['types.ts']);
    await testApp.bootstrap();
  });

  test(`should compile 'array' type'`, () => {
    const model = testApp.findReflectionByName('arrayType').type;
    expect(TypeComponent(model)).toMatchSnapshot();
  });

  test(`should compile 'stringLiteral' type'`, () => {
    const model = testApp.findReflectionByName('stringLiteralType').type;
    expect(TypeComponent(model)).toMatchSnapshot();
  });

  test(`should compile 'union' of string literals types'`, () => {
    const model = testApp.findReflectionByName('unionType').type;
    expect(TypeComponent(model)).toMatchSnapshot();
  });

  test(`should compile 'union' of literal declarations`, () => {
    const model = testApp.findReflectionByName(
      'unionTypeWithSymbolsDeclarations',
    ).type;
    expect(TypeComponent(model)).toMatchSnapshot();
  });

  test(`should compile intrinsic type'`, () => {
    const model = testApp.findReflectionByName('stringType').type;
    expect(TypeComponent(model)).toMatchSnapshot();
  });

  test(`should compile collapsed 'literal' type'`, () => {
    const model = testApp.findReflectionByName('literalType').type;
    expect(TypeComponent(model, 'all')).toMatchSnapshot();
  });

  test(`should compile expanded 'literal' type'`, () => {
    const model = testApp.findReflectionByName('literalType').type;
    expect(TypeComponent(model)).toMatchSnapshot();
  });

  test(`should compile collapsed 'objectLiteralType' type'`, () => {
    const model = testApp.findReflectionByName('objectLiteralType').type;
    expect(TypeComponent(model, 'all')).toMatchSnapshot();
  });

  test(`should compile expanded 'objectLiteralType' type'`, () => {
    const model = testApp.findReflectionByName('basicObjectLiteralType').type;
    expect(TypeComponent(model)).toMatchSnapshot();
  });

  test(`should compile 'tuple' type'`, () => {
    const model = testApp.findReflectionByName('tupleType').type;
    expect(TypeComponent(model)).toMatchSnapshot();
  });

  test(`should compile 'intersection' type'`, () => {
    const model = testApp.findReflectionByName('intersectionType').type;
    expect(TypeComponent(model)).toMatchSnapshot();
  });

  test(`should compile collapsed 'function' type '`, () => {
    const model = testApp.findReflectionByName('functionReflectionType').type;
    expect(TypeComponent(model)).toMatchSnapshot();
  });

  test(`should compile expanded 'function' type '`, () => {
    const model = testApp.findReflectionByName('functionReflectionType').type;
    expect(TypeComponent(model)).toMatchSnapshot();
  });

  test(`should compile 'typeOperator' type '`, () => {
    const model = testApp.findReflectionByName('typeOperatorType').type;
    expect(TypeComponent(model)).toMatchSnapshot();
  });

  test(`should compile unionType with object literal type '`, () => {
    const model = testApp.findReflectionByName('objectLiteralUnionType').type;
    expect(TypeComponent(model)).toMatchSnapshot();
  });

  test(`should compile conditional type '`, () => {
    const model = testApp.findReflectionByName('ConditionalType').type;
    expect(TypeComponent(model)).toMatchSnapshot();
  });
});
