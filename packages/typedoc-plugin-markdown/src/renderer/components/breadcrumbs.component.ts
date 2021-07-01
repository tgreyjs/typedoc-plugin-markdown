import { DeclarationReflection, ProjectReflection, Reflection } from 'typedoc';

import { MarkdownBuilder } from '../../markdown-tools/builder';
import { useState } from '../store';
import { escapeChars } from '../utils';
import { LinkComponent } from './link.component';

export function BreadcrumbsComponent(
  model: ProjectReflection | DeclarationReflection | Reflection,
) {
  const { globalsName, currentUrl } = useState();

  const md = new MarkdownBuilder();

  if (currentUrl === 'modules.md') {
    md.add(globalsName);
  } else {
    md.add(LinkComponent(globalsName, 'modules.md'));
  }

  const addBreadcrumb = (model: Reflection, md: MarkdownBuilder) => {
    if (model.parent) {
      addBreadcrumb(model.parent, md);
      if (currentUrl === model.url) {
        md.add(escapeChars(model.name));
      } else {
        md.add(LinkComponent(model.name, model.url));
      }
    }
  };

  addBreadcrumb(model, md);

  return md.print(' / ');
}
