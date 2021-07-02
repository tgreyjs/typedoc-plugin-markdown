import { CommentsComponent } from '../../src/renderer/components/shared/comments';
import { setState } from '../../src/renderer/store';
import { TestApp } from '../test-app';

describe(`Comments:`, () => {
  let testApp: TestApp;

  beforeAll(async () => {
    testApp = new TestApp(['comments.ts', 'declarations.ts']);
    await testApp.bootstrap();
  });

  test(`should build @link reference'`, () => {
    const page = testApp.getPageByModelName('comments').model;
    setState({ currentModel: page });
    const reflection = testApp.project.findReflectionByName(
      'commentsWithDocLinks',
    );
    expect(CommentsComponent(reflection.comment)).toMatchSnapshot();
  });

  test(`should convert symbols brackets to symbol links'`, () => {
    const page = testApp.getPageByModelName('comments').model;
    setState({ currentModel: page });
    const reflection = testApp.project.findReflectionByName(
      'commentsWithSymbolLinks',
    );
    expect(CommentsComponent(reflection.comment)).toMatchSnapshot();
  });

  test(`should convert comments with tags'`, () => {
    const page = testApp.getPageByModelName('comments').model;
    setState({ currentModel: page });
    const reflection = testApp.project.findReflectionByName('commentsWithTags');
    expect(CommentsComponent(reflection.comment)).toMatchSnapshot();
  });

  test(`should allow html in comments'`, () => {
    const page = testApp.getPageByModelName('comments').model;
    setState({ currentModel: page });
    const reflection = testApp.project.findReflectionByName('commentsWithHTML');
    expect(CommentsComponent(reflection.comment)).toMatchSnapshot();
  });
});
