import { Route } from "@angular/router";
import { LoginComponent } from "./features/login/login.component";
import { authGuard, guestGuard } from "./core/auth/auth.guard";
import { HomeComponent } from "./features/home/home.component";
import { SignUpComponent } from "./features/sign-up/sign-up.component";
import { ServicesComponent } from "./features/services/services.component";
import { EventsComponent } from "./features/events/events.component";
import { AccountComponent } from "./features/account/account.component";
import { UserInfoTabComponent } from "./features/account/account-tabs/user-info-tab/user-info-tab.component";
import { SecurityTabComponent } from "./features/account/account-tabs/security-tab/security-tab.component";

export const appRoutes: Route[] = [
  { path: "", component: HomeComponent, canActivate: [guestGuard] },
  { path: "login", component: LoginComponent, canActivate: [guestGuard] },
  { path: "sign-up", component: SignUpComponent, canActivate: [guestGuard] },
  { path: "services", component: ServicesComponent, canActivate: [authGuard] },
  { path: "events", component: EventsComponent, canActivate: [authGuard] },
  {
    path: "account",
    component: AccountComponent,
    canActivate: [authGuard],
    children: [
      { path: "general", component: UserInfoTabComponent },
      { path: "security", component: SecurityTabComponent },
      { path: "**", redirectTo: "general" },
    ],
  },
  { path: "**", redirectTo: "" },
];
