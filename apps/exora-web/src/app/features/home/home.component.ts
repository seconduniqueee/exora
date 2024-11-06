import { Component } from "@angular/core";
import { AuthService } from "../../core/auth/auth.service";

@Component({
  templateUrl: "home.component.html",
  styleUrl: "home.component.scss",
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
