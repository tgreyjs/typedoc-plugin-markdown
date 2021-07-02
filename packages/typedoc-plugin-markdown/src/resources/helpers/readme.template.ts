import { PageEvent } from 'typedoc/dist/lib/output/events';

import { MarkdownBuilder } from '../../markdown-tools/builder';
import { comment } from '../../renderer/components/shared/comments';

export function readmeTemplate(this: PageEvent) {
  const md = new MarkdownBuilder();
  if (this.project.readme) {
    md.add(comment(this.project.readme));
  }
  return md.print();
}
