"use server";

import { and, eq, gte } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";

import { getUserByEmail } from "@/app/actions/utils";
import { db } from "@/database/db";
import { passwordResetToken, users } from "@/database/schema";
import { actionClient } from "@/lib/action/safe-action";
import { hashPassword } from "@/lib/auth/password";
import { sendEmail } from "@/lib/mail";
import PasswordUpdated from "@/templates/auth/password-updated";
import { resetPasswordSchema } from "@/zod/auth/reset-password-schema";

export const resetPasswordAction = actionClient
	.schema(resetPasswordSchema, {
		handleValidationErrorsShape: async (ve) =>
			flattenValidationErrors(ve).fieldErrors,
	})
	.action(async ({ parsedInput }) => {
		const { token, password } = parsedInput;

		// Find the token
		const [tokenFound] = await db
			.select({
				identifier: passwordResetToken.identifier,
			})
			.from(passwordResetToken)
			.where(
				and(
					eq(passwordResetToken.token, token),
					gte(passwordResetToken.expires, new Date()),
				),
			);

		if (!tokenFound) {
			throw new Error(
				"Password reset token not found or expired. Please request a new one.",
			);
		}

		const { identifier } = tokenFound;

		const user = await getUserByEmail(identifier);

		if (!user) {
			throw new Error("No user Found with that Email address.");
		}

		await Promise.all([
			db.transaction(async () => {
				db.delete(passwordResetToken).where(
					eq(passwordResetToken.token, token),
				);
				db.update(users)
					.set({
						passwordHash: await hashPassword(password),
						...(!user.emailVerified && { emailVerified: new Date() }), // Mark the email as verified
					})
					.where(eq(users.id, user.id));
			}),

			db.delete(passwordResetToken).where(eq(passwordResetToken.token, token)),

			sendEmail({
				subject: `Your QR Leaper account password has been reset`,
				email: identifier,
				react: PasswordUpdated({
					verb: "reset",
				}),
			}),
		]);

		return { ok: true };
	});
