import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { API_BASE_URL } from "./core/api/api-client";
import { environment } from "../environments/environment";
import { authInterceptor } from "./core/auth/auth.interceptor";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideExperimentalZonelessChangeDetection(),
    { provide: API_BASE_URL, useValue: environment.apiUrl },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
};
