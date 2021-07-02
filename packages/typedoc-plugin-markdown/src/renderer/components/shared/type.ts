import {
  DeclarationReflection,
  ParameterReflection,
  SignatureReflection,
} from 'typedoc';
import {
  ArrayType,
  ConditionalType,
  IndexedAccessType,
  InferredType,
  IntersectionType,
  IntrinsicType,
  LiteralType,
  PredicateType,
  QueryType,
  ReferenceType,
  ReflectionType,
  TupleType,
  Type,
  TypeOperatorType,
  TypeParameterType,
  UnionType,
  UnknownType,
} from 'typedoc/dist/lib/models/types';

import { escapeChars } from '../../utils';
import { LinkComponent } from './link';

type Collapse = 'object' | 'function' | 'all' | 'none';
type allowedTypes =
  | ArrayType
  | IntersectionType
  | IntrinsicType
  | ReferenceType
  | TupleType
  | UnionType
  | TypeOperatorType
  | TypeParameterType
  | QueryType
  | PredicateType
  | ReferenceType
  | ConditionalType
  | IndexedAccessType
  | UnknownType
  | InferredType
  | Type
  | ReflectionType
  | DeclarationReflection
  | ParameterReflection;

export function TypeComponent(
  type: allowedTypes,
  collapse: Collapse = 'none',
  emphasis = true,
) {
  if (type instanceof ReferenceType) {
    return getReferenceType(type, emphasis);
  }

  if (type instanceof ArrayType && type.elementType) {
    return getArrayType(type, emphasis);
  }

  if (type instanceof UnionType && type.types) {
    return getUnionType(type, emphasis);
  }

  if (type instanceof IntersectionType && type.types) {
    return getIntersectionType(type);
  }

  if (type instanceof TupleType && type.elements) {
    return getTupleType(type);
  }

  if (type instanceof IntrinsicType && type.name) {
    return getIntrinsicType(type, emphasis);
  }

  if (type instanceof ReflectionType && type.declaration) {
    return getReflectionType(type.declaration, collapse);
  }

  if (type instanceof DeclarationReflection) {
    return getReflectionType(type, collapse);
  }

  if (type instanceof TypeOperatorType) {
    return getTypeOperatorType(type);
  }

  if (type instanceof QueryType) {
    return getQueryType(type);
  }

  if (type instanceof TypeParameterType) {
    return getTypeParameterType(type);
  }

  if (type instanceof ConditionalType) {
    return getConditionalType(type);
  }

  if (type instanceof IndexedAccessType) {
    return getIndexAccessType(type);
  }

  if (type instanceof UnknownType) {
    return getUnknownType(type);
  }

  if (type instanceof InferredType) {
    return getInferredType(type);
  }

  if (type instanceof LiteralType) {
    return getLiteralType(type);
  }

  return type ? escapeChars(type.toString()) : '';
}

function getLiteralType(model: LiteralType) {
  if (typeof model.value === 'bigint') {
    return `\`${model.value}n\``;
  }
  return `\`\`${JSON.stringify(model.value)}\`\``;
}

function getReflectionType(model: DeclarationReflection, collapse: Collapse) {
  if (model.signatures) {
    return collapse === 'function' || collapse === 'all'
      ? `\`fn\``
      : getFunctionType(model.signatures);
  }
  return collapse === 'object' || collapse === 'all'
    ? `\`Object\``
    : getDeclarationType(model);
}

function getDeclarationType(model: DeclarationReflection) {
  if (model.indexSignature || model.children) {
    let indexSignature = '';
    const declarationIndexSignature = model.indexSignature;
    if (declarationIndexSignature) {
      const key = declarationIndexSignature.parameters
        ? declarationIndexSignature.parameters.map(
            (param) => `[${param.name}: ${param.type}]`,
          )
        : '';

      const obj = declarationIndexSignature.type
        ? TypeComponent(declarationIndexSignature.type as allowedTypes)
        : '`unknown`';
      indexSignature = `${key}: ${obj}; `;
    }
    const types =
      model.children &&
      model.children.map((obj) => {
        return `\`${obj.name}${
          obj.flags.isOptional ? '?' : ''
        }\`: ${TypeComponent(
          obj.signatures || obj.children ? obj : (obj.type as allowedTypes),
        )} ${
          obj.defaultValue && obj.defaultValue !== '...'
            ? `= ${escapeChars(obj.defaultValue)}`
            : ''
        }`;
      });
    return `{ ${indexSignature ? indexSignature : ''}${
      types ? types.join('; ') : ''
    } }${
      model.defaultValue && model.defaultValue !== '...'
        ? `= ${escapeChars(model.defaultValue)}`
        : ''
    }`;
  }
  return '{}';
}

export function getFunctionType(modelSignatures: SignatureReflection[]) {
  const functions = modelSignatures.map((fn) => {
    const typeParams = fn.typeParameters
      ? `<${fn.typeParameters
          .map((typeParameter) => typeParameter.name)
          .join(', ')}\\>`
      : [];
    const params = fn.parameters
      ? fn.parameters.map((param) => {
          return `${param.flags.isRest ? '...' : ''}\`${param.name}${
            param.flags.isOptional ? '?' : ''
          }\`: ${TypeComponent(
            param.type ? param.type : (param as allowedTypes),
          )}`;
        })
      : [];
    const returns = fn.type ? TypeComponent(fn.type) : '`unknown`';
    return typeParams + `(${params.join(', ')}) => ${returns}`;
  });
  return functions.join('');
}

function getReferenceType(model: ReferenceType, emphasis) {
  if (model.reflection || (model.name && model.typeArguments)) {
    const reflection =
      model.reflection && model.reflection.url
        ? [
            `${LinkComponent(
              `\`${model.reflection.name}\``,
              model.reflection.url,
              false,
            )}`,
          ]
        : [`\`${model.name}\``];
    if (model.typeArguments && model.typeArguments.length > 0) {
      reflection.push(
        `<${model.typeArguments
          .map((typeArgument) => TypeComponent(typeArgument, 'all'))
          .join(', ')}\\>`,
      );
    }
    return reflection.join('');
  }
  return emphasis ? `\`${model.name}\`` : escapeChars(model.name);
}

function getArrayType(model: ArrayType, emphasis: boolean) {
  const arrayType = TypeComponent(model.elementType, 'none', emphasis);
  return model.elementType.type === 'union'
    ? `(${arrayType})[]`
    : `${arrayType}[]`;
}

function getUnionType(model: UnionType, emphasis: boolean) {
  return model.types
    .map((unionType) => TypeComponent(unionType, 'none', emphasis))
    .join(` \\| `);
}

function getIntersectionType(model: IntersectionType) {
  return model.types
    .map((intersectionType) => TypeComponent(intersectionType))
    .join(' & ');
}

function getTupleType(model: TupleType) {
  return `[${model.elements
    .map((element) => TypeComponent(element))
    .join(', ')}]`;
}

function getIntrinsicType(model: IntrinsicType, emphasis: boolean) {
  return emphasis ? `\`${escapeChars(model.name)}\`` : escapeChars(model.name);
}

function getTypeOperatorType(model: TypeOperatorType) {
  return `${model.operator} ${TypeComponent(model.target)}`;
}

function getQueryType(model: QueryType) {
  return `typeof ${TypeComponent(model.queryType)}`;
}

function getTypeParameterType(model: TypeParameterType) {
  return escapeChars(model.name);
}

function getInferredType(model: InferredType) {
  return `infer ${escapeChars(model.name)}`;
}

function getUnknownType(model: UnknownType) {
  return escapeChars(model.name);
}

function getConditionalType(model: ConditionalType) {
  const md: string[] = [];
  if (model.checkType) {
    md.push(TypeComponent(model.checkType));
  }
  md.push('extends');
  if (model.extendsType) {
    md.push(TypeComponent(model.extendsType));
  }
  md.push('?');
  if (model.trueType) {
    md.push(TypeComponent(model.trueType));
  }
  md.push(':');
  if (model.falseType) {
    md.push(TypeComponent(model.falseType));
  }
  return md.join(' ');
}

function getIndexAccessType(model: IndexedAccessType) {
  const md: string[] = [];
  if (model.objectType) {
    md.push(TypeComponent(model.objectType));
  }
  if (model.indexType) {
    md.push(`[${TypeComponent(model.indexType)}]`);
  }
  return md.join('');
}
