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
