import { Component } from "@angular/core";
import { AuthService } from "../../core/auth/auth.service";
import { DialogService } from "../../core/dialog/dialog.service";

@Component({
  templateUrl: "home.component.html",
  styleUrl: "home.component.scss",
  providers: [DialogService, AuthService],
  standalone: true,
})
export class HomeComponent {
  constructor(private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    return this.authService.userInfo.firstName;
  }
}
