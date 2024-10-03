/**
 * Checks if all values of object *filter* equal
 * the corresponding value in object *object*.
 */
export function allEquals(object: Object, filter: Object) {
  return Object.keys(filter).every(
    (key) =>
      filter[key as keyof typeof filter] == object[key as keyof typeof object]
  );
}

export function getUnique<Type>(array: Type[], mapFunction: (a: Type) => any) {
  return new Array(...new Set(array.map((ob) => mapFunction(ob))));
}

export function getUniqueObjectByPredicate<Type>(array: Type[], mapFunction: (a: Type) => string) {
  const mapping: Map<string, Type> = new Map()

  for (const element of array) {
    if (!(mapFunction(element) in mapping)) {
      mapping.set(mapFunction(element), element)
    }
  }
  return Array(...mapping.values())
}
