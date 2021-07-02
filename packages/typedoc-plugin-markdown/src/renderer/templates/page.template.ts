import { DeclarationReflection } from 'typedoc';
import { PageEvent } from 'typedoc/dist/lib/output/events';

import { MarkdownBuilder } from '../../markdown-tools/builder';
import { heading } from '../../markdown-tools/elements';
import { BreadcrumbsComponent } from '../components/page/breadcrumbs';
import { GroupsComponent } from '../components/page/groups';
import { PageTitleComponent } from '../components/page/page-title';
import { TocComponent } from '../components/page/toc';
import { ReflectionComponent } from '../components/reflection/reflection';
import { useState } from '../store';

export function PageTemplate(page: PageEvent) {
  const md = new MarkdownBuilder();

  const { options } = useState();

  if (!options.hideBreadcrumbs) {
    md.add(BreadcrumbsComponent(page.model));
  }

  md.add(heading(1, PageTitleComponent(page.model)));

  if (page.model instanceof DeclarationReflection) {
    md.add(ReflectionComponent(page.model));
  } else {
    md.add(TocComponent(page.model));
    md.add(GroupsComponent(page.model.groups));
  }

  return md.print();
}
