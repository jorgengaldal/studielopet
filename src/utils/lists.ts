export function hasEqualElements<Type>(a: Type[], b: Type[]): boolean {
    if (a === b) return true
    if (a === null || b == null) return false
    if (a.length != b.length) return false
    for (let index = 0; index < a.length; index++) {
        if (a[index] != b[index]) {
            return false
        }
    }

    return true
}