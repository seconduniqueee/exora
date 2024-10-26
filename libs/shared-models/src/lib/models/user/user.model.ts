import { RoleModel } from "./role.model";

export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  roleID: number;
  role: RoleModel;
}
