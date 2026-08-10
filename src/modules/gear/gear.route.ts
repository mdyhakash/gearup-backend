import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { gearController } from "./gear.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { GearValidation } from "./gear.validation";

const router = Router();

router.post(
  "/",
  auth(Role.PROVIDER),
  validateRequest(GearValidation.CreateGearZodSchema),
  gearController.createGear,
);
router.get("/", gearController.getAllGear);
router.get("/:id", gearController.getGearById);
router.put(
  "/:id",
  auth(Role.PROVIDER, Role.ADMIN),
  validateRequest(GearValidation.UpdateGearZodSchema),
  gearController.updateGear,
);
router.delete(
  "/:id",
  auth(Role.PROVIDER, Role.ADMIN),
  gearController.deleteGear,
);

export const gearRoutes = router;
