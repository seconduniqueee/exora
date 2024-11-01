import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { HOME_PAGE_PATH, LOGIN_PAGE_PATH, SIGNUP_PAGE_PATH } from "./auth.model";

export const authGuard: CanActivateFn = async (route): Promise<boolean> => {
  let authService = inject(AuthService);
  let router = inject(Router);
  let targetPath = route.routeConfig.path;
  let isLoggedIn = await authService.checkIfLoggedIn();
  let guestPaths = [LOGIN_PAGE_PATH, SIGNUP_PAGE_PATH];

  if (!isLoggedIn && !guestPaths.includes(targetPath)) {
    await router.navigate([LOGIN_PAGE_PATH]);
    return false;
  }

  if (isLoggedIn && guestPaths.includes(targetPath)) {
    await router.navigate([HOME_PAGE_PATH]);
  }

  return true;
};
