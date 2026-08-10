import { z } from "zod";

const CreateReviewZodSchema = z.object({
  rentalOrderId: z.string("Rental order id is required"),
  gearItemId: z.string("Gear item id is required"),
  rating: z
    .number("Rating must be a number")
    .int("Rating must be a whole number")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be more than 5"),
  comment: z
    .string()
    .max(500, "Comment cannot be more than 500 characters")
    .optional(),
});

export const ReviewValidation = {
  CreateReviewZodSchema,
};
