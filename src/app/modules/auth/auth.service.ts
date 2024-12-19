import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload?.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Email is not valid");
  }
  if (await User.isUserBlocked(payload?.email)) {
    throw new AppError(httpStatus.FORBIDDEN, "User is Blocked");
  }
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Incorrect Password");
  }
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const accessTokent = jwt.sign(
    jwtPayload,
    config.jwt_access_secret as string,
    { expiresIn: "10d" }
  );
  return accessTokent;
};

export const AuthService = {
  loginUser,
};
