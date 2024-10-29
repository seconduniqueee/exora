import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { HOME_PAGE_PATH, LOGIN_PAGE_PATH } from "./auth.model";

export const authGuard: CanActivateFn = async (route): Promise<boolean> => {
  let authService = inject(AuthService);
  let router = inject(Router);
  let targetPath = route.routeConfig.path;

  await authService.checkIfLoggedIn();

  if (!authService.isLoggedIn && targetPath !== LOGIN_PAGE_PATH) {
    await router.navigate([LOGIN_PAGE_PATH]);
    return false;
  }

  if (authService.isLoggedIn && targetPath !== HOME_PAGE_PATH) {
    await router.navigate([HOME_PAGE_PATH]);
  }

  return true;
};
