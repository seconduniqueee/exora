import { TokensModel } from "./tokens.model";

export interface AuthResponseModel {
  tokens: TokensModel;
}

export interface UserInfoModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  roleID: number;
  role: RoleModel;
}

export interface RoleModel {
  id: number;
  name: string;
}
