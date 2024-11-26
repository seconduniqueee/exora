import { Route } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { authGuard, guestGuard } from "./core/auth/auth.guard";
import { HomeComponent } from "./pages/home/home.component";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { ServicesComponent } from "./pages/services/services.component";
import { EventsComponent } from "./pages/events/events.component";
import { AccountComponent } from "./pages/account/account.component";
import { UserInfoTabComponent } from "./pages/account/account-tabs/user-info-tab/user-info-tab.component";
import { SecurityTabComponent } from "./pages/account/account-tabs/security-tab/security-tab.component";
import { NewServiceComponent } from "./pages/new-service/new-service.component";

export const appRoutes: Route[] = [
  { path: "", component: HomeComponent, canActivate: [guestGuard] },
  { path: "login", component: LoginComponent, canActivate: [guestGuard] },
  { path: "sign-up", component: SignUpComponent, canActivate: [guestGuard] },
  { path: "services", component: ServicesComponent, canActivate: [authGuard] },
  { path: "new-service", component: NewServiceComponent, canActivate: [authGuard] },
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
