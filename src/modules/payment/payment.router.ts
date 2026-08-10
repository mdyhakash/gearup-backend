import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { PaymentValidation } from "./payment.validation";

const router = Router();

router.post(
  "/create",
  auth(Role.CUSTOMER),
  validateRequest(PaymentValidation.InitiatePaymentZodSchema),
  paymentController.createPayment,
);
router.post("/confirm", paymentController.confirmPayment);
router.get("/", auth(Role.CUSTOMER), paymentController.getMyPayments);
router.get("/:id", auth(), paymentController.getPaymentById);

export const paymentRoutes = router;
