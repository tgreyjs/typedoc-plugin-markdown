import { PageEvent } from 'typedoc/dist/lib/output/events';

import { PageTemplate } from '../../renderer/templates/reflection.template';

export function reflectionTemplate(this: PageEvent) {
  return PageTemplate(this);
}
