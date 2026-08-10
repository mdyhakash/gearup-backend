import { z } from "zod";
import { RentalStatus } from "../../../generated/prisma/enums";

const RentalItemZodSchema = z.object({
  gearItemId: z.string("Gear item id is required"),
  quantity: z
    .number("Quantity must be a number")
    .int("Quantity must be a whole number")
    .positive("Quantity must be at least 1"),
});

const CreateRentalZodSchema = z.object({
  startDate: z.iso
    .datetime({ offset: true, message: "Not a valid start date" })
    .or(z.iso.date("Not a valid start date")),
  endDate: z.iso
    .datetime({ offset: true, message: "Not a valid end date" })
    .or(z.iso.date("Not a valid end date")),
  items: z
    .array(RentalItemZodSchema, "Items are required")
    .min(1, "At least one item is required"),
});

const UpdateOrderStatusZodSchema = z.object({
  status: z.enum(
    Object.values(RentalStatus) as [string, ...string[]],
    "Invalid rental status",
  ),
});

export const RentalValidation = {
  CreateRentalZodSchema,
  UpdateOrderStatusZodSchema,
};
