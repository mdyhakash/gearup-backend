import { Router } from "express";
import { reviewController } from "./review.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { ReviewValidation } from "./review.validation";

const router = Router();

router.post(
  "/",
  auth(Role.CUSTOMER),
  validateRequest(ReviewValidation.CreateReviewZodSchema),
  reviewController.createReview,
);
router.get("/my-reviews", auth(Role.CUSTOMER), reviewController.getMyReviews);
router.get("/:gearItemId", reviewController.getGearReviews);

export const reviewRoutes = router;
