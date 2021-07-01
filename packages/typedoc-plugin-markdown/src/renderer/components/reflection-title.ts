import { DeclarationReflection } from 'typedoc';

import { useState } from '../store';
import { escapeChars } from '../utils';

export function ReflectionTitleComponent(
  model: DeclarationReflection,
  shouldEscape = true,
) {
  const title: string[] = [''];

  const { currentUrl: url, project, options } = useState();

  if (model && model.kindString && url !== project?.url) {
    title.push(`${model.kindString}: `);
  }
  if (url === project?.url) {
    title.push(options.indexTitle || project?.name);
  } else {
    title.push(shouldEscape ? escapeChars(model.name) : model.name);
    if (model.typeParameters) {
      const typeParameters = model.typeParameters
        .map((typeParameter) => typeParameter.name)
        .join(', ');
      title.push(`<${typeParameters}${shouldEscape ? '\\>' : '>'}`);
    }
  }
  return title.join('');
}
