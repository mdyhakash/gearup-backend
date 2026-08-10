import { z } from "zod";
import { UserStatus } from "../../../generated/prisma/enums";

const UpdateUserStatusZodSchema = z.object({
  status: z.enum(
    [UserStatus.ACTIVE, UserStatus.BLOCKED],
    "Invalid user status",
  ),
});

export const AdminValidation = {
  UpdateUserStatusZodSchema,
};
