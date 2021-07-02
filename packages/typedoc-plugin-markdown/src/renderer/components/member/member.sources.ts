import { DeclarationReflection, SignatureReflection } from 'typedoc';
import { ArrayType, ReferenceType, Type } from 'typedoc/dist/lib/models/types';

import { MarkdownBuilder } from '../../../markdown-tools/builder';
import { heading, link } from '../../../markdown-tools/elements';
import { escapeChars } from '../../utils';
import { LinkComponent } from '../shared/link';

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

export function TypeAndParentComponent(
  model: ArrayType | ReferenceType | Type,
) {
  if (model) {
    if ('elementType' in model) {
      return TypeAndParentComponent(model.elementType) + '[]';
    } else {
      if (model instanceof ReferenceType && model.reflection) {
        const md: string[] = [];
        if (model.reflection instanceof SignatureReflection) {
          if (model.reflection.parent?.parent?.url) {
            md.push(
              getUrl(
                model.reflection.parent.parent.name,
                model.reflection.parent.parent.url,
              ),
            );
            if (model.reflection.parent.url) {
              md.push(
                getUrl(
                  model.reflection.parent.name,
                  model.reflection.parent.url,
                ),
              );
            }
          }
        } else {
          if (model.reflection.parent?.url) {
            md.push(
              getUrl(model.reflection.parent.name, model.reflection.parent.url),
            );
            if (model.reflection.url) {
              md.push(getUrl(model.reflection.name, model.reflection.url));
            }
          }
        }
        return md.join('.');
      } else {
        return escapeChars(model.toString());
      }
    }
  }
  return 'void';
}

const getUrl = (name: string, url: string) => LinkComponent(name, url);
