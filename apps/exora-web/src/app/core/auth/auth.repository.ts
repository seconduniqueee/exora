import { Injectable } from "@angular/core";
import { UserModel } from "@exora/shared-models";
import { AuthState } from "./auth.model";
import { BaseQuery, PropRepository } from "../common";

@Injectable({ providedIn: "root" })
export class AuthRepository extends PropRepository<AuthState> {
  setUser(user: UserModel): void {
    this.update({ user });
  }

  clearUserInfo(): void {
    this.update({ user: null });
  }

  constructor() {
    super({ name: "[AUTH]" }, { user: null, appInitialized: false });
  }
}

@Injectable({ providedIn: "root" })
export class AuthQuery extends BaseQuery<AuthState> {
  user$ = this.select((state) => state.user);

  constructor(protected repository: AuthRepository) {
    super(repository);
  }
}
