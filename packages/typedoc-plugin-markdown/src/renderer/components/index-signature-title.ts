import { SignatureReflection } from 'typedoc/dist/lib/models';

import { TypeComponent } from './type';

export function IndexSignatureTitleComponent(model: SignatureReflection) {
  const md = ['▪'];
  const parameters = this.parameters
    ? this.parameters.map((parameter) => {
        return `${parameter.name}: ${
          parameter.type ? TypeComponent(parameter.type) : ''
        }`;
      })
    : [];
  md.push(
    `\[${parameters.join('')}\]: ${
      model.type ? TypeComponent(model.type) : ''
    }`,
  );
  return md.join(' ');
}
