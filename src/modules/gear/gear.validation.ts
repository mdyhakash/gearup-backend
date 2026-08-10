import { z } from "zod";
import { GearCondition } from "../../../generated/prisma/enums";

const CreateGearZodSchema = z.object({
  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(100),
  description: z
    .string("Description is required")
    .min(10, "Description must be at least 10 characters long"),
  brand: z.string().optional(),
  dailyRate: z
    .number("Daily rate must be a number")
    .positive("Daily rate must be greater than 0"),
  image: z.string().optional(),
  stock: z
    .number("Stock must be a number")
    .int("Stock must be a whole number")
    .nonnegative("Stock cannot be negative"),
  condition: z.enum(
    [
      GearCondition.NEW,
      GearCondition.GOOD,
      GearCondition.FAIR,
      GearCondition.DAMAGED,
    ],
    "Invalid gear condition",
  ),
  categoryId: z.string("Category id is required"),
});

const UpdateGearZodSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100)
    .optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .optional(),
  brand: z.string().optional(),
  dailyRate: z
    .number()
    .positive("Daily rate must be greater than 0")
    .optional(),
  image: z.string().optional(),
  stock: z
    .number()
    .int("Stock must be a whole number")
    .nonnegative("Stock cannot be negative")
    .optional(),
  condition: z
    .enum([
      GearCondition.NEW,
      GearCondition.GOOD,
      GearCondition.FAIR,
      GearCondition.DAMAGED,
    ])
    .optional(),
  categoryId: z.string().optional(),
});

export const GearValidation = {
  CreateGearZodSchema,
  UpdateGearZodSchema,
};
