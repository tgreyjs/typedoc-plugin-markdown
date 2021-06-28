import { TestApp } from '../../../test/test-app';
import * as groupsComponent from './groups.component';
import { ReflectionComponent } from './reflection.component';
import * as hierachyComponent from './reflection.hierachy';
import * as tocComponent from './toc.component';

describe(`Reflection Component:`, () => {
  let testApp: TestApp;

  beforeAll(async () => {
    jest.spyOn(tocComponent, 'TocComponent').mockReturnValue('[TOC]');
    jest
      .spyOn(hierachyComponent, 'HierarchyComponent')
      .mockReturnValue('[HIERARCHY]');
    jest.spyOn(groupsComponent, 'GroupsComponent').mockReturnValue('[GROUPS]');
    testApp = new TestApp(['reflections.ts', 'hierarchy.ts']);
    await testApp.bootstrap();
  });

  test(`should compile a callable reflection`, () => {
    const reflection = testApp.findReflectionByName('CallableReflection');
    expect(ReflectionComponent(reflection)).toMatchSnapshot();
  });

  test(`should compile an indexable reflection`, () => {
    const reflection = testApp.findReflectionByName('IndexableReflection');
    expect(ReflectionComponent(reflection)).toMatchSnapshot();
  });

  test(`should compile implemented class`, () => {
    const reflection = testApp.findReflectionByName('ImplementedClass');
    expect(ReflectionComponent(reflection)).toMatchSnapshot();
  });

  test(`should compile nested type hierarchy`, () => {
    const reflection = testApp.findReflectionByName('ChildClassA');
    expect(ReflectionComponent(reflection)).toMatchSnapshot();
  });
});
