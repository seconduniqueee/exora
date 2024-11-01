import { Route } from "@angular/router";
import { LoginComponent } from "./features/login/login.component";
import { authGuard } from "./core/auth/auth.guard";
import { HomeComponent } from "./features/home/home.component";
import { SignUpComponent } from "./features/sign-up/sign-up.component";
import { ServicesComponent } from "./features/services/services.component";
import { EventsComponent } from "./features/events/events.component";

export const appRoutes: Route[] = [
  { path: "", component: HomeComponent, canActivate: [authGuard] },
  { path: "login", component: LoginComponent, canActivate: [authGuard] },
  { path: "sign-up", component: SignUpComponent, canActivate: [authGuard] },
  { path: "services", component: ServicesComponent, canActivate: [authGuard] },
  { path: "events", component: EventsComponent, canActivate: [authGuard] },
  { path: "**", redirectTo: "" },
];
