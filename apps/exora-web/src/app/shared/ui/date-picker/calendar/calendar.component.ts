import { Component, computed, OnInit, signal } from "@angular/core";
import {
  CalendarState,
  DAYS_OF_WEEK,
  DaysOfMonth,
  Month,
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
  daysOfWeek = DAYS_OF_WEEK;

  get currentMonth(): Month {
    console.log("actually logged");
    return MONTHS.find((m) => m.index === this.state().month);
  }

  ngOnInit(): void {
    this.setInitialState();
  }

  prev(): void {
    let { month, year } = this.state();
    let newState = month == 0 ? { month: 1, year: --year } : { month: --month, year };

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
    return CalendarHelper.getDays(state);
  }
}
