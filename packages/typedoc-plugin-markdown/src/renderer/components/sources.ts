import { DeclarationReflection, SignatureReflection } from 'typedoc';

import { MarkdownBuilder } from '../../markdown-tools//builder';
import { heading, link } from '../../markdown-tools//elements';
import { TypeAndParentComponent } from './type-and-parent';

export function SourcesComponent(
  model: DeclarationReflection | SignatureReflection,
) {
  const md = new MarkdownBuilder();

  if (model.implementationOf) {
    md.add(heading(4, 'Implementation of'));
    md.add(TypeAndParentComponent(model.implementationOf));
  }

  if (model.inheritedFrom) {
    md.add(heading(4, 'Inherited from'));
    md.add(TypeAndParentComponent(model.inheritedFrom));
  }

  if (model.overwrites) {
    md.add(heading(4, 'Overrides'));
    md.add(TypeAndParentComponent(model.overwrites));
  }

  if (model.sources) {
    md.add(heading(4, 'Defined in'));

    model.sources.forEach((source) => {
      if (source.url) {
        md.add(link(`${source.fileName}:${source.line}`, source.url));
      } else {
        md.add(`${source.fileName}:${source.line}`);
      }
    });
  }

  return md.print();
}
