import { z } from "zod";

const CreateCategoryZodSchema = z.object({
  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(50),
});

const UpdateCategoryZodSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50)
    .optional(),
});

export const CategoryValidation = {
  CreateCategoryZodSchema,
  UpdateCategoryZodSchema,
};
