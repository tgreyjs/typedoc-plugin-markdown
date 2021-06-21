import { DeclarationReflection } from 'typedoc';

import { MarkdownBuilder } from '../../markdown-tools//builder';
import { heading } from '../../markdown-tools//elements';
import { CommentsComponent } from './comments.component';
import { GroupComponent } from './group';
import { HierarchyComponent } from './hierachy';
import { ImplementsComponent } from './implements';
import { TocComponent } from './toc.component';
import { TypeParameterTableComponent } from './type-parameter-table';

export function ReflectionComponent(model: DeclarationReflection) {
  const md = new MarkdownBuilder();

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
    md.add(ImplementsComponent(model.implementedTypes));
  }

  if (model.signatures) {
    md.add(heading(2, 'Callable'));
    model.signatures.forEach((signature) => {
      md.add(heading(3, signature.name));
    });
  }

  md.add(TocComponent(model));

  model.groups
    ?.filter((group) => !group.allChildrenHaveOwnDocument())
    .forEach((group) => {
      md.add(GroupComponent(group));
    });

  return md.print();
}
