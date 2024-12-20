import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/register",
  validateRequest(UserValidation.userSchemaValidation),
  UserController.createUser
);
router.patch(
  "/:userId/block",
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.blockUserValidation),
  UserController.blockUser
);

export const UserRoute = router;
