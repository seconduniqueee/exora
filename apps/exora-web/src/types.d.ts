import { Observable as ObservableType } from "rxjs";
import { Signal as SignalType } from "@angular/core";

declare global {
  type Observable<T> = ObservableType<T>;
  type Signal<T> = SignalType<T>;
}
