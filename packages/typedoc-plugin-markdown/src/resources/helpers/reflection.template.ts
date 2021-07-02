import { PageEvent } from 'typedoc/dist/lib/output/events';

import { ReflectionTemplate } from '../../renderer/templates/reflection.template';

export function reflectionTemplate(this: PageEvent) {
  return ReflectionTemplate(this);
}
