import { RequestHandler } from "express";
import catchAsync from "../../utiles/catchAsync";
import { BlogService } from "./blog.service";
import sendResponse from "../../utiles/sendResponse";
import httpStatus from "http-status";
import { Blog } from "./blog.model";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { checkAuthorIsValid, checkGivenId, isBlogExist } from "./blog.utiles";

const createBlog: RequestHandler = catchAsync(async (req, res) => {
  const result = await BlogService.createBlogInDB(req.body);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully Posted a Blog",
  });
});
const updateBlog: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  checkGivenId(id);
  await isBlogExist(id);
  const blog = await Blog.findById(id).populate("author");
  const { email: authorEmail } = blog?.author;
  const userEmail = req.user?.email;
  checkAuthorIsValid(userEmail, authorEmail);

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
  checkGivenId(id);
  await isBlogExist(id);
  const blog = await Blog.findById(id).populate("author");
  const { email: authorEmail } = blog?.author;
  const userEmail = req.user?.email;
  checkAuthorIsValid(userEmail, authorEmail);

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
