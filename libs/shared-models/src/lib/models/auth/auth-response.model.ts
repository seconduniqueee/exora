import { TokensModel } from "./tokens.model";

export interface AuthResponseModel {
  tokens: TokensModel;
  isSuccess: boolean;
  errorMessage: string;
}
