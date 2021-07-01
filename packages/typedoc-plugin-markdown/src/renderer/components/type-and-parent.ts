import { SignatureReflection } from 'typedoc';
import { ArrayType, ReferenceType, Type } from 'typedoc/dist/lib/models/types';

import { escapeChars } from '../utils';
import { LinkComponent } from './link.component';

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
