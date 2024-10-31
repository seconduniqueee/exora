import { createStore, select, Store, StoreConfig, StoreDef } from "@ngneat/elf";
import { BehaviorSubject } from "rxjs";
import { PropsFactory } from "@ngneat/elf/src/lib/state";

export abstract class BaseRepository<T> {
  _store: Store<StoreDef<T>>;
  _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  protected constructor(
    config: StoreConfig,
    propFactory: PropsFactory<T, unknown>,
    ...propsFactories: PropsFactory<unknown, unknown>[]
  ) {
    this._store = createStore(config, propFactory, ...propsFactories);
  }

  get isLoading(): boolean {
    return this._isLoading.value;
  }

  set isLoading(isLoading: boolean) {
    this._isLoading.next(isLoading);
  }

  get isLoading$(): Observable<boolean> {
    return this._isLoading.asObservable();
  }

  get state(): T {
    return this._store.state;
  }

  select<M>(selectFn: (state: T) => M): Observable<M> {
    return this._store.pipe(select(selectFn));
  }

  update(value: Partial<T>): void {
    this._store.update((state) => ({ ...state, ...value }));
  }

  setLoading(isLoading: boolean): void {
    this._isLoading.next(isLoading);
  }

  startLoading(): void {
    this._isLoading.next(true);
  }

  stopLoading(): void {
    this._isLoading.next(false);
  }
}
