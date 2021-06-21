import { Type } from 'typedoc/dist/lib/models/types';

import { unorderedList } from '../../markdown-tools/elements';
import { TypeComponent } from './type';

export function ImplementsComponent(types: Type[]) {
  return unorderedList(
    types.map((implementedType) => TypeComponent(implementedType)),
  );
}
