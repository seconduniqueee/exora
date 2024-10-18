export interface AuthResponseModel {
  userInfo: UserInfoModel;
}

export interface UserInfoModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roleID: number;
  role: RoleModel;
}

export interface RoleModel {
  id: number;
  name: string;
}
