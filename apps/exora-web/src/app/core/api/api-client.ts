//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.1.0.0 (NJsonSchema v11.0.2.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
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
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }

  signUp(body: SignupRequestDto): Observable<AuthResponseDto> {
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
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSignUp(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<AuthResponseDto>;
            }
          } else return _observableThrow(response_) as any as Observable<AuthResponseDto>;
        }),
      );
  }

  protected processSignUp(response: HttpResponseBase): Observable<AuthResponseDto> {
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
              : (JSON.parse(_responseText, this.jsonParseReviver) as AuthResponseDto);
          return _observableOf(result201);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  signIn(body: LoginRequestDto): Observable<AuthResponseDto> {
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
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSignIn(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<AuthResponseDto>;
            }
          } else return _observableThrow(response_) as any as Observable<AuthResponseDto>;
        }),
      );
  }

  protected processSignIn(response: HttpResponseBase): Observable<AuthResponseDto> {
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
              : (JSON.parse(_responseText, this.jsonParseReviver) as AuthResponseDto);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers,
          );
        }),
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
        }),
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
        }),
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
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  updatePassword(body: UpdatePasswordRequestDto): Observable<ActionResultDto> {
    let url_ = this.baseUrl + "/api/auth/update-password";
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
          return this.processUpdatePassword(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdatePassword(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<ActionResultDto>;
            }
          } else return _observableThrow(response_) as any as Observable<ActionResultDto>;
        }),
      );
  }

  protected processUpdatePassword(response: HttpResponseBase): Observable<ActionResultDto> {
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
          let result204: any = null;
          result204 =
            _responseText === ""
              ? null
              : (JSON.parse(_responseText, this.jsonParseReviver) as ActionResultDto);
          return _observableOf(result204);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  refreshToken(): Observable<TokensDto> {
    let url_ = this.baseUrl + "/api/auth/refreshToken";
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
          return this.processRefreshToken(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processRefreshToken(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<TokensDto>;
            }
          } else return _observableThrow(response_) as any as Observable<TokensDto>;
        }),
      );
  }

  protected processRefreshToken(response: HttpResponseBase): Observable<TokensDto> {
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
              : (JSON.parse(_responseText, this.jsonParseReviver) as TokensDto);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers,
          );
        }),
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
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }

  userInfo(includeRole?: boolean | undefined): Observable<UserDto> {
    let url_ = this.baseUrl + "/api/user/user-info?";
    if (includeRole === null) throw new Error("The parameter 'includeRole' cannot be null.");
    else if (includeRole !== undefined)
      url_ += "includeRole=" + encodeURIComponent("" + includeRole) + "&";
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
          return this.processUserInfo(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUserInfo(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<UserDto>;
            }
          } else return _observableThrow(response_) as any as Observable<UserDto>;
        }),
      );
  }

  protected processUserInfo(response: HttpResponseBase): Observable<UserDto> {
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
              : (JSON.parse(_responseText, this.jsonParseReviver) as UserDto);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: "root",
})
export class ServiceTypesClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }

  serviceTypes(): Observable<NamedEntityDto[]> {
    let url_ = this.baseUrl + "/api/service-types";
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
          return this.processServiceTypes(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processServiceTypes(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<NamedEntityDto[]>;
            }
          } else return _observableThrow(response_) as any as Observable<NamedEntityDto[]>;
        }),
      );
  }

  protected processServiceTypes(response: HttpResponseBase): Observable<NamedEntityDto[]> {
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
              : (JSON.parse(_responseText, this.jsonParseReviver) as NamedEntityDto[]);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: "root",
})
export class ServicesClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }

  services(): Observable<ServiceDto[]> {
    let url_ = this.baseUrl + "/api/services";
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
          return this.processServices(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processServices(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<ServiceDto[]>;
            }
          } else return _observableThrow(response_) as any as Observable<ServiceDto[]>;
        }),
      );
  }

  protected processServices(response: HttpResponseBase): Observable<ServiceDto[]> {
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
              : (JSON.parse(_responseText, this.jsonParseReviver) as ServiceDto[]);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  service(body: CreateServiceRequestDto): Observable<ServiceDto> {
    let url_ = this.baseUrl + "/api/service";
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
          return this.processService(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processService(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<ServiceDto>;
            }
          } else return _observableThrow(response_) as any as Observable<ServiceDto>;
        }),
      );
  }

  protected processService(response: HttpResponseBase): Observable<ServiceDto> {
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
              : (JSON.parse(_responseText, this.jsonParseReviver) as ServiceDto);
          return _observableOf(result201);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

export interface SignupRequestDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;

  [key: string]: any;
}

export interface TokensDto {
  accessToken: string;
  refreshToken: string;

  [key: string]: any;
}

export interface AuthResponseDto {
  tokens: TokensDto;
  isSuccess: boolean;
  errorMessage: string;

  [key: string]: any;
}

export interface LoginRequestDto {
  email: string;
  password: string;

  [key: string]: any;
}

export interface UpdatePasswordRequestDto {
  currentPassword: string;
  newPassword: string;

  [key: string]: any;
}

export interface ActionResultDto {
  errorMessage?: string;
  isSuccess: boolean;

  [key: string]: any;
}

export interface NamedEntityDto {
  id: number;
  name: string;

  [key: string]: any;
}

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  roleID: number;
  role: NamedEntityDto;

  [key: string]: any;
}

export interface ServiceDto {
  id: number;
  name: string;
  description: string;
  serviceTypeID: number;
  serviceType: NamedEntityDto;
  price: number;

  [key: string]: any;
}

export interface CreateServiceRequestDto {
  name: string;
  description: string;
  serviceTypeID: number;
  price: number;

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
    result: any,
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
  result?: any,
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
