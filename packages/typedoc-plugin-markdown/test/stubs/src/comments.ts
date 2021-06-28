/**
 * - {@linkcode CommentClass}
 * - {@link CommentClass.comment}
 * - {@link unknownA}
 * - {@linkplain commentsInReturn}
 * - {@link https://www.google.com|Google}
 * - {@link https://github.com GitHub}
 */
export const commentsWithDocLinks = true;

/**
 * Additionally you can link to other classes, members or functions using double square brackets.
 *
 * - [[CommentClass]]
 * - [[commentsInReturn]]
 * - [[unknownB]]
 */
export const commentsWithSymbolLinks = true;

/**
 * <p>
 * You can write <strong>HTML</strong> tags directly in <a href="comments">comments</a>
 * </p>
 * <ul>
 * <li>List item</li>
 * </ul>
 */
export const commentsWithHTML = true;

/**
 * ## Markdown
 * > Note
 * - Some *basic* [markdown](markdown)
 */
export const commentsWithMarkdown = true;

/**
 * @name Tag description on same line
 * @description
 * Tag description on new line
 *
 * - Tag description on another line
 *
 * @deprecated
 * Another tag description
 */
export const commentsWithTags = true;

/**
 * Some comments with fence blocks
 *
 * ```typescript
 * someFunction()
 * ```
 *
 * ```js
 * anotherFunction()
 * ```
 */
export const commentsWithFencedBlock = true;

/**
 * Comments with a return definition
 * @returns Return comments
 */
export function commentsInReturn() {
  return;
}

/**
 * Comment for class
 */
export class CommentClass {
  /**
   * Comment for property
   */
  comment: string;
  /**
   * Comment for constructor
   */
  constructor(comment: string) {
    this.comment = comment;
  }
  /**
   * Comment for method
   */
  getComment() {
    return 'Comment';
  }
}
