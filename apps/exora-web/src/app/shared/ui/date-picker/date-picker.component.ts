import { Component } from "@angular/core";
import { CalendarComponent } from "@exora-web/shared/ui/date-picker/calendar/calendar.component";

@Component({
  selector: "app-date-picker",
  templateUrl: "date-picker.component.html",
  imports: [CalendarComponent],
  standalone: true,
})
export class DatePickerComponent {}
