import { DeclarationReflection } from 'typedoc';

import { MarkdownBuilder } from '../../../markdown-tools/builder';
import { heading, unorderedList } from '../../../markdown-tools/elements';
import { SignatureComponent } from '../member/member.signature';
import { GroupsComponent } from '../page/groups';
import { TocComponent } from '../page/toc';
import { CommentsComponent } from '../shared/comments';
import { TypeParameterTableComponent } from '../shared/table.type-parameter';
import { TypeComponent } from '../shared/type';
import { HierarchyComponent } from './reflection.hierachy';
import { ReflectionPathComponent } from './reflection.path';

export function ReflectionComponent(model: DeclarationReflection) {
  const md = new MarkdownBuilder();

  md.add(ReflectionPathComponent(model));

  if (model.comment) {
    md.add(CommentsComponent(model.comment));
  }

  if (model.typeParameters) {
    md.add(heading(2, 'Type parameters'));
    md.add(TypeParameterTableComponent(model.typeParameters));
  }

  if (model.typeHierarchy && model.typeHierarchy.next) {
    md.add(heading(2, 'Hierarchy'));
    md.add(HierarchyComponent(model.typeHierarchy));
  }

  if (model.implementedTypes) {
    md.add(heading(2, 'Implements'));
    md.add(
      unorderedList(
        model.implementedTypes.map((implementedType) =>
          TypeComponent(implementedType),
        ),
      ),
    );
  }

  if (model.signatures) {
    md.add(heading(2, 'Callable'));
    model.signatures.forEach((signature) => {
      md.add(heading(3, signature.name));
      md.add(SignatureComponent(signature));
    });
  }

  md.add(TocComponent(model));

  if (model.groups) {
    md.add(GroupsComponent(model.groups));
  }

  return md.print();
}
