import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TFullName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TUser = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isBlocked: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExistsById(id: Types.ObjectId): Promise<TUser>;
  isUserExistsByEmail(email: string): Promise<TUser>;
  isUserBlocked(email: string): Promise<TUser>;
  isPasswordMatched(
    plaintextPassword: string,
    hashPassword: string
  ): Promise<boolean>;
}

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
