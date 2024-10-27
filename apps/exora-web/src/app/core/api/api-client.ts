//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.0.7.0 (NJsonSchema v11.0.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import { catchError as _observableCatch, mergeMap as _observableMergeMap } from "rxjs/operators";
import { Observable, of as _observableOf, throwError as _observableThrow } from "rxjs";
import { Inject, Injectable, InjectionToken, Optional } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from "@angular/common/http";

export const API_BASE_URL = new InjectionToken<string>("API_BASE_URL");

@Injectable({
  providedIn: "root",
})
export class AuthClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }

  signUp(body: SignupRequest): Observable<AuthResponse> {
    let url_ = this.baseUrl + "/api/auth/sign-up";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };

    return this.http
      .request("post", url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSignUp(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSignUp(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<AuthResponse>;
            }
          } else return _observableThrow(response_) as any as Observable<AuthResponse>;
        })
      );
  }

  protected processSignUp(response: HttpResponseBase): Observable<AuthResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 201) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result201: any = null;
          result201 =
            _responseText === ""
              ? null
              : (JSON.parse(_responseText, this.jsonParseReviver) as AuthResponse);
          return _observableOf(result201);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf(null as any);
  }

  signIn(body: LoginRequest): Observable<AuthResponse> {
    let url_ = this.baseUrl + "/api/auth/sign-in";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };

    return this.http
      .request("post", url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSignIn(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSignIn(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<AuthResponse>;
            }
          } else return _observableThrow(response_) as any as Observable<AuthResponse>;
        })
      );
  }

  protected processSignIn(response: HttpResponseBase): Observable<AuthResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ""
              ? null
              : (JSON.parse(_responseText, this.jsonParseReviver) as AuthResponse);
          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf(null as any);
  }

  logOut(): Observable<void> {
    let url_ = this.baseUrl + "/api/auth/log-out";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({}),
    };

    return this.http
      .request("post", url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processLogOut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processLogOut(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<void>;
            }
          } else return _observableThrow(response_) as any as Observable<void>;
        })
      );
  }

  protected processLogOut(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return _observableOf(null as any);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf(null as any);
  }

  updatePassword(body: UpdatePasswordRequest): Observable<void> {
    let url_ = this.baseUrl + "/api/auth/update-password";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };

    return this.http
      .request("post", url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdatePassword(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdatePassword(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<void>;
            }
          } else return _observableThrow(response_) as any as Observable<void>;
        })
      );
  }

  protected processUpdatePassword(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return _observableOf(null as any);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf(null as any);
  }

  refresh(): Observable<Tokens> {
    let url_ = this.baseUrl + "/api/auth/refresh";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        Accept: "application/json",
      }),
    };

    return this.http
      .request("post", url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processRefresh(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processRefresh(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<Tokens>;
            }
          } else return _observableThrow(response_) as any as Observable<Tokens>;
        })
      );
  }

  protected processRefresh(response: HttpResponseBase): Observable<Tokens> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ""
              ? null
              : (JSON.parse(_responseText, this.jsonParseReviver) as Tokens);
          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: "root",
})
export class UsersClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }

  user(id: number, includeRole: boolean): Observable<any> {
    let url_ = this.baseUrl + "/api/user/{id}?";
    if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    if (includeRole === undefined || includeRole === null)
      throw new Error("The parameter 'includeRole' must be defined and cannot be null.");
    else url_ += "includeRole=" + encodeURIComponent("" + includeRole) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        Accept: "application/json",
      }),
    };

    return this.http
      .request("get", url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUser(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUser(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<any>;
            }
          } else return _observableThrow(response_) as any as Observable<any>;
        })
      );
  }

  protected processUser(response: HttpResponseBase): Observable<any> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === "" ? null : (JSON.parse(_responseText, this.jsonParseReviver) as any);
          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf(null as any);
  }
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;

  [key: string]: any;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;

  [key: string]: any;
}

export interface AuthResponse {
  tokens: Tokens;

  [key: string]: any;
}

export interface LoginRequest {
  email: string;
  password: string;

  [key: string]: any;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;

  [key: string]: any;
}

export class ApiException extends Error {
  override message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result: any
  ) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}

function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): Observable<any> {
  if (result !== null && result !== undefined) return _observableThrow(result);
  else return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next("");
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = (event) => {
        observer.next((event.target as any).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}
