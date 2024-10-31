import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../core/auth/auth.service";
import { ThemeService } from "../../shared";
import { AuthRepository } from "../../core/auth/auth.repository";

@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
  styleUrl: "home.component.scss",
  imports: [RouterModule],
  standalone: true,
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private authRepository: AuthRepository,
    private themeService: ThemeService
  ) {}

  get userName(): string {
    return this.authService.userInfo.firstName;
  }

  async logOut(): Promise<void> {
    await this.authService.logOut();
    await this.router.navigate(["login"]);
  }

  ngOnInit(): void {
    this.authRepository.isLoading$.subscribe((isLoading) => console.log("LOADING:", isLoading));
    this.authRepository.user$.subscribe((user) => console.log("USER", user));
    this.authRepository.setLoading(true);

    console.log(this.authRepository.state.user);

    setTimeout(() => this.authRepository.setLoading(false), 10000);

    setTimeout(() => {
      let user = this.authService.userInfo;
      this.authRepository.setUser(user);
      console.log("checking user...");

      setTimeout(() => {
        this.authRepository.setUser(null);
      }, 300);
    }, 7000);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
