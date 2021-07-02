import {
  DeclarationReflection,
  SignatureReflection,
} from 'typedoc/dist/lib/models';

import { MarkdownBuilder } from '../../../markdown-tools/builder';
import { heading } from '../../../markdown-tools/elements';
import { CommentsComponent } from '../shared/comments';
import { PropertyTableComponent } from '../shared/table.property';
import { TypeParameterTableComponent } from '../shared/table.type-parameter';
import { TypeComponent } from '../shared/type';
import { DeclarationTitleComponent } from './member.declaration.title';
import { SignatureComponent } from './member.signature';
import { SourcesComponent } from './member.sources';

export function DeclarationComponent(model: DeclarationReflection) {
  const md = new MarkdownBuilder();

  const typeDeclaration = (model.type as any)
    ?.declaration as DeclarationReflection;

  md.add(DeclarationTitleComponent(model));

  if (model.comment) {
    md.add(CommentsComponent(model.comment));
  }

  if (model.typeParameters) {
    md.add(heading(4, 'Type parameters'));
    md.add(TypeParameterTableComponent(model.typeParameters));
  }

  if (typeDeclaration?.indexSignature) {
    md.add(heading(4, 'Index signature'));
    md.add(getIndexSignatureTitle(typeDeclaration.indexSignature));
  }

  if (typeDeclaration?.signatures) {
    md.add(
      heading(
        4,
        typeDeclaration.children ? 'Call signature' : 'Type declaration',
      ),
    );
    typeDeclaration.signatures.forEach((signature) => {
      md.add(SignatureComponent(signature, true));
    });
  }

  if (typeDeclaration?.children) {
    md.add(heading(4, 'Type declaration'));
    md.add(PropertyTableComponent(typeDeclaration.children));
  }

  md.add(SourcesComponent(model));

  return md.print();
}

export function getIndexSignatureTitle(model: SignatureReflection) {
  const md = ['▪'];
  const parameters = model.parameters
    ? model.parameters.map((parameter) => {
        return `${parameter.name}: ${
          parameter.type ? TypeComponent(parameter.type) : ''
        }`;
      })
    : [];
  md.push(
    `\[${parameters.join('')}\]: ${
      model.type ? TypeComponent(model.type) : ''
    }`,
  );
  return md.join(' ');
}
