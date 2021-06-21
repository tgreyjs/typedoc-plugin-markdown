import { TestApp } from '../../../test/test-app';
import { DeclarationTitleComponent } from './declaration-title.component';
describe(`Declaration Title Component`, () => {
  let testApp: TestApp;

  beforeAll(async () => {
    testApp = new TestApp(['declarations.ts']);
    await testApp.bootstrap();
  });

  test(`should compile a const with default value`, () => {
    const model = testApp.findReflectionByName('constWithDefaultValue');
    expect(DeclarationTitleComponent(model)).toMatchSnapshot();
  });

  test(`should compile a let with default value`, () => {
    const model = testApp.findReflectionByName('letWithDefaultValue');
    expect(DeclarationTitleComponent(model)).toMatchSnapshot();
  });

  test(`should compile an undefined declaration`, () => {
    const model = testApp.findReflectionByName('undefinedNumberDeclaration');
    expect(DeclarationTitleComponent(model)).toMatchSnapshot();
  });
});
