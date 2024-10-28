import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../core/auth/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
  styleUrl: "home.component.scss",
  imports: [RouterModule],
  standalone: true,
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  get userName(): string {
    return this.authService.userInfo.firstName;
  }

  async logOut(): Promise<void> {
    await this.authService.logOut();
    await this.router.navigate(["login"]);
  }

  toggleTheme(): void {
    let isDarkTheme = localStorage.getItem("theme");

    if (isDarkTheme) {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }
}
