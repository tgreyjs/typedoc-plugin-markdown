import {
  DeclarationReflection,
  ReflectionCategory,
  ReflectionGroup,
} from 'typedoc/dist/lib/models';
import { MarkdownBuilder } from '../../markdown-tools/builder';
import { heading, horizontalRule } from '../../markdown-tools/elements';
import { MemberComponent } from './member';

export function GroupsComponent(groups: ReflectionGroup[]) {
  const md = new MarkdownBuilder();

  groups.forEach((group) => {
    if (group.categories) {
      group.categories
        ?.filter((category) => !category.allChildrenHaveOwnDocument())
        .forEach((category) => {
          md.add(heading(2, `${group.title}  ${category.title}`));
          md.add(getMembers(category));
        });
    } else {
      md.add(heading(2, group.title));
      md.add(getMembers(group));
    }
  });

  return md.print();
}

function getMembers(item: ReflectionGroup | ReflectionCategory) {
  const md = new MarkdownBuilder();
  item.children.forEach((child, index) => {
    md.add(MemberComponent(child as DeclarationReflection));
    if (index !== item.children.length - 1) {
      md.add(horizontalRule());
    }
  });
  return md.print();
}
