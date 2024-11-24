import { Component, input, OnInit } from "@angular/core";
import { CalendarComponent } from "@exora-web/shared/ui/date-picker/calendar/calendar.component";
import { FormGroupDirective } from "@angular/forms";

@Component({
  selector: "app-date-picker",
  templateUrl: "date-picker.component.html",
  imports: [CalendarComponent],
  standalone: true,
})
export class DatePickerComponent implements OnInit {
  sourceControl: AbstractControl;

  control = input<FormControl>();
  controlName = input<string>();

  constructor(private formGroupDirective: FormGroupDirective) {}

  ngOnInit(): void {
    this.setSourceFormControl();
  }

  updateValue(selectedDate: Date): void {
    this.sourceControl.setValue(selectedDate);
  }

  private setSourceFormControl(): void {
    let sourceControl =
      this.control() ||
      this.formGroupDirective?.control.get(this.controlName()) ||
      this.formGroupDirective.form.get(this.controlName());

    this.sourceControl = sourceControl as AbstractControl;

    if (!this.sourceControl) {
      throw new Error("Source control is not found. Make sure controlName or control is provided");
    }
  }
}
