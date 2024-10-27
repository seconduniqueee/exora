import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { AuthResponseModel, LoginRequestModel } from "@exora/shared-models";
import { AuthClient } from "./core/api/api-client";

@Injectable()
export class AppService {
  constructor(private authClient: AuthClient) {}

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    let payload = { currentPassword, newPassword };
    let request = this.authClient.updatePassword(payload);

    await firstValueFrom(request);
  }

  async logIn(email: string, password: string): Promise<AuthResponseModel> {
    let payload: LoginRequestModel = { email, password };
    let request = this.authClient.signIn(payload);
    let result = await firstValueFrom(request);

    return result;
  }
}
