import {
  DeclarationReflection,
  ParameterReflection,
  ReflectionKind,
  SignatureReflection,
} from 'typedoc';

export function MemberSymbolComponent(
  model: DeclarationReflection | SignatureReflection | ParameterReflection,
) {
  const isStatic = model.flags && model.flags.isStatic;

  if (model.kind === ReflectionKind.CallSignature) {
    return '▸';
  }
  if (model.kind === ReflectionKind.TypeAlias) {
    return 'Ƭ';
  }

  if (model.kind === ReflectionKind.Property && isStatic) {
    return '▪';
  }

  return '•';
}
