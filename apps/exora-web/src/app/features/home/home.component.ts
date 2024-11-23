import { Component } from "@angular/core";
import { AuthService } from "../../core/auth/auth.service";
import { DialogService } from "../../core/dialog/dialog.service";
import { ConfirmDialogService } from "@exora-web/shared/dialogs/confirm-dialog/confirm-dialog.service";

@Component({
  templateUrl: "home.component.html",
  styleUrl: "home.component.scss",
  providers: [DialogService, AuthService],
  standalone: true,
})
export class HomeComponent {
  constructor(
    private authService: AuthService,
    private confirmDialogService: ConfirmDialogService,
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    return this.authService.userInfo.firstName;
  }

  async confirmBuyingStonks(): Promise<void> {
    let isConfirmed = await this.confirmDialogService.confirm(
      "Confirm Buying Stonks",
      "Are you sure you want to purchase 42 stonks?",
      "Yes, please",
      "No, never",
    );

    let outcome = isConfirmed
      ? "Yey, it was a right call, you got $69 000 profit"
      : "You fool, what have you done?";

    console.log(outcome);
  }
}
