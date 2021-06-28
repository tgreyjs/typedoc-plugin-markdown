import { DeclarationReflection } from 'typedoc';
import { TestApp } from '../../../test/test-app';
import { GroupsComponent } from './groups.component';
import * as membersComponent from './member';

describe(`Groups Component:`, () => {
  let testApp: TestApp;

  beforeAll(async () => {
    jest.spyOn(membersComponent, 'MemberComponent').mockReturnValue('[MEMBER]');
    testApp = new TestApp(['categories.ts', 'reflections.ts']);
    await testApp.bootstrap();
  });

  test(`should compile groups`, () => {
    const page = testApp.getPageByModelName('reflections');
    expect(
      GroupsComponent((page.model as DeclarationReflection).groups),
    ).toMatchSnapshot();
  });

  test(`should compile groups with categories`, () => {
    const page = testApp.getPageByModelName('categories');
    expect(
      GroupsComponent((page.model as DeclarationReflection).groups),
    ).toMatchSnapshot();
  });
});
