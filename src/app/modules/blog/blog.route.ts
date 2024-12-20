import express from "express";
import { BlogController } from "./blog.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BlogValidation } from "./blog.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(BlogValidation.blogSchemaValidation),
  BlogController.createBlog
);
router.patch(
  "/:id",
  auth(USER_ROLE.user),
  validateRequest(BlogValidation.updateBlogSchemaValidation),
  BlogController.updateBlog
);
router.delete("/:id", auth(USER_ROLE.admin), BlogController.deleteBlog);

export const BlogRoute = router;
