import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import passport from "passport";
import config from "../../config";

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

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${config.frontend_url}/login?error=google-auth-failed`,
  }),
  authController.googleCallback,
);

router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logoutUser);

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
