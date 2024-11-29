import { AfterViewInit, Component, HostListener, input, OnInit, signal } from "@angular/core";
import { CalendarComponent } from "@exora-web/shared/ui/date-picker/calendar/calendar.component";
import { FormControl, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import { InputErrorComponent } from "@exora-web/shared/ui";
import { DatePipe, NgClass } from "@angular/common";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ClickOutsideDirective } from "@exora-web/shared/directives/click-outside.directive";
import { getSourceControl } from "../../../core/utils";
import {
  AttachedPlacementHelper,
  Placement,
  PositionEnum,
} from "@exora-web/shared/helpers/attached-placement.helper";

@UntilDestroy()
@Component({
  selector: "app-date-picker",
  templateUrl: "date-picker.component.html",
  styleUrl: "date-picker.component.scss",
  imports: [
    CalendarComponent,
    InputErrorComponent,
    ReactiveFormsModule,
    ClickOutsideDirective,
    NgClass,
  ],
  providers: [DatePipe],
  standalone: true,
})
export class DatePickerComponent implements OnInit, AfterViewInit {
  // TODO: Set proper calendar position based on picker placement on the screen

  sourceControl: AbstractControl;
  innerControl = new FormControl<string>(null);
  inputElem: HTMLElement;
  positionEnum = PositionEnum;
  calendarPlacement = signal<Placement>(null);

  control = input<FormControl | AbstractControl>();
  controlName = input<string>();
  placeholder = input<string>("Enter Date");
  dateMask = input<string>("MMM d, yyyy");
  calendarOpened = signal(false);

  constructor(
    private formGroupDirective: FormGroupDirective,
    private datePipe: DatePipe,
  ) {}

  @HostListener("window:resize", ["$event"])
  handleResizeEvent(): void {
    this.setCalendarPosition();
  }

  @HostListener("window:scroll", ["$event"])
  handleScrollEvent(): void {
    this.setCalendarPosition();
  }

  ngOnInit(): void {
    this.setSourceFormControl();
    this.setInnerControlUpdates();
  }

  ngAfterViewInit(): void {
    this.setCalendarPosition();
  }

  updateValue(selectedDate: Date): void {
    this.sourceControl.setValue(selectedDate);
    this.calendarOpened.set(false);
  }

  toggleCalendar(value?: boolean): void {
    this.calendarOpened.set(value ?? !this.calendarOpened());
    this.calendarOpened() && this.setCalendarPosition();
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

  private setCalendarPosition(): void {
    this.inputElem = this.inputElem || document.querySelector(".date-picker-wrapper");

    let newPlacement = AttachedPlacementHelper.getPlacement(this.inputElem, 320);

    this.calendarPlacement.set(newPlacement);
  }
}
