import { idSchema } from "@/zod/utils";
import { z } from "zod";

export const generateStripeSchema = z.object({
	priceId: idSchema.shape.id,
	optionalEndpoint: z.string().optional(),
});
