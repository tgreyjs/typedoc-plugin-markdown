import {
  DeclarationReflection,
  ReflectionGroup,
} from 'typedoc/dist/lib/models';

import { heading, horizontalRule } from '../../markdown-tools//elements';
import { MarkdownBuilder } from '../../markdown-tools/builder';
import { MemberComponent } from './member';

export function GroupComponent(model: ReflectionGroup) {
  const md = new MarkdownBuilder();
  md.add(heading(2, model.title));
  model.children.forEach((child, index) => {
    md.add(MemberComponent(child as DeclarationReflection));
    if (index !== model.children.length - 1) {
      md.add(horizontalRule());
    }
  });
  return md.print();
}
