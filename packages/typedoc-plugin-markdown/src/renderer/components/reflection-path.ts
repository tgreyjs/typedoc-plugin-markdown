import { DeclarationReflection, ReflectionKind } from 'typedoc';

import { RelativeUrlComponent } from './relative-url';

export function ReflectionPathComponent(model: DeclarationReflection) {
  if (model) {
    if (model.kind && model.kind !== ReflectionKind.Module) {
      const title: string[] = [];
      if (model.parent && model.parent.parent) {
        if (model.parent.parent.parent) {
          title.push(
            `[${model.parent.parent.name}](${RelativeUrlComponent(
              model.parent.parent.url || '',
            )})`,
          );
        }
        title.push(
          `[${model.parent.name}](${RelativeUrlComponent(
            model.parent.url || '',
          )})`,
        );
      }
      title.push(model.name);
      return title.length > 1 ? `${title.join('.')}` : '';
    }
  }
  return '';
}
