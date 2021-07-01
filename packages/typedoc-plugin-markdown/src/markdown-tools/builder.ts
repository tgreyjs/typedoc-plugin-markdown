export class MarkdownBuilder {
  items: string[];

  constructor() {
    this.items = [];
  }

  add(content: string) {
    this.items.push(content);
  }

  format(contents: string) {
    return (
      contents
        .replace(/[\r\n]{3,}/g, '\n\n')
        .replace(/!spaces/g, '')
        .replace(/^\s+|\s+$/g, '') + '\n'
    );
  }

  print(joinChars = '\n\n') {
    return this.format(this.items.filter((item) => item).join(joinChars));
  }
}
