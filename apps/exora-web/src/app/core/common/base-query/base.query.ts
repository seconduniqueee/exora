import { BaseRepository } from "../base-repository/base.repository";

export abstract class BaseQuery<T> {
  protected constructor(protected baseRepository: BaseRepository<T>) {}

  get state(): T {
    return this.baseRepository.state;
  }

  get isLoading(): boolean {
    return this.baseRepository.isLoading;
  }

  get isLoading$(): Observable<boolean> {
    return this.baseRepository.isLoading$;
  }

  select<M>(selectFn: (state: T) => M): Observable<M> {
    return this.baseRepository.select(selectFn);
  }
}
