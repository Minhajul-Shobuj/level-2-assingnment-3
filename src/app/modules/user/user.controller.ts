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

export const UserController = {
  createUser,
};
