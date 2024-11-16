import { Component } from "@angular/core";
import { UserModel } from "@exora/shared-models";
import { AuthRepository } from "../../../../core/auth/auth.repository";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  templateUrl: "user-info-tab.component.html",
  styleUrl: "user-info-tab.component.scss",
  standalone: true,
})
export class UserInfoTabComponent {
  user: Signal<UserModel>;

  constructor(private authRepository: AuthRepository) {
    this.user = toSignal(authRepository.user$);
  }
}
