import { Component, input, OnInit } from "@angular/core";
import { CalendarComponent } from "@exora-web/shared/ui/date-picker/calendar/calendar.component";
import { FormControl, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import { InputErrorComponent } from "@exora-web/shared/ui";
import { DatePipe } from "@angular/common";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "app-date-picker",
  templateUrl: "date-picker.component.html",
  styleUrl: "date-picker.component.scss",
  imports: [CalendarComponent, InputErrorComponent, ReactiveFormsModule],
  providers: [DatePipe],
  standalone: true,
})
export class DatePickerComponent implements OnInit {
  sourceControl: AbstractControl;
  innerControl = new FormControl<string>(null);

  control = input<FormControl | AbstractControl>();
  controlName = input<string>();
  dateMask = input<string>("MMM d, yyyy");

  constructor(
    private formGroupDirective: FormGroupDirective,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.setSourceFormControl();
    this.setInnerControlUpdates();
  }

  updateValue(selectedDate: Date): void {
    this.sourceControl.setValue(selectedDate);
  }

  private setSourceFormControl(): void {
    this.sourceControl =
      this.control() ||
      this.formGroupDirective?.control.get(this.controlName()) ||
      this.formGroupDirective.form.get(this.controlName());

    if (!this.sourceControl) {
      throw new Error("Source control is not found. Make sure controlName or control is provided");
    }
  }

  private setInnerControlUpdates(): void {
    this.sourceControl.valueChanges.pipe(untilDestroyed(this)).subscribe((date) => {
      let dateStr = date && this.datePipe.transform(date, this.dateMask());
      this.innerControl.setValue(dateStr);
    });
  }
}
