import { DeclarationReflection, ReferenceReflection } from 'typedoc';

import { MarkdownBuilder } from '../../../markdown-tools/builder';
import { heading } from '../../../markdown-tools/elements';
import { useState } from '../../store';
import { escapeChars } from '../../utils';
import { DeclarationComponent } from './member.declaration';
import { SignatureComponent } from './member.signature';

export function MemberComponent(
  model: DeclarationReflection | ReferenceReflection,
) {
  const { options } = useState();
  const md = new MarkdownBuilder();

  md.add(
    heading(
      3,
      options.namedAnchors
        ? `<a id="${model.anchor}" name="${model.anchor}"></a> `
        : '' + escapeChars(model.name),
    ),
  );

  if (model.signatures) {
    model.signatures.forEach((signature) => {
      md.add(SignatureComponent(signature));
    });
  } else {
    if (model.getSignature) {
      md.add(SignatureComponent(model.getSignature));
    }

    if (model.setSignature) {
      md.add(SignatureComponent(model.setSignature));
    }

    if (model instanceof ReferenceReflection && model.isReference) {
      const deep = model.tryGetTargetReflectionDeep();
      if (deep) {
        md.add(`Re-exports ${deep.name}`);
      }
    }

    if (model instanceof DeclarationReflection) {
      md.add(DeclarationComponent(model));
    }
  }

  return md.print();
}
