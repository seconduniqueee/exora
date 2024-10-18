import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { SimpleMessageModel } from "@exora/shared-models";

@Injectable()
export class AppService {
  constructor(private httpClient: HttpClient) {}

  async signUp(): Promise<SimpleMessageModel> {
    let request = this.httpClient.post<SimpleMessageModel>("http://localhost:4242/api/sign-up", {});
    return await firstValueFrom(request);
  }

  async logIn(): Promise<SimpleMessageModel> {
    let request = this.httpClient.post<SimpleMessageModel>("http://localhost:4242/api/log-in", {});
    return await firstValueFrom(request);
  }
}
