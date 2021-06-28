import { DeclarationReflection } from 'typedoc/dist/lib/models';

import { MarkdownBuilder } from '../../markdown-tools//builder';

export function ReferenceComponent(model: DeclarationReflection) {
  const md = new MarkdownBuilder();

  md.add(`Re-exports ${model.name}`);

  return md.print();
}
