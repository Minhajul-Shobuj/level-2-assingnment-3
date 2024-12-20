import mongoose from "mongoose";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserInDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const blockUserInDB = async (userId: string, isBlocked: boolean) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }
  const result = await User.findOneAndUpdate(
    { _id: userId },
    { isBlocked },
    { new: true, runValidators: true }
  );

  if (!result) {
    throw new Error("User not found");
  }
  return result;
};

export const UserService = {
  createUserInDB,
  blockUserInDB,
};
