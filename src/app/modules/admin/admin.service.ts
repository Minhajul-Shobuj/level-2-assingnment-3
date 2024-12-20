import mongoose from "mongoose";
import { Blog } from "../blog/blog.model";
import { User } from "../user/user.model";

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
