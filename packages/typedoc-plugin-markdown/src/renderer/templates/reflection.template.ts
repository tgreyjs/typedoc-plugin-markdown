import { PageEvent } from 'typedoc/dist/lib/output/events';

import { MarkdownBuilder } from '../../markdown-tools/builder';
import { heading } from '../../markdown-tools/elements';
import { BreadcrumbsComponent } from '../components/breadcrumbs.component';
import { ReflectionPathComponent } from '../components/reflection-path';
import { ReflectionTitleComponent } from '../components/reflection-title';
import { ReflectionComponent } from '../components/reflection.component';
import { useState } from '../store';

export function PageTemplate(page: PageEvent) {
  const md = new MarkdownBuilder();

  const { options } = useState();

  if (!options.hideBreadcrumbs) {
    md.add(BreadcrumbsComponent(page.model));
  }

  md.add(heading(1, ReflectionTitleComponent(page.model)));

  md.add(ReflectionPathComponent(page.model));

  md.add(ReflectionComponent(page.model));

  return md.print();
}
