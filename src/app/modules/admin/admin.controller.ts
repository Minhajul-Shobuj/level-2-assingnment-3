import { RequestHandler } from "express";
import catchAsync from "../../utiles/catchAsync";
import sendResponse from "../../utiles/sendResponse";
import { AdminService } from "./admin.service";
import httpStatus from "http-status";

const blockUser: RequestHandler = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await AdminService.blockUserInDB(userId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User blocked successfully",
  });
});

const deleteBlogByAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminService.deleteBlogFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog deleted successfully",
  });
});
export const AdminController = {
  deleteBlogByAdmin,
  blockUser,
};
