"use server";

import { and, eq, gte } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { z } from "zod";

import { createSubscription } from "@/app/actions/helpers/subscription/utils";
import { getUserByEmail } from "@/app/actions/utils";
import { db } from "@/database/db";
import { users, verificationTokens } from "@/database/schema";
import { actionClient } from "@/lib/action/safe-action";
import { throwIfAuthenticated } from "@/lib/action/throw-if-authenticated";
import { hashPassword } from "@/lib/auth/password";
import { registerFormSchema } from "@/zod/auth/register-schema";

const schema = registerFormSchema.extend({
	code: z.string().min(6, "OTP must be 6 characters long."),
});

// Sign up a new user using name , email and password
export const createUserAccountAction = actionClient
	.schema(schema, {
		handleValidationErrorsShape: async (ve) =>
			flattenValidationErrors(ve).fieldErrors,
	})
	.use(throwIfAuthenticated)
	.action(async ({ parsedInput }) => {
		const { email, password, code, name } = parsedInput;

		const verificationToken = await db
			.select()
			.from(verificationTokens)
			.where(
				and(
					eq(verificationTokens.identifier, email),
					eq(verificationTokens.token, code),
					gte(verificationTokens.expires, new Date()),
				),
			);

		if (!verificationToken) {
			throw new Error("Invalid verification code entered.");
		}

		await db
			.delete(verificationTokens)
			.where(
				and(
					eq(verificationTokens.identifier, email),
					eq(verificationTokens.token, code),
				),
			);

		const user = await getUserByEmail(email);

		if (!user) {
			const [data] = await db
				.insert(users)
				.values({
					name,
					email,
					passwordHash: await hashPassword(password),
					emailVerified: new Date(),
				})
				.returning();

			// create a free tier subscritpion for new user
			await createSubscription(data.id);
		}

		return { ok: true };
	});
