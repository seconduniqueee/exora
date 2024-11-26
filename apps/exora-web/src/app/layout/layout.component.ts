import { Component, OnInit, signal } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { BootOverlayComponent } from "./boot-overlay/boot-overlay.component";
import { ThemeService } from "@exora-web/shared/services";
import { AsyncPipe } from "@angular/common";
import { AuthService } from "../core/auth/auth.service";
import { AuthQuery } from "../core/auth/auth.repository";

@Component({
  selector: "app-layout",
  templateUrl: "layout.component.html",
  styleUrl: "layout.component.scss",
  standalone: true,
  imports: [HeaderComponent, BootOverlayComponent, AsyncPipe],
})
export class LayoutComponent implements OnInit {
  appInitialized = signal(false);

  constructor(
    public query: AuthQuery,
    private authService: AuthService,
    private themeService: ThemeService,
  ) {}

  get appLoading(): boolean {
    return !this.query.state.appInitialized || !this.appInitialized();
  }

  get isDarkTheme(): boolean {
    return this.themeService.isDarkTheme;
  }

  ngOnInit(): void {
    this.scheduleInitialization();
  }

  logOut(): void {
    void this.authService.logOut();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  private scheduleInitialization(): void {
    setTimeout(() => this.appInitialized.set(true), 1000);
  }
}
