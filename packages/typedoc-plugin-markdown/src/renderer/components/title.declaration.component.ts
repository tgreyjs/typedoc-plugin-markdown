import { DeclarationReflection, ParameterReflection } from 'typedoc';
import {
  LiteralType,
  ReflectionKind,
  ReflectionType,
} from 'typedoc/dist/lib/models';

import { MarkdownBuilder } from '../../markdown-tools/builder';
import { escapeChars, stripComments, stripLineBreaks } from '../utils';
import { MemberSymbolComponent } from './member-symbol';
import { TypeComponent } from './type.component';

export function DeclarationTitleComponent(
  model: ParameterReflection | DeclarationReflection,
) {
  const md = new MarkdownBuilder();

  md.add(MemberSymbolComponent(model));

  if (model.flags && model.flags.length > 0 && !model.flags.isRest) {
    md.add(' ' + model.flags.map((flag) => `\`${flag}\``).join(' '));
  }
  md.add(`${model.flags.isRest ? '... ' : ''} **${escapeChars(model.name)}**`);
  if (model instanceof DeclarationReflection && model.typeParameters) {
    md.add(
      `<${model.typeParameters
        .map((typeParameter) => `\`${typeParameter.name}\``)
        .join(', ')}\\>`,
    );
  }

  if (!model.parent?.kindOf(ReflectionKind.Enum)) {
    md.add(getType(model));
  }

  if (
    !(model.type instanceof LiteralType) &&
    model.defaultValue &&
    model.defaultValue !== '...'
  ) {
    md.add(
      ` = \`${stripLineBreaks(escape(stripComments(model.defaultValue)))}\``,
    );
  }
  return md.print('');
}

function getType(reflection: ParameterReflection | DeclarationReflection) {
  const reflectionType = reflection.type as ReflectionType;
  if (reflectionType && reflectionType.declaration?.children) {
    return ': `Object`';
  }
  return (
    ': ' + TypeComponent(reflectionType ? reflectionType : reflection, 'object')
  );
}
