/**
 * Vérifie si une valeur est un objet (exclut les tableaux et `null`).
 */
export function isObject(item: unknown): item is Record<string, unknown> {
  return Boolean(item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge de deux objets avec des types génériques bien définis.
 */
export default function deepMerge<
  T extends Record<string, unknown>,
  S extends Record<string, unknown>,
>(target: T, source: S): T & S {
  const output: Record<string, unknown> = { ...target }; // Création d'un nouvel objet pour éviter la mutation directe

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (isObject(sourceValue) && isObject(targetValue)) {
        // On fusionne récursivement si les deux valeurs sont des objets
        output[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>,
        );
      } else {
        // Sinon, on assigne directement la valeur de `source`
        output[key] = sourceValue;
      }
    });
  }

  return output as T & S; // Cast final propre
}

