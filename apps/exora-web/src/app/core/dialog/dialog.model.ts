export abstract class DialogRef<T> {
  closeDialog: (data?: T) => void;
}

export interface DialogConfig<T> {
  width?: string;
  data?: T;
}

export interface OverlayRef {
  overlay: HTMLElement;
  dialogContainer: HTMLElement;
  onOverlayOpen: () => void;
}
