import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { AbstractControl, FormGroupDirective } from "@angular/forms";
import {
  COMMON_ERROR_MESSAGES,
  InputErrors,
} from "@exora-web/shared/ui/input-error/input-error.model";

@Component({
  selector: "app-input-error",
  templateUrl: "./input-error.component.html",
  standalone: true,
})
export class InputErrorComponent implements OnInit {
  private _sourceControl: AbstractControl;
  private _errorVisible = false;

  @Input() controlName: string;
  @Input() control: AbstractControl | FormControl;
  @Input() customErrors: InputErrors;

  constructor(
    private formGroupDirective: FormGroupDirective,
    private elementRef: ElementRef,
  ) {}

  get showError(): boolean {
    if (!this._sourceControl) return false;

    let controlInvalid = !!this._sourceControl && this._sourceControl.invalid;
    let formSubmitted = this.formGroupDirective.submitted;
    let controlEvaluated = this._sourceControl.touched && this._sourceControl.dirty;
    let showError = controlInvalid && (controlEvaluated || formSubmitted);

    this.updateParentClass(showError);

    return controlInvalid && (controlEvaluated || formSubmitted);
  }

  get errorName(): string {
    let error = Object.keys(this._sourceControl.errors)[0];
    return COMMON_ERROR_MESSAGES[error] || `This field is invalid: ${error}`;
  }

  ngOnInit(): void {
    this.setSourceFormControl();
  }

  private setSourceFormControl(): void {
    this._sourceControl =
      this.control ||
      this.formGroupDirective?.control.get(this.controlName) ||
      this.formGroupDirective.form.get(this.controlName);
  }

  private updateParentClass(showError: boolean): void {
    if (showError === this._errorVisible) return; // do nothing if value haven't changed

    let inputElement: HTMLElement = this.elementRef.nativeElement;
    let parentElement = inputElement.parentElement;

    showError
      ? parentElement.classList.add("field-error")
      : parentElement.classList.remove("field-error");

    this._errorVisible = showError;
  }
}
