import { TestApp } from '../../../test/test-app';
import { BreadcrumbsComponent } from './breadcrumbs.component';

describe(`Breadcrumbs Component`, () => {
  let testApp: TestApp;

  beforeAll(async () => {
    testApp = new TestApp(['classes.ts', 'variables.ts']);
    await testApp.bootstrap();
  });

  test(`should compile breadcrumbs for a entrypoint'`, () => {
    const page = testApp.getPageByUrl('modules.md').model;
    expect(BreadcrumbsComponent(page)).toMatchSnapshot();
  });

  test(`should compile breadcrumbs for a module'`, () => {
    const page = testApp.getPageByModelName('classes').model;
    expect(BreadcrumbsComponent(page)).toMatchSnapshot();
  });

  test(`should compile breadcrumbs for a reflection'`, () => {
    const page = testApp.getPageByModelName('Point').model;
    expect(BreadcrumbsComponent(page)).toMatchSnapshot();
  });
});
