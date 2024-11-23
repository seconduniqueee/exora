import { Component } from "@angular/core";
import { DAYS_OF_WEEK } from "@exora-web/shared/ui/date-picker/calendar/calendar.model";
import { CalendarHelper } from "@exora-web/shared/ui/date-picker/calendar/calendar.helper";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-calendar",
  templateUrl: "calendar.component.html",
  styleUrl: "calendar.component.scss",
  imports: [CommonModule],
  standalone: true,
})
export class CalendarComponent {
  days = CalendarHelper.getDaysOfCurrentMonth();
  daysOfWeek = DAYS_OF_WEEK;
}
