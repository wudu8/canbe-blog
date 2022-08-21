export function callEmit<T extends (...args: SafeAny[]) => SafeAny>(
  funcs: T[] | T | undefined,
  ...args: Parameters<T>
): ReturnType<T> | void {
  if (!funcs) {
    return;
  }
  if (Array.isArray(funcs)) {
    funcs.forEach(fn => fn(...args));
  } else {
    return funcs(...args);
  }
}
