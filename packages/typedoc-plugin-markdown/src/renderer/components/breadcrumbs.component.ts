import { DeclarationReflection, ProjectReflection, Reflection } from 'typedoc';
import { MarkdownBuilder } from '../../markdown-tools/builder';
import { link } from '../../markdown-tools/elements';
import { useState } from '../store';
import { escapeChars } from '../utils';
import { RelativeUrlComponent } from './relative-url';

export function BreadcrumbsComponent(
  model: ProjectReflection | DeclarationReflection | Reflection,
) {
  const { globalsName, currentUrl } = useState();

  const md = new MarkdownBuilder();

  if (currentUrl === 'modules.md') {
    md.add(globalsName);
  } else {
    md.add(link(globalsName, RelativeUrlComponent('modules.md')));
  }

  const addBreadcrumb = (model: Reflection, md: MarkdownBuilder) => {
    if (model.parent) {
      addBreadcrumb(model.parent, md);
      if (currentUrl === model.url) {
        md.add(escapeChars(model.name));
      } else {
        md.add(link(escapeChars(model.name), RelativeUrlComponent(model.url)));
      }
    }
  };

  addBreadcrumb(model, md);

  return md.print(' / ');
}
