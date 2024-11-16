import { Component } from "@angular/core";
import { AuthService } from "../../core/auth/auth.service";
import { UserModel } from "@exora/shared-models";

@Component({
  templateUrl: "account.component.html",
  styleUrl: "account.component.scss",
  standalone: true,
})
export class AccountComponent {
  constructor(private authService: AuthService) {}

  get userInfo(): UserModel {
    return this.authService.userInfo;
  }
}
