import { TestApp } from '../../../test/test-app';
import { HierarchyComponent } from './reflection.hierachy';

describe(`Hierarchy Component`, () => {
  let testApp: TestApp;

  beforeAll(async () => {
    testApp = new TestApp(['hierarchy.ts']);
    await testApp.bootstrap();
  });

  test(`should compile nested type hierarchy`, () => {
    const reflection = testApp.findReflectionByName('ChildClassA');
    expect(HierarchyComponent(reflection.typeHierarchy)).toMatchSnapshot();
  });
});
