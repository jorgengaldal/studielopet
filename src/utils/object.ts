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

export function getUnique<Type, MappedType>(array: Type[], 
  mapFunction: (a: Type) => MappedType, 
equalityCheck?: (a: MappedType, b: MappedType) => boolean) {
  // Default equalityCheck
  if (!equalityCheck) {
    equalityCheck = (a, b) => a === b
  }

  const result: MappedType[] = []

  for (const element of array) {
    const mappedElement = mapFunction(element)
    if (!result.some((elem) => equalityCheck(elem, mappedElement))) {
      result.push(mappedElement)
    }
  }
  
  return result
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
