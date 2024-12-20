import { RequestHandler } from "express";
import catchAsync from "../../utiles/catchAsync";
import { BlogService } from "./blog.service";
import sendResponse from "../../utiles/sendResponse";
import httpStatus from "http-status";
import { Blog } from "./blog.model";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";

const createBlog: RequestHandler = catchAsync(async (req, res) => {
  const result = await BlogService.createBlogInDB(req.body);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully Posted a Blog",
  });
});
const updateBlog: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userEmail = req.user?.email;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid blog ID");
  }
  const blog = await Blog.findById(id).populate("author");
  if (!blog) {
    throw new Error("Blog is already Deleted");
  }
  const { email: authorEmail } = blog?.author;

  if (userEmail !== authorEmail) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
  }

  const result = await BlogService.updateBlogInDb(id, req.body);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog updated successfully",
  });
});
const deleteBlog: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userEmail = req.user?.email;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid blog ID");
  }
  const blog = await Blog.findById(id).populate("author");
  if (!blog) {
    throw new Error("Blog is already Deleted");
  }
  const { email: authorEmail } = blog?.author;

  if (userEmail !== authorEmail) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
  }

  const result = await BlogService.deleteBlogFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog deleted successfully",
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
  deleteBlog,
};
