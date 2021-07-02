import { SignatureComponent } from '../../src/renderer/components/member/member.signature';
import * as sourcesComponent from '../../src/renderer/components/member/member.sources';
import { TestApp } from '../test-app';

describe(`Signatures:`, () => {
  let testApp: TestApp;

  beforeAll(async () => {
    jest
      .spyOn(sourcesComponent, 'SourcesComponent')
      .mockReturnValue('[partial: member.sources]\n');
    testApp = new TestApp(['signatures.ts']);
    await testApp.bootstrap();
  });

  test(`should compile callable signature'`, () => {
    const model =
      testApp.findReflectionByName('CallableSignature').signatures[0];
    expect(SignatureComponent(model)).toMatchSnapshot();
  });

  test(`should compile signature with a flag'`, () => {
    const model = testApp.findReflectionByName('privateFunction').signatures[0];
    expect(SignatureComponent(model)).toMatchSnapshot();
  });

  test(`should compile signature with params'`, () => {
    const model = testApp.findReflectionByName('functionWithParameters')
      .signatures[0];
    expect(SignatureComponent(model)).toMatchSnapshot();
  });

  test(`should compile function that returns an object'`, () => {
    const model = testApp.findReflectionByName('functionReturningAnObject')
      .signatures[0];
    expect(SignatureComponent(model)).toMatchSnapshot();
  });

  test(`should compile function that returns a function'`, () => {
    const model = testApp.findReflectionByName('functionReturningAFunction')
      .signatures[0];
    expect(SignatureComponent(model)).toMatchSnapshot();
  });

  test(`should compile signature with rest params'`, () => {
    const model =
      testApp.findReflectionByName('functionWithRest').signatures[0];
    expect(SignatureComponent(model)).toMatchSnapshot();
  });

  test(`should compile signature with optional params'`, () => {
    const model = testApp.findReflectionByName('functionWithOptionalParam')
      .signatures[0];
    expect(SignatureComponent(model)).toMatchSnapshot();
  });

  test(`should compile signature with union types'`, () => {
    const model = testApp.findReflectionByName('functionWithUnionTypes')
      .signatures[0];
    expect(SignatureComponent(model)).toMatchSnapshot();
  });

  test(`should compile signature with default values'`, () => {
    const model = testApp.findReflectionByName('functionWithDefaults')
      .signatures[0];
    expect(SignatureComponent(model)).toMatchSnapshot();
  });

  test(`should compile signature with @return comments'`, () => {
    const model =
      testApp.findReflectionByName('commentsInReturn').signatures[0];
    expect(SignatureComponent(model)).toMatchSnapshot();
  });

  test(`should compile named parameters'`, () => {
    const model = testApp.findReflectionByName('functionWithNamedParams')
      .signatures[0];
    expect(SignatureComponent(model)).toMatchSnapshot();
  });

  test(`should compile named parameters with comments'`, () => {
    const model = testApp.findReflectionByName(
      'functionWithNamedParamsAndComments',
    ).signatures[0];
    expect(SignatureComponent(model)).toMatchSnapshot();
  });

  test(`should compile pipes in params and comments'`, () => {
    const model = testApp.findReflectionByName(
      'functionWithPipesInParamsAndComments',
    ).signatures[0];
    expect(SignatureComponent(model)).toMatchSnapshot();
  });

  test(`should compile function with reference type'`, () => {
    const model = testApp.findReflectionByName('functionWithReferenceType')
      .signatures[0];
    expect(SignatureComponent(model)).toMatchSnapshot();
  });

  test(`should compile function with nested typen params'`, () => {
    const model = testApp.findReflectionByName('functionWithNestedParams')
      .signatures[0];
    expect(SignatureComponent(model)).toMatchSnapshot();
  });

  test(`should compile class with constructor'`, () => {
    const model = testApp.findReflectionByName('ClassWithConstructor')
      .children[0].signatures[0];
    expect(SignatureComponent(model)).toMatchSnapshot();
  });
});
