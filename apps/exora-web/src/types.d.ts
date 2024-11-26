import { Observable as ObservableType } from "rxjs";
import {
  ElementRef as ElementRefType,
  Signal as SignalType,
  WritableSignal as WritableSignalType,
} from "@angular/core";
import {
  AbstractControl as AbstractControlType,
  FormControl as FormControlType,
  FormGroup as FormGroupType,
} from "@angular/forms";

declare global {
  type Observable<T> = ObservableType<T>;
  type Signal<T> = SignalType<T>;
  type WritableSignal<T> = WritableSignalType<T>;
  type FormGroup = FormGroupType;
  type FormControl = FormControlType;
  type AbstractControl = AbstractControlType;
  type AbstractControlTyped<T> = AbstractControlType<T>;
  type ElementRef = ElementRefType;
  type FormGroupTyped<T> = FormGroupType<{
    [K in keyof T]: FormControlType<T[K]>;
  }>;
}
