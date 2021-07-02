import {
  DeclarationReflection,
  ReflectionKind,
  SignatureReflection,
} from 'typedoc';

import { MarkdownBuilder } from '../../../markdown-tools/builder';
import { heading } from '../../../markdown-tools/elements';
import { CommentsComponent, comment } from '../shared/comments';
import { ParameterTable } from '../shared/table.parameter';
import { PropertyTableComponent } from '../shared/table.property';
import { TypeParameterTableComponent } from '../shared/table.type-parameter';
import { TypeComponent } from '../shared/type';
import { SignatureTitleComponent } from './member.signature.title';
import { SourcesComponent } from './member.sources';

export function SignatureComponent(model: SignatureReflection, nested = false) {
  const md = new MarkdownBuilder();

  const typeDeclaration = (model.type as any)
    ?.declaration as DeclarationReflection;

  md.add(SignatureTitleComponent(model));

  if (model.comment) {
    md.add(CommentsComponent(model.comment));
  }

  if (model.typeParameters?.length) {
    md.add(heading(nested ? 5 : 4, 'Type parameters'));
    md.add(TypeParameterTableComponent(model.typeParameters));
  }

  if (model.parameters?.length) {
    md.add(heading(nested ? 5 : 4, 'Parameters'));
    md.add(ParameterTable(model.parameters));
  }

  if (model.type && !model.parent?.kindOf(ReflectionKind.Constructor)) {
    if (model.type) {
      md.add(heading(nested ? 5 : 4, 'Returns'));
      md.add(TypeComponent(model.type, 'all'));
      if (model.comment?.returns) {
        md.add(comment(model.comment.returns));
      }
    }

    if (typeDeclaration?.signatures) {
      typeDeclaration.signatures.forEach((signature) => {
        md.add(SignatureComponent(signature, true));
      });
    }

    if (typeDeclaration?.children) {
      md.add(PropertyTableComponent(typeDeclaration.children));
    }
  }

  if (!nested) {
    md.add(SourcesComponent(model));
  }

  return md.print();
}
