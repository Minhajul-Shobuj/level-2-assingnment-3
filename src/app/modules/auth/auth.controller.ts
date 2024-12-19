import catchAsync from "../../utiles/catchAsync";
import sendResponse from "../../utiles/sendResponse";
import { AuthService } from "./auth.service";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

  sendResponse(res, {
    data: result,
    message: "User Successfully Logged In",
    success: true,
    statusCode: httpStatus.OK,
  });
});

export const AuthController = {
  loginUser,
};
