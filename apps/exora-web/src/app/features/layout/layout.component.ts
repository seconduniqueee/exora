import { Component, OnInit, signal } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { AuthService } from "../../core/auth/auth.service";
import { BootOverlayComponent } from "./boot-overlay/boot-overlay.component";
import { UserModel } from "@exora/shared-models";
import { toSignal } from "@angular/core/rxjs-interop";
import { AuthRepository } from "../../core/auth/auth.repository";
import { ThemeService } from "@exora-web/shared/services";

@Component({
  selector: "app-layout",
  templateUrl: "layout.component.html",
  styleUrl: "layout.component.scss",
  imports: [HeaderComponent, BootOverlayComponent],
  standalone: true,
})
export class LayoutComponent implements OnInit {
  appInitialized = signal(false);
  user: Signal<UserModel>;

  constructor(
    private authService: AuthService,
    private authRepository: AuthRepository,
    private themeService: ThemeService,
  ) {
    this.user = toSignal(authRepository.user$);
  }

  get appLoading(): boolean {
    return !this.authRepository.state.appInitialized || !this.appInitialized();
  }

  get isDarkTheme(): boolean {
    return this.themeService.isDarkTheme;
  }

  ngOnInit(): void {
    setTimeout(() => this.appInitialized.set(true), 1000);
  }

  logOut(): void {
    this.authService.logOut();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
