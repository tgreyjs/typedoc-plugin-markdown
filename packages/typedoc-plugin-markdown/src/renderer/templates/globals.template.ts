import { PageEvent } from 'typedoc/dist/lib/output/events';

import { MarkdownBuilder } from '../../markdown-tools/builder';
import { heading } from '../../markdown-tools/elements';
import { BreadcrumbsComponent } from '../components/page/breadcrumbs';
import { GroupsComponent } from '../components/page/groups';
import { TocComponent } from '../components/page/toc';
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
