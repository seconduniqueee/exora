import { Injectable } from "@angular/core";
import { AuthClient } from "../api/api-client";
import { TokensModel, UserModel } from "@exora/shared-models";
import { ACCESS_TOKEN_KEY, LOGIN_PAGE_PATH, REFRESH_TOKEN_KEY } from "./auth.model";
import { firstValueFrom, from, throwError } from "rxjs";
import { Router } from "@angular/router";
import { AuthRepository } from "./auth.repository";

@Injectable({ providedIn: "root" })
export class AuthService {
  private refreshRequest: Promise<TokensModel>;

  constructor(
    private authClient: AuthClient,
    private router: Router,
    private authRepository: AuthRepository
  ) {}

  get appInitialized(): boolean {
    return this.authRepository.state.appInitialized;
  }

  get isLoggedIn(): boolean {
    return !!this.authRepository.state.user;
  }

  get isLoading$(): Observable<boolean> {
    return this.authRepository.isLoading$;
  }

  get userInfo(): UserModel {
    return this.authRepository.state.user;
  }

  get isLoading(): boolean {
    return this.authRepository.isLoading;
  }

  async signIn(email: string, password: string): Promise<boolean> {
    try {
      this.authRepository.startLoading();

      await this.logIn(email, password);
      await this.loadUserInfo();

      return true;
    } catch (error) {
      console.error(error);
    } finally {
      this.authRepository.stopLoading();
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

  async checkIfLoggedIn(): Promise<boolean> {
    try {
      let tokens = this.getTokens();
      let user = this.authRepository.state.user;

      if (!user && tokens.accessToken) await this.loadUserInfo();

      return this.isLoggedIn;
    } catch (error) {
      console.error(error);
    } finally {
      this.authRepository.update({ appInitialized: true });
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
      .catch(() => this.router.navigate([LOGIN_PAGE_PATH]))
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

    this.authRepository.setUser(result);
  }

  private clearUserInfo(): void {
    this.clearTokens();
    this.authRepository.clearUserInfo();
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
