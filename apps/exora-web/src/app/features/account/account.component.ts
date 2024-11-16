import { Component } from "@angular/core";
import { UserModel } from "@exora/shared-models";
import { AuthService } from "../../core/auth/auth.service";
import { AccountMenuComponent } from "./account-menu/account-menu.component";
import { AccountTabsComponent } from "./account-tabs/account-tabs.component";

@Component({
  templateUrl: "account.component.html",
  styleUrl: "account.component.scss",
  imports: [AccountMenuComponent, AccountTabsComponent],
  standalone: true,
})
export class AccountComponent {
  constructor(private authService: AuthService) {}

  get userInfo(): UserModel {
    return this.authService.userInfo;
  }
}
