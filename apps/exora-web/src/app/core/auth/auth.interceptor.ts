import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./auth.model";

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  let authService = inject(AuthService);
  let request = addTokenHeader(req);

  return next(request).pipe(
    catchError((response: HttpResponse<unknown>) => {
      let isUnauthorizedException = response.status === 401;
      let isSignInRequest = request.url?.endsWith("sign-in");

      if (!isUnauthorizedException || isSignInRequest) {
        return throwError(() => response);
      }

      return authService.refresh().pipe(
        switchMap(() => next(addTokenHeader(request))),
        catchError((err) => throwError(() => new Error(err))),
      );
    }),
  );
};

const addTokenHeader = (req: HttpRequest<unknown>): HttpRequest<unknown> => {
  let isRefreshCall = req.url?.endsWith("refreshToken");
  let token = isRefreshCall
    ? localStorage.getItem(REFRESH_TOKEN_KEY)
    : localStorage.getItem(ACCESS_TOKEN_KEY);

  return token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
};
