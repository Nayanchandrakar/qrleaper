"use server";

import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { z } from "zod";

import { db } from "@/database/db";
import { users } from "@/database/schema";
import { authUserActionClient } from "@/lib/action/safe-action";

const nameFormSchema = z.object({
	name: z.string().min(1).max(30),
});

export const updateUserAction = authUserActionClient
	.schema(nameFormSchema, {
		handleValidationErrorsShape: async (ve) =>
			flattenValidationErrors(ve).fieldErrors,
	})
	.action(async ({ parsedInput, ctx }) => {
		const { name } = parsedInput;

		// update the user name in the database
		await db
			.update(users)
			.set({
				name,
			})
			.where(eq(users.id, ctx?.user?.id!));
		return { ok: true };
	});
