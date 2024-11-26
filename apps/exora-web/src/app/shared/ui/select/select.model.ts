import { ElementRef } from "@angular/core";

export interface EmittedDataOnClick<T> {
  value: T;
  projectedContent: ElementRef;
}
