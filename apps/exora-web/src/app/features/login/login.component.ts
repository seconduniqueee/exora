import { Component } from "@angular/core";
import { AuthService } from "../../core/auth/auth.service";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrl: "login.component.scss",
  imports: [RouterModule],
  standalone: true,
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  async signIn(): Promise<void> {
    await this.authService.signIn("test@test.com", "Qwerty123");
    await this.router.navigate([""]);
  }
}
