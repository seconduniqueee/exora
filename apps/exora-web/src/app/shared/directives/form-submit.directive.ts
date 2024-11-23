import { Directive, EventEmitter, HostListener, Output } from "@angular/core";
import { FormGroupDirective } from "@angular/forms";

@Directive({
  selector: "form[formSubmit]",
  standalone: true,
})
export class FormSubmitDirective {
  @Output() formSubmit = new EventEmitter<void>();

  constructor(private formGroupDirective: FormGroupDirective) {}

  @HostListener("submit")
  onSubmit(): void {
    this.formGroupDirective.valid && this.formSubmit.emit();
  }
}