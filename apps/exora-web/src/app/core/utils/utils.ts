import { untilDestroyed } from "@ngneat/until-destroy";

export function translateToSignal<T>(
  signal: WritableSignal<T>,
  observable: Observable<T>,
  context: unknown,
) {
  observable.pipe(untilDestroyed(context)).subscribe((value) => signal.set(value));
}
