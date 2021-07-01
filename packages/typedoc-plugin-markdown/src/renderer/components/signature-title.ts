import {
  ParameterReflection,
  ReflectionKind,
  SignatureReflection,
} from 'typedoc';

import { MemberSymbolComponent } from './member-symbol';
import { TypeComponent } from './type.component';

export function SignatureTitleComponent(
  model: SignatureReflection,
  accessor?: string,
  standalone = true,
) {
  const md: string[] = [];

  if (standalone) {
    md.push(`${MemberSymbolComponent(model)} `);
  }

  if (model.parent && model.parent.flags?.length > 0) {
    md.push(model.parent.flags.map((flag) => `\`${flag}\``).join(' ') + ' ');
  }

  if (accessor) {
    md.push(`\`${accessor}\` **${model.name}**`);
  } else if (model.name !== '__call' && model.name !== '__type') {
    md.push(`**${model.name}**`);
  }

  if (model.typeParameters) {
    md.push(
      `<${model.typeParameters
        .map((typeParameter) => `\`${typeParameter.name}\``)
        .join(', ')}\\>`,
    );
  }
  md.push(`(${getParameters(model.parameters)})`);

  if (model.type && !model.parent?.kindOf(ReflectionKind.Constructor)) {
    md.push(`: ${TypeComponent(model.type, 'object')}`);
  }
  return md.join('') + (standalone ? '\n' : '');
}

const getParameters = (
  parameters: ParameterReflection[] = [],
  backticks = true,
) => {
  return parameters
    .map((param) => {
      const paramsmd: string[] = [];
      if (param.flags.isRest) {
        paramsmd.push('...');
      }
      const paramItem = `${param.name}${
        param.flags.isOptional || param.defaultValue ? '?' : ''
      }`;
      paramsmd.push(backticks ? `\`${paramItem}\`` : paramItem);
      return paramsmd.join('');
    })
    .join(', ');
};
