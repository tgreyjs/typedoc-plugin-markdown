import { TestApp } from '../../../test/test-app';
import { MemberComponent } from './member';
import * as sourcesComponent from './sources';
describe(`Member Component:`, () => {
  let testApp: TestApp;

  beforeAll(async () => {
    jest
      .spyOn(sourcesComponent, 'SourcesComponent')
      .mockReturnValue('[SOURCES]');
    testApp = new TestApp(['declarations.ts']);
    await testApp.bootstrap();
  });

  test(`should compile a const with default value`, () => {
    const model = testApp.findReflectionByName('constWithDefaultValue');
    expect(MemberComponent(model)).toMatchSnapshot();
  });

  test(`should compile a let with default value`, () => {
    const model = testApp.findReflectionByName('letWithDefaultValue');
    expect(MemberComponent(model)).toMatchSnapshot();
  });

  test(`should compile an undefined declaration`, () => {
    const model = testApp.findReflectionByName('undefinedNumberDeclaration');
    expect(MemberComponent(model)).toMatchSnapshot();
  });

  test(`should compile object literal declaration`, () => {
    const model = testApp.findReflectionByName('objectLiteralDeclaration');
    expect(MemberComponent(model)).toMatchSnapshot();
  });

  test(`should compile object literal cast as a const`, () => {
    const model = testApp.findReflectionByName(
      'objectLiteralAsConstDeclaration',
    );
    expect(MemberComponent(model)).toMatchSnapshot();
  });

  test(`should compile type literal declaration`, () => {
    const model = testApp.findReflectionByName('typeLiteralDeclaration');
    expect(MemberComponent(model)).toMatchSnapshot();
  });

  test(`should compile declaration with double underscores in name and value`, () => {
    const model = testApp.findReflectionByName(
      '__DOUBLE_UNDERSCORES_DECLARATION__',
    );
    expect(MemberComponent(model)).toMatchSnapshot();
  });

  test(`should compile any function type`, () => {
    const model = testApp.findReflectionByName('AnyFunctionType');
    expect(MemberComponent(model)).toMatchSnapshot();
  });

  test(`should compile function declaration`, () => {
    const model = testApp.findReflectionByName('functionDeclaration');
    expect(MemberComponent(model)).toMatchSnapshot();
  });

  test(`should compile callable declaration`, () => {
    const model = testApp.findReflectionByName('callableDeclaration');
    expect(MemberComponent(model)).toMatchSnapshot();
  });

  test(`should compile indexable declaration`, () => {
    const model = testApp.findReflectionByName('indexableDeclaration');
    expect(MemberComponent(model)).toMatchSnapshot();
  });

  test(`should compile enum delcaration`, () => {
    const model = testApp.findReflectionByName('EnumDeclarations');
    expect(MemberComponent(model)).toMatchSnapshot();
  });
});
