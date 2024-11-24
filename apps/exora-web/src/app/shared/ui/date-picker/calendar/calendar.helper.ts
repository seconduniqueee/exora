import { CalendarState, Day } from "@exora-web/shared/ui/date-picker/calendar/calendar.model";

export class CalendarHelper {
  static getDays(state: CalendarState, date: Date): Day[] {
    let { month, year } = state;
    let first = new Date(year, month, 0);
    let last = new Date(year, month + 1, 0);
    let daysOfMonth = last.getDate();
    let offset = first.getDay();
    let result = new Array(offset).fill(null);
    let selectedInCurrentMonth = date?.getMonth() === month && date?.getFullYear() === year;
    let extra = 6 * 7 - daysOfMonth - offset;

    for (let i = 1; i <= daysOfMonth; ++i) {
      let isSelected = i === date?.getDate() && selectedInCurrentMonth;
      isSelected && console.log("really selected");
      result.push({ value: i, isSelected });
    }

    result.push(...new Array(extra).fill(null));

    return result;
  }

  static stateToDate(state: CalendarState, day: Day): Date {
    let result = new Date(state.year, state.month, day.value);
    return result;
  }
}
