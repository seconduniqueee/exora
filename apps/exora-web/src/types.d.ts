import { Observable as ObservableType } from "rxjs";
import { Signal as SignalType, WritableSignal as WritableSignalType } from "@angular/core";
import { FormControl as FormControlType, FormGroup as FormGroupType } from "@angular/forms";

declare global {
  type Observable<T> = ObservableType<T>;
  type Signal<T> = SignalType<T>;
  type WritableSignal<T> = WritableSignalType<T>;
  type FormGroup = FormGroupType;
  type FormControl = FormControlType;
  type FormGroupTyped<T> = FormGroupType<{
    [K in keyof T]: FormControlType<T[K]>;
  }>;
}
