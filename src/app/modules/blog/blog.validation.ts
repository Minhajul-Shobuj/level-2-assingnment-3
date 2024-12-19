import { z } from "zod";

const blogSchemaValidation = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
    author: z.string(),
    isPublished: z.boolean().optional(),
  }),
});

export const BlogValidation = {
  blogSchemaValidation,
};
