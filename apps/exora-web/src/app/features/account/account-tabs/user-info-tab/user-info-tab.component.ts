import { Component } from "@angular/core";
import { AuthQuery } from "../../../../core/auth/auth.repository";
import { AsyncPipe } from "@angular/common";

@Component({
  templateUrl: "user-info-tab.component.html",
  styleUrl: "user-info-tab.component.scss",
  imports: [AsyncPipe],
  standalone: true,
})
export class UserInfoTabComponent {
  constructor(public authQuery: AuthQuery) {}
}
