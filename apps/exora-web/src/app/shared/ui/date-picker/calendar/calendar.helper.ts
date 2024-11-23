import { CalendarState, Day } from "@exora-web/shared/ui/date-picker/calendar/calendar.model";

export class CalendarHelper {
  static getDays(state: CalendarState): Day[] {
    let first = new Date(state.year, state.month, 0);
    let last = new Date(state.year, state.month + 1, 0);
    let daysOfMonth = last.getDate();
    let offset = first.getDay();
    let result = new Array(offset).fill(null);

    for (let i = 1; i <= daysOfMonth; ++i) {
      result.push({ value: i, isSelected: false });
    }

    let extra = 6 * 7 - result.length;

    for (let i = 0; i < extra; i++) result.push(null);

    return result;
  }
}
