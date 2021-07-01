import { PageEvent } from 'typedoc/dist/lib/output/events';

import { GlobalsTemplate } from '../../renderer/templates/globals.template';

export function globalsTemplate(this: PageEvent) {
  return GlobalsTemplate(this);
}
