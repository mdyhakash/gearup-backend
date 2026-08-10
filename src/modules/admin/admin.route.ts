import { Router } from "express";
import { adminController } from "./admin.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { AdminValidation } from "./admin.validation";

const router = Router();

router.get("/users", auth(Role.ADMIN), adminController.getAllUsers);
router.patch(
  "/users/:id",
  auth(Role.ADMIN),
  validateRequest(AdminValidation.UpdateUserStatusZodSchema),
  adminController.updateUserStatus,
);
router.get("/gear", auth(Role.ADMIN), adminController.getAllGear);
router.get("/rentals", auth(Role.ADMIN), adminController.getAllRentals);

export const adminRoutes = router;
