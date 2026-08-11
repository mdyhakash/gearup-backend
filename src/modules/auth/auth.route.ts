import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = Router();
router.post(
  "/register",
  validateRequest(AuthValidation.RegisterZodSchema),
  authController.registerUser,
);
router.post(
  "/login",
  validateRequest(AuthValidation.LoginZodSchema),
  authController.loginUser,
);
router.post("/refresh-token", authController.refreshToken);

router.get(
  "/me",
  auth(Role.ADMIN, Role.CUSTOMER, Role.PROVIDER),
  authController.getMyProfile,
);

router.patch(
  "/me",
  auth(Role.ADMIN, Role.CUSTOMER, Role.PROVIDER),
  validateRequest(AuthValidation.UpdateProfileZodSchema),
  authController.updateMyProfile,
);
export const authRoutes = router;
