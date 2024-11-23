import { Day } from "@exora-web/shared/ui/date-picker/calendar/calendar.model";

export class CalendarHelper {
  static getDaysOfCurrentMonth(): Day[] {
    let now = new Date();
    let first = new Date(now.getFullYear(), now.getMonth(), 0);
    let last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    let daysOfMonth = last.getDate();
    let offset = first.getDay();
    let result = new Array(offset).fill(null);

    for (let i = 1; i <= daysOfMonth; ++i) {
      result.push({ value: i, isSelected: i == now.getDate() });
    }

    let extra = 7 - (result.length % 7);

    for (let i = 0; i < extra; i++) result.push(null);

    return result;
  }
}
