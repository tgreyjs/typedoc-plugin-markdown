import { BreadcrumbsComponent } from '../../src/renderer/components/page/breadcrumbs';
import { TestApp } from '../test-app';

describe(`Breadcrumbs:`, () => {
  let testApp: TestApp;

  beforeAll(async () => {
    testApp = new TestApp(['reflections.ts', 'declarations.ts']);
    await testApp.bootstrap();
  });

  test(`should compile breadcrumbs for a entrypoint'`, () => {
    const page = testApp.getPageByUrl('modules.md').model;
    expect(BreadcrumbsComponent(page)).toMatchSnapshot();
  });

  test(`should compile breadcrumbs for a module'`, () => {
    const page = testApp.getPageByModelName('reflections').model;
    expect(BreadcrumbsComponent(page)).toMatchSnapshot();
  });

  test(`should compile breadcrumbs for a reflection'`, () => {
    const page = testApp.getPageByModelName('ReflectionClass').model;
    expect(BreadcrumbsComponent(page)).toMatchSnapshot();
  });
});
