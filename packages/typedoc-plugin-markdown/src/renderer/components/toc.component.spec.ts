import { TestApp } from '../../../test/test-app';
import { setState } from '../store';
import { TocComponent } from './toc.component';

describe(`Toc Component`, () => {
  let testApp: TestApp;

  beforeAll(async () => {
    testApp = new TestApp(['categories.ts', 'toc.ts']);
    await testApp.bootstrap();
  });

  describe(`(with hideInPageTOC=false)`, () => {
    beforeAll(async () => {
      setState({ options: { hideInPageTOC: false } });
    });

    test(`should compile module toc'`, () => {
      const model = testApp.getPageByModelName('toc').model;
      expect(TocComponent(model)).toMatchSnapshot();
    });

    test(`should compile module toc with categories'`, () => {
      const model = testApp.getPageByModelName('categories').model;
      expect(TocComponent(model)).toMatchSnapshot();
    });

    test(`should compile interface toc'`, () => {
      const model = testApp.getPageByModelName('Interface1').model;
      expect(TocComponent(model)).toMatchSnapshot();
    });
  });

  describe(`(with hideInPageTOC=true)`, () => {
    beforeAll(async () => {
      setState({ options: { hideInPageTOC: true } });
    });

    test(`should compile basic groups'`, () => {
      const model = testApp.getPageByModelName('toc').model;
      expect(TocComponent(model)).toMatchSnapshot();
    });

    test(`should compile category groups'`, () => {
      const model = testApp.getPageByModelName('categories').model;
      expect(TocComponent(model)).toMatchSnapshot();
    });

    test(`should compile interface toc'`, () => {
      const model = testApp.getPageByModelName('Interface1').model;
      expect(TocComponent(model)).toBe('');
    });
  });
});
