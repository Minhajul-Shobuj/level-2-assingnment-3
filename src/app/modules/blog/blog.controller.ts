import { RequestHandler } from "express";
import catchAsync from "../../utiles/catchAsync";
import { BlogService } from "./blog.service";
import sendResponse from "../../utiles/sendResponse";
import httpStatus from "http-status";

const createBlog: RequestHandler = catchAsync(async (req, res) => {
  const result = await BlogService.createBlogInDB(req.body);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully Posted a Blog",
  });
});

export const BlogController = {
  createBlog,
};
