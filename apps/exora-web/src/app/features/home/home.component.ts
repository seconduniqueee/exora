import { Component, signal } from "@angular/core";
import { AuthService } from "../../core/auth/auth.service";
import { DialogService } from "../../core/dialog/dialog.service";
import { DatePickerComponent } from "@exora-web/shared/ui/date-picker/date-picker.component";
import { DatePipe } from "@angular/common";

@Component({
  templateUrl: "home.component.html",
  styleUrl: "home.component.scss",
  providers: [DialogService, AuthService, DatePickerComponent],
  standalone: true,
  imports: [DatePickerComponent, DatePipe],
})
export class HomeComponent {
  selectedDate = signal<Date>(new Date());

  constructor(private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    return this.authService.userInfo.firstName;
  }
}
