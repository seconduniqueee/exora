import { Component } from "@angular/core";
import { AuthService } from "../../core/auth/auth.service";
import { RandomDialogComponent } from "../random-dialog/random-dialog.component";
import { DialogService } from "../../core/modal/dialog.service";

@Component({
  templateUrl: "home.component.html",
  styleUrl: "home.component.scss",
  providers: [DialogService, AuthService],
  standalone: true,
})
export class HomeComponent {
  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    return this.authService.userInfo.firstName;
  }

  openRandomDialog(): void {
    this.dialogService.open(RandomDialogComponent, {
      title: "Dialog Modal Title",
      buttonText: "Show Welcome Alert",
      content: `
        Lorem ipsum dolor sit amet,
        consectetur adipisicing elit.
        Ad aliquam consectetur culpa cumque dicta dolorum error eum
        fugit ipsam iusto maiores nam
        perspiciatis porro qui quibusdam, rem sunt unde veniam.`,
    });
  }
}
