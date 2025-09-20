export function GetValueObjectByKey<T, K extends keyof T>(objeto: T, clave: K): T[K] {
  return objeto[clave];
}