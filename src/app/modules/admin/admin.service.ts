import mongoose from "mongoose";
import { Blog } from "../blog/blog.model";
import { User } from "../user/user.model";
import { checkGivenId, validateAndFilterPayload } from "./admin.utiles";

const blockUserInDB = async (
  userId: string,
  payload: { isBlocked: boolean }
) => {
  checkGivenId(userId);

  const allowedFields = ["isBlocked"];
  validateAndFilterPayload(payload, allowedFields);
  const result = await User.findOneAndUpdate(
    { _id: userId },
    { ...payload },
    { new: true, runValidators: true }
  );

  if (!result) {
    throw new Error("User not found");
  }
  return result;
};

const deleteBlogFromDb = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid blog ID");
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new Error("Blog is already Deleted");
  }
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const AdminService = {
  deleteBlogFromDb,
  blockUserInDB,
};
