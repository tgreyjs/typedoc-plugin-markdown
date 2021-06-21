/**
 * A simple named export that will be exported from export.ts
 */
export const a = 1;

/**
 * An export of a local under a different name.
 */
export { ReflectionClass as C } from './reflections';
export { a as b };
