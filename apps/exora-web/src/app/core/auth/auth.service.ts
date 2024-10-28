import { Injectable } from "@angular/core";
import { AuthClient } from "../api/api-client";
import { TokensModel, UserModel } from "@exora/shared-models";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./auth.model";
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  userData: UserModel;

  constructor(private authClient: AuthClient) {}

  get isLoggedIn(): boolean {
    return !!this.userData;
  }

  get userInfo(): UserModel {
    return this.userData;
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      await this.logIn(email, password);
      await this.loadUserInfo();
    } catch (error) {
      console.error(error);
    }
  }

  async logOut(): Promise<void> {
    try {
      let request = this.authClient.logOut();

      await firstValueFrom(request);
      this.clearUserInfo();
    } catch (error) {
      console.error(error);
      this.clearUserInfo();
    }
  }

  private async logIn(email: string, password: string): Promise<void> {
    let payload = { email, password };
    let request = this.authClient.signIn(payload);
    let result = await firstValueFrom(request);

    this.setTokens(result.tokens);
  }

  private async loadUserInfo(): Promise<void> {
    let request = this.authClient.userInfo();
    let result = await firstValueFrom(request);

    this.userData = result;
  }

  private clearUserInfo(): void {
    this.clearTokens();
    this.userData = null;
  }

  private clearTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  private setTokens(tokens: TokensModel): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  }
}
