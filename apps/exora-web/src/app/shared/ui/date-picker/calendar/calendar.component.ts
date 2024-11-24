import { Component, computed, input, OnInit, output, signal } from "@angular/core";
import {
  CalendarState,
  Day,
  DAYS_OF_WEEK,
  DaysOfMonth,
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
export class CalendarComponent implements OnInit {
  state = signal<CalendarState>(null);
  days = computed<DaysOfMonth>(() => this.setDaysOfMonth(this.state()));
  selectedDate = input<Date>();
  dateSelected = output<Date>();
  daysOfWeek = DAYS_OF_WEEK;

  get calendarTitle(): string {
    let { month, year } = this.state();
    return `${MONTHS[month].fullName} ${year}`;
  }

  ngOnInit(): void {
    this.setInitialState();
  }

  selectDate(day: Day): void {
    if (day.isSelected) return;

    let selectedDate = CalendarHelper.stateToDate(this.state(), day);

    this.dateSelected.emit(selectedDate);
  }

  prev(): void {
    let { month, year } = this.state();
    let newState = month == 0 ? { month: 11, year: --year } : { month: --month, year };

    this.state.set(newState);
  }

  next(): void {
    let { month, year } = this.state();
    let newState = month == 11 ? { month: 0, year: ++year } : { month: ++month, year };

    this.state.set(newState);
  }

  private setInitialState(): void {
    let now = new Date();
    this.state.set({ month: now.getMonth(), year: now.getFullYear() });
  }

  private setDaysOfMonth(state: CalendarState): DaysOfMonth {
    return CalendarHelper.getDays(state, this.selectedDate());
  }
}
