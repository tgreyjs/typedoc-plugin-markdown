import { DeclarationReflection, ReflectionKind } from 'typedoc';

import { LinkComponent } from './link.component';

export function ReflectionPathComponent(model: DeclarationReflection) {
  if (model) {
    if (model.kind && model.kind !== ReflectionKind.Module) {
      const title: string[] = [];
      if (model.parent && model.parent.parent) {
        if (model.parent.parent.parent) {
          title.push(
            LinkComponent(model.parent.parent.name, model.parent.parent.url),
          );
        }
        title.push(LinkComponent(model.parent.name, model.parent.url));
      }
      title.push(model.name);
      return title.length > 1 ? `${title.join('.')}` : '';
    }
  }
  return '';
}
