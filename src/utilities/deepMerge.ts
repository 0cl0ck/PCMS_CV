/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: unknown): boolean {
  return Boolean(item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target - The target object to merge into
 * @param source - The source object to merge from
 * @returns - The merged object
 */
export default function deepMerge<T extends Record<string, any>, S extends Record<string, any>>(
  target: T,
  source: S
): T & S {
  const output = { ...target } as T & S;

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      const sourceKey = key as keyof S;
      const targetKey = key as keyof T;
      
      if (isObject(source[sourceKey])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[sourceKey] });
        } else {
          output[sourceKey as keyof (T & S)] = deepMerge(
            target[targetKey] as Record<string, any>,
            source[sourceKey] as Record<string, any>
          ) as any;
        }
      } else {
        Object.assign(output, { [key]: source[sourceKey] });
      }
    });
  }

  return output;
}
