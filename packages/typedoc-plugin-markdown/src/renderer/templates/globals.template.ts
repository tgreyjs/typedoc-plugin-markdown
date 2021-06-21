import { PageEvent } from 'typedoc/dist/lib/output/events';

import { MarkdownBuilder } from '../../markdown-tools/builder';
import { heading } from '../../markdown-tools/elements';
import { BreadcrumbsComponent } from '../components/breadcrumbs.component';
import { GroupComponent } from '../components/group';
import { TocComponent } from '../components/toc.component';
import { useState } from '../store';

export function GlobalsTemplate(page: PageEvent) {
  const md = new MarkdownBuilder();

  const { options } = useState();

  if (!options.hideBreadcrumbs) {
    md.add(BreadcrumbsComponent(page.model));
  }

  md.add(heading(1, page.project.name));

  md.add(TocComponent(page.model));

  page.model.groups
    ?.filter((group) => !group.allChildrenHaveOwnDocument())
    .forEach((group) => {
      md.add(GroupComponent(group));
    });

  return md.print();
}
