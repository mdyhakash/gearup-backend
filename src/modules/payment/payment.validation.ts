import { z } from "zod";

const InitiatePaymentZodSchema = z.object({
  rentalOrderId: z.string("Rental order id is required"),
});

export const PaymentValidation = {
  InitiatePaymentZodSchema,
};
