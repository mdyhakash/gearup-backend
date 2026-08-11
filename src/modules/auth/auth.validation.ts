import { z } from "zod";
import { Role } from "../../../generated/prisma/enums";

const RegisterZodSchema = z.object({
  name: z
    .string("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(50),
  email: z.email("Not a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least 1 special character",
    ),
  role: z.enum([Role.CUSTOMER, Role.PROVIDER]).optional(),
  profilePhoto: z.string().optional(),
  bio: z.string().optional(),
});

const LoginZodSchema = z.object({
  email: z.email("Not a valid email"),
  password: z.string("Password is required").min(1, "Password is required"),
});

const UpdateProfileZodSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50)
    .optional(),
  phone: z.string().max(20).optional().nullable(),
  address: z.string().max(255).optional().nullable(),
  bio: z.string().max(500).optional().nullable(),
  profilePhoto: z.string().optional().nullable(),
});

export const AuthValidation = {
  RegisterZodSchema,
  LoginZodSchema,
  UpdateProfileZodSchema,
};
