import { DeclarationReflection } from 'typedoc/dist/lib/models';

import { MarkdownBuilder } from '../../markdown-tools//builder';
import { heading } from '../../markdown-tools//elements';
import { CommentsComponent } from './comments.component';
import { IndexSignatureTitleComponent } from './index-signature-title';
import { SignatureComponent } from './member.signature';
import { PropertyTableComponent } from './property-table';
import { SourcesComponent } from './sources';
import { DeclarationTitleComponent } from './title.declaration.component';
import { TypeParameterTableComponent } from './type-parameter-table';

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
    md.add(IndexSignatureTitleComponent(typeDeclaration.indexSignature));
  }

  if (typeDeclaration?.signatures) {
    md.add(
      heading(
        3,
        typeDeclaration.children ? 'Call signature' : 'Type declaration',
      ),
    );
    typeDeclaration.signatures.forEach((signature) => {
      md.add(SignatureComponent(signature));
    });
  }

  if (typeDeclaration?.children) {
    md.add(heading(4, 'Type declaration'));
    md.add(PropertyTableComponent(typeDeclaration.children));
  }

  md.add(SourcesComponent(model));

  return md.print();
}
