import { Component } from "@angular/core";
import { AccountMenuComponent } from "./account-menu/account-menu.component";
import { AccountTabsComponent } from "./account-tabs/account-tabs.component";

@Component({
  templateUrl: "account.component.html",
  styleUrl: "account.component.scss",
  imports: [AccountMenuComponent, AccountTabsComponent],
  standalone: true,
})
export class AccountComponent {}
