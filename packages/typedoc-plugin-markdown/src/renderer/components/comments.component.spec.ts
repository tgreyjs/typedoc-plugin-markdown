import { TestApp } from '../../../test/test-app';
import { setState } from '../store';
import { CommentsComponent } from './comments.component';

describe(`Comments Component`, () => {
  let testApp: TestApp;

  beforeAll(async () => {
    testApp = new TestApp(['comments.ts', 'variables.ts']);
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
