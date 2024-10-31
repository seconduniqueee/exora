import { Observable as ObservableType } from "rxjs";
import { Signal as SignalType } from "@angular/core";
import { FormGroup as FormGroupType } from "@angular/forms";

declare global {
  type Observable<T> = ObservableType<T>;
  type Signal<T> = SignalType<T>;
  type FormGroup = FormGroupType;
}
