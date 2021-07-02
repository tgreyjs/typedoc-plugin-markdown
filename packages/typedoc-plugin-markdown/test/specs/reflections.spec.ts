import * as groupsComponent from '../../src/renderer/components/page/groups';
import * as tocComponent from '../../src/renderer/components/page/toc';
import { ReflectionComponent } from '../../src/renderer/components/reflection/reflection';
import { TestApp } from '../test-app';

describe(`Reflections:`, () => {
  let testApp: TestApp;

  beforeAll(async () => {
    jest.spyOn(tocComponent, 'TocComponent').mockReturnValue('[TOC]');
    jest.spyOn(groupsComponent, 'GroupsComponent').mockReturnValue('[GROUPS]');
    testApp = new TestApp(['reflections.ts', 'hierarchy.ts']);
    await testApp.bootstrap();
  });

  describe(`(template)`, () => {
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

    test(`should compile Enum`, () => {
      const reflection = testApp.findReflectionByName('EnumReflection');
      expect(ReflectionComponent(reflection)).toMatchSnapshot();
    });
  });
  describe(`(hierarchy)`, () => {
    test(`should compile type hierarchy`, () => {
      const reflection = testApp.findReflectionByName('ParentClass');
      expect(ReflectionComponent(reflection)).toMatchSnapshot();
    });

    test(`should compile nested type hierarchy`, () => {
      const reflection = testApp.findReflectionByName('ChildClassA');
      expect(ReflectionComponent(reflection)).toMatchSnapshot();
    });
  });
});
