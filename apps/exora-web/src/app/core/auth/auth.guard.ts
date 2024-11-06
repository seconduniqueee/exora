import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { GUEST_ONLY_ROUTES, GUEST_ROUTES, HOME_PAGE_PATH } from "./auth.model";

export const authGuard: CanActivateFn = async (): Promise<boolean> => {
  let authService = inject(AuthService);
  let router = inject(Router);
  let isLoggedIn = await authService.checkIfLoggedIn();
  let currentUrlValid = GUEST_ROUTES.some((url) => router.url.toLowerCase().includes(url));

  if (isLoggedIn) return true;
  if (!isLoggedIn && !currentUrlValid) void router.navigate([HOME_PAGE_PATH]);

  return false;
};

export const guestGuard: CanActivateFn = async (route): Promise<boolean> => {
  let authService = inject(AuthService);
  let isLoggedIn = await authService.checkIfLoggedIn();
  let targetPath = route.routeConfig.path;

  return !isLoggedIn || !GUEST_ONLY_ROUTES.includes(targetPath);
};
