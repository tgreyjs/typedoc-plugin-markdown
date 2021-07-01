import { PageEvent } from 'typedoc/dist/lib/output/events';

import { MarkdownBuilder } from '../../markdown-tools/builder';
import { heading } from '../../markdown-tools/elements';
import { BreadcrumbsComponent } from '../components/breadcrumbs.component';
import { GroupsComponent } from '../components/groups.component';
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

  md.add(GroupsComponent(page.model.groups));

  return md.print();
}
