import { Route } from "@angular/router";
import { LoginComponent } from "./features/login/login.component";
import { authGuard } from "./core/auth/auth.guard";
import { HomeComponent } from "./features/home/home.component";
import { SignUpComponent } from "./features/sign-up/sign-up.component";

export const appRoutes: Route[] = [
  { path: "", component: HomeComponent, canActivate: [authGuard] },
  { path: "login", component: LoginComponent, canActivate: [authGuard] },
  { path: "sign-up", component: SignUpComponent, canActivate: [authGuard] },
  { path: "**", redirectTo: "" },
];
