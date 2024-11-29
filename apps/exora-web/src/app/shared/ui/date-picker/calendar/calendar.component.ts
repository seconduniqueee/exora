import {
  Component,
  input,
  OnChanges,
  OnInit,
  output,
  signal,
  SimpleChange,
  SimpleChanges,
} from "@angular/core";
import {
  CalendarState,
  Day,
  DAYS_OF_WEEK,
  MONTHS,
} from "@exora-web/shared/ui/date-picker/calendar/calendar.model";
import { CalendarHelper } from "@exora-web/shared/ui/date-picker/calendar/calendar.helper";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-calendar",
  templateUrl: "calendar.component.html",
  styleUrl: "calendar.component.scss",
  imports: [CommonModule],
  standalone: true,
})
export class CalendarComponent implements OnInit, OnChanges {
  state = signal<CalendarState>(null);
  selectedDate = input<Date>();
  dateSelected = output<Date>();
  daysOfWeek = DAYS_OF_WEEK;

  get calendarTitle(): string {
    let { month, year } = this.state();
    return `${MONTHS[month].fullName} ${year}`;
  }

  ngOnInit(): void {
    this.setInitialState();
    console.log(this.selectedDate());
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateAfterInputDateChange(changes["selectedDate"]);
  }

  selectDate(day: Day): void {
    if (day.isSelected) return;

    let { month, year } = this.state();
    let selectedDate = CalendarHelper.stateToDate(month, year, day);
    let days = CalendarHelper.getDays(month, year, selectedDate);

    this.dateSelected.emit(selectedDate);
    this.state.set({ month, year, days });
  }

  selectPreviousMonth(): void {
    let { month, year } = this.state();
    let updatedMonth = month == 0 ? 11 : month - 1;
    let updatedYear = month == 0 ? year - 1 : year;
    let days = CalendarHelper.getDays(month, year, this.selectedDate());

    this.state.set({ month: updatedMonth, year: updatedYear, days });
  }

  selectNextMonth(): void {
    let { month, year } = this.state();
    let updatedMonth = month == 11 ? 0 : month + 1;
    let updatedYear = month == 11 ? year + 1 : year;
    let days = CalendarHelper.getDays(updatedMonth, updatedYear, this.selectedDate());

    this.state.set({ month: updatedMonth, year: updatedYear, days });
  }

  private setInitialState(): void {
    let date = this.selectedDate() ?? new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    let days = CalendarHelper.getDays(month, year, this.selectedDate());

    this.state.set({ month, year, days });
  }

  private updateAfterInputDateChange(change: SimpleChange): void {
    let { currentValue, previousValue } = change;
    let state = this.state();
    let selectedDateChanged = currentValue !== previousValue;
    let month = currentValue?.getMonth();
    let year = currentValue?.getFullYear();
    let sameDate = year == state?.year && month === state?.month;

    if (!currentValue || !selectedDateChanged || sameDate) return;

    this.state.set({ year, month, days: CalendarHelper.getDays(month, year, currentValue) });
  }
}
