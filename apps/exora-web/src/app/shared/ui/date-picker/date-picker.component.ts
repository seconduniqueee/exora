import { AfterViewInit, Component, input, OnInit, signal } from "@angular/core";
import { CalendarComponent } from "@exora-web/shared/ui/date-picker/calendar/calendar.component";
import { FormControl, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import { InputErrorComponent } from "@exora-web/shared/ui";
import { DatePipe } from "@angular/common";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ClickOutsideDirective } from "@exora-web/shared/directives/click-outside.directive";
import { getSourceControl } from "../../../core/utils";

@UntilDestroy()
@Component({
  selector: "app-date-picker",
  templateUrl: "date-picker.component.html",
  styleUrl: "date-picker.component.scss",
  imports: [CalendarComponent, InputErrorComponent, ReactiveFormsModule, ClickOutsideDirective],
  providers: [DatePipe],
  standalone: true,
})
export class DatePickerComponent implements OnInit, AfterViewInit {
  // TODO: Convert calendar positioning to fixed
  // TODO: Set proper calendar position based on picker placement on the screen

  sourceControl: AbstractControl;
  innerControl = new FormControl<string>(null);
  wrapper: HTMLElement;

  control = input<FormControl | AbstractControl>();
  controlName = input<string>();
  placeholder = input<string>("Enter Date");
  dateMask = input<string>("MMM d, yyyy");
  calendarOpened = signal(false);

  constructor(
    private formGroupDirective: FormGroupDirective,
    private datePipe: DatePipe,
  ) {}

  // TODO: rework this piece of art >.>
  get styling(): string {
    let rect = this.wrapper.getBoundingClientRect();
    let enoughBottom = window.innerHeight - rect.y > 380;
    let topStr = enoughBottom ? `${rect.y + rect.height}px` : "";
    let bottomStr = !enoughBottom ? `${window.innerHeight - rect.y + 3}px` : "";
    let leftStr = `${rect.x}px`;

    return `top: ${topStr}; bottom: ${bottomStr}; left: ${leftStr};`;
  }

  ngOnInit(): void {
    this.setSourceFormControl();
    this.setInnerControlUpdates();
  }

  ngAfterViewInit(): void {
    this.wrapper = document.querySelector(".date-picker-wrapper");
  }

  updateValue(selectedDate: Date): void {
    this.sourceControl.setValue(selectedDate);
    this.calendarOpened.set(false);
  }

  toggleCalendar(value?: boolean): void {
    this.calendarOpened.set(value ?? !this.calendarOpened());
  }

  private setSourceFormControl(): void {
    this.sourceControl = getSourceControl(
      this.controlName(),
      this.control(),
      this.formGroupDirective,
    );
  }

  private setInnerControlUpdates(): void {
    this.sourceControl.valueChanges.pipe(untilDestroyed(this)).subscribe((date) => {
      let dateStr = date && this.datePipe.transform(date, this.dateMask());
      this.innerControl.setValue(dateStr);
    });
  }
}
