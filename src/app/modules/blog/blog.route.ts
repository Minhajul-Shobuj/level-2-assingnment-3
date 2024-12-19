import express from "express";
import { BlogController } from "./blog.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BlogValidation } from "./blog.validation";

const router = express.Router();

router.post(
  "/create",
  validateRequest(BlogValidation.blogSchemaValidation),
  BlogController.createBlog
);

export const BlogRoute = router;
