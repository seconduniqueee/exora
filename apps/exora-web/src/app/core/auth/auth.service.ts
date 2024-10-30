import { Injectable } from "@angular/core";
import { AuthClient } from "../api/api-client";
import { TokensModel, UserModel } from "@exora/shared-models";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./auth.model";
import { firstValueFrom, from, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthService {
  private userData: UserModel;
  private userDataLoading = false;
  private refreshRequest: Promise<TokensModel>;

  constructor(private authClient: AuthClient, private router: Router) {}

  get isLoggedIn(): boolean {
    return !!this.userData;
  }

  get userInfo(): UserModel {
    return this.userData;
  }

  get appLoading(): boolean {
    return this.userDataLoading;
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

  async checkIfLoggedIn(): Promise<void> {
    try {
      let tokens = this.getTokens();
      let user = this.userData;

      if (user && !tokens.accessToken) {
        this.clearUserInfo();
        return;
      }

      if (!user && tokens.accessToken) {
        this.userDataLoading = true;
        await this.loadUserInfo();
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.userDataLoading = false;
    }
  }

  refresh(): Observable<TokensModel> {
    let refreshToken = this.getTokens().refreshToken;

    if (!refreshToken) {
      return throwError(() => new Error("Refresh token not found"));
    }

    if (this.refreshRequest) {
      return from(this.refreshRequest);
    }

    this.refreshRequest = firstValueFrom(this.authClient.refreshToken());
    this.refreshRequest
      .then((tokens) => this.setTokens(tokens))
      .catch(() => this.router.navigate(["login"]))
      .finally(() => (this.refreshRequest = null));

    return from(this.refreshRequest);
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

  private getTokens(): TokensModel {
    let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    let refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    return { accessToken, refreshToken };
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
