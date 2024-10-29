import { Observable as ObservableType } from "rxjs";

declare global {
  type Observable<T> = ObservableType<T>;
}
