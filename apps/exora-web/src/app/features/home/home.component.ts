import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../core/auth/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
  imports: [RouterModule],
  standalone: true,
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  async logOut(): Promise<void> {
    await this.authService.logOut();
    await this.router.navigate(["login"]);
  }

  goToLogin(): void {
    void this.router.navigate(["login"]);
  }
}
