import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../core/auth/auth.service";
import { ThemeService } from "../../shared";

@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
  styleUrl: "home.component.scss",
  imports: [RouterModule],
  standalone: true,
})
export class HomeComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  get userName(): string {
    return this.authService.userInfo.firstName;
  }

  async logOut(): Promise<void> {
    await this.authService.logOut();
    await this.router.navigate(["login"]);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
