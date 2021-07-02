import { DeclarationComponent } from '../../src/renderer/components/member/member.declaration';
import * as sourcesComponent from '../../src/renderer/components/member/member.sources';
import { TestApp } from '../test-app';

describe(`Declarations:`, () => {
  let testApp: TestApp;

  beforeAll(async () => {
    jest
      .spyOn(sourcesComponent, 'SourcesComponent')
      .mockReturnValue('[partial: member.sources]\n');
    testApp = new TestApp(['declarations.ts']);
    await testApp.bootstrap();
  });

  test(`should compile a const with default value`, () => {
    const model = testApp.findReflectionByName('stringConstWithDefaultValue');
    expect(DeclarationComponent(model)).toMatchSnapshot();
  });

  test(`should compile a let with default value`, () => {
    const model = testApp.findReflectionByName('stringLetWithDefaultValue');
    expect(DeclarationComponent(model)).toMatchSnapshot();
  });

  test(`should compile an undefined declaration`, () => {
    const model = testApp.findReflectionByName('undefinedNumberDeclaration');
    expect(DeclarationComponent(model)).toMatchSnapshot();
  });

  test(`should compile object literal declaration`, () => {
    const model = testApp.findReflectionByName('objectLiteralDeclaration');
    expect(DeclarationComponent(model)).toMatchSnapshot();
  });

  test(`should compile object literal cast as a const`, () => {
    const model = testApp.findReflectionByName(
      'objectLiteralAsConstDeclaration',
    );
    expect(DeclarationComponent(model)).toMatchSnapshot();
  });

  test(`should compile type literal declaration`, () => {
    const model = testApp.findReflectionByName('typeLiteralDeclaration');
    expect(DeclarationComponent(model)).toMatchSnapshot();
  });

  test(`should compile declaration with double underscores in name and value`, () => {
    const model = testApp.findReflectionByName(
      '__DOUBLE_UNDERSCORES_DECLARATION__',
    );
    expect(DeclarationComponent(model)).toMatchSnapshot();
  });

  test(`should compile any function type`, () => {
    const model = testApp.findReflectionByName('AnyFunctionType');
    expect(DeclarationComponent(model)).toMatchSnapshot();
  });

  test(`should compile function declaration`, () => {
    const model = testApp.findReflectionByName('functionDeclaration');
    expect(DeclarationComponent(model)).toMatchSnapshot();
  });

  test(`should compile callable declaration`, () => {
    const model = testApp.findReflectionByName('callableDeclaration');
    expect(DeclarationComponent(model)).toMatchSnapshot();
  });

  test(`should compile indexable declaration`, () => {
    const model = testApp.findReflectionByName('indexableDeclaration');
    expect(DeclarationComponent(model)).toMatchSnapshot();
  });

  test(`should compile enum delcaration`, () => {
    const model = testApp.findReflectionByName('EnumDeclarations').children[0];
    expect(DeclarationComponent(model)).toMatchSnapshot();
  });
});
