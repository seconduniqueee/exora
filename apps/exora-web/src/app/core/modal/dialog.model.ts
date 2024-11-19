export interface ComponentType<T> {
  new (...args: unknown[]): T;
}

export abstract class DialogRef<T> {
  closeDialog: (data?: T) => void;
}
