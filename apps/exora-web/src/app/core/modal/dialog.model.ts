export interface ComponentType<T> {
  new (...args: unknown[]): T;
}
