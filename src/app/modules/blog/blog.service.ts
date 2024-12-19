import { User } from "../user/user.model";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";

const createBlogInDB = async (payload: TBlog) => {
  const author = await User.isUserExistsById(payload?.author);
  if (!author) {
    throw new Error("Author is not valid");
  }
  const result = await Blog.create(payload);
  return result;
};

export const BlogService = {
  createBlogInDB,
};
