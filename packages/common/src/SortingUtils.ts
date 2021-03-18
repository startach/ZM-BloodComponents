export function StringComparator<T>(fieldSelector: (x: T) => String) {
  return (a: T, b: T) => (fieldSelector(a) > fieldSelector(b) ? 1 : -1);
}
