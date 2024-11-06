import { UserModel } from "@exora/shared-models";

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";
export const LOGIN_PAGE_PATH = "login";
export const SIGNUP_PAGE_PATH = "sign-up";
export const HOME_PAGE_PATH = "";

export interface AuthState {
  user: UserModel;
  appInitialized: boolean;
}

export const GUEST_ONLY_ROUTES = [LOGIN_PAGE_PATH, SIGNUP_PAGE_PATH];
export const GUEST_ROUTES = [...GUEST_ONLY_ROUTES, HOME_PAGE_PATH];
