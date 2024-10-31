import { Injectable } from "@angular/core";
import { UserModel } from "@exora/shared-models";
import { AuthState } from "./auth.model";
import { PropRepository } from "../common/base-repository/prop.repository";

@Injectable({ providedIn: "root" })
export class AuthRepository extends PropRepository<AuthState> {
  user$ = this.select((state) => state.user);

  constructor() {
    super({ name: "[AUTH]" }, { user: null, appInitialized: false });
  }

  setUser(user: UserModel) {
    this.update({ user });
  }

  clearUserInfo(): void {
    this.update({ user: null });
  }
}
