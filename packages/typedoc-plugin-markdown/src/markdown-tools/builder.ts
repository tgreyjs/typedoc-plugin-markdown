export class MarkdownBuilder {
  items: string[];

  constructor() {
    this.items = [];
  }

  add(content: string) {
    this.items.push(content);
  }

  print(joinChars = '\n\n') {
    return this.items.filter((item) => item).join(joinChars);
  }
}
