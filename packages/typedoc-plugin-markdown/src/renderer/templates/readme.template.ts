import { PageEvent } from 'typedoc/dist/lib/output/events';

import { MarkdownBuilder } from '../../markdown-tools/builder';
import { comment } from '../components/shared/comments';

export function ReadmeTemplate(page: PageEvent) {
  const md = new MarkdownBuilder();
  if (page.project.readme) {
    md.add(comment(page.project.readme));
  }
  return md.print();
}
