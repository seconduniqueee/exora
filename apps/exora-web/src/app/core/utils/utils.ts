import { untilDestroyed } from "@ngneat/until-destroy";
import { FormControl, FormGroupDirective } from "@angular/forms";

export function translateToSignal<T>(
  signal: WritableSignal<T>,
  observable: Observable<T>,
  context: unknown,
) {
  observable.pipe(untilDestroyed(context)).subscribe((value) => signal.set(value));
}

export function getSourceControl(
  controlName: string,
  control: AbstractControl | FormControl,
  formGroupDirective: FormGroupDirective,
): AbstractControl {
  let result =
    control ||
    formGroupDirective?.control.get(controlName) ||
    formGroupDirective.form.get(controlName);

  if (!result) {
    throw new Error(
      "Control was not found. Please provide control or controlName, make sure provided control exists",
    );
  }

  return result;
}
