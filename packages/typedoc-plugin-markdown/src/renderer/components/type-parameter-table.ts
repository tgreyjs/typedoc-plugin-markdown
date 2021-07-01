import { TypeParameterReflection } from 'typedoc';
import { stripLineBreaks } from '../utils';
import { CommentsComponent } from './comments.component';
import { TypeComponent } from './type';

export function TypeParameterTableComponent(
  parameters: TypeParameterReflection[],
) {
  const showTypeCol = hasTypes(parameters);
  const comments = parameters.map(
    (param) =>
      !!param.comment?.text?.trim() || !!param.comment?.shortText?.trim(),
  );
  const hasComments = !comments.every((value) => !value);

  const headers = ['Name'];

  if (showTypeCol) {
    headers.push('Type');
  }

  if (hasComments) {
    headers.push('Description');
  }

  const rows = parameters.map((parameter) => {
    const row: string[] = [];

    row.push(`\`${parameter.name}\``);

    if (showTypeCol) {
      const typeCol: string[] = [];
      if (!parameter.type && !parameter.default) {
        typeCol.push(`\`${parameter.name}\``);
      }
      if (parameter.type) {
        typeCol.push(`extends ${TypeComponent(parameter.type, 'object')}`);
      }
      if (parameter.default) {
        typeCol.push(TypeComponent(parameter.default));
      }
      row.push(typeCol.join(''));
    }
    if (hasComments) {
      if (parameter.comment) {
        row.push(
          stripLineBreaks(CommentsComponent(parameter.comment)).replace(
            /\|/g,
            '\\|',
          ),
        );
      } else {
        row.push('-');
      }
    }
    return `| ${row.join(' | ')} |\n`;
  });

  const output = `\n| ${headers.join(' | ')} |\n| ${headers
    .map(() => ':------')
    .join(' | ')} |\n${rows.join('')}`;
  return output;
}

function hasTypes(parameters: TypeParameterReflection[]) {
  const types = (parameters as TypeParameterReflection[]).map(
    (param) => !!param.type || !!param.default,
  );
  return !types.every((value) => !value);
}
