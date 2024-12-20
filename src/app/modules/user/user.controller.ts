import { RequestHandler } from "express";
import catchAsync from "../../utiles/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../utiles/sendResponse";
import httpStatus from "http-status";

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserService.createUserInDB(req.body);

  sendResponse(res, {
    data: result,
    success: true,
    statusCode: httpStatus.OK,
    message: "Successfully Registred an User😊",
  });
});
const blockUser: RequestHandler = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { isBlocked } = req.body;
  await UserService.blockUserInDB(userId, isBlocked);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User blocked successfully",
  });
});
export const UserController = {
  createUser,
  blockUser,
};
