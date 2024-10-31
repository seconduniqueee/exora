import { Component, OnInit, signal } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { AuthService } from "../../core/auth/auth.service";
import { BootOverlayComponent } from "./boot-overlay/boot-overlay.component";

@Component({
  selector: "app-layout",
  templateUrl: "layout.component.html",
  styleUrl: "layout.component.scss",
  imports: [HeaderComponent, BootOverlayComponent],
  standalone: true,
})
export class LayoutComponent implements OnInit {
  appInitialized = signal(false);

  constructor(private authService: AuthService) {}

  get appLoading(): boolean {
    return this.authService.isLoading || !this.appInitialized();
  }

  ngOnInit(): void {
    setTimeout(() => this.appInitialized.set(true), 1000);
  }
}
