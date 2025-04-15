import dayjs from "dayjs";
import { eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

import { db } from "@/database/db";
import { subscription, users } from "@/database/schema";
import { sendEmail } from "@/lib/mail";
import QrCodeExpirationNotice from "@/templates/notifications/qr-code-expiry-email-template";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
	try {
		const authHeader = req.headers.get("authorization");
		if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
			return new Response("Unauthorized", {
				status: 401,
			});
		}

		// Get today’s date and calculate the date one month ago
		const oneMonthAgo = dayjs().subtract(1, "month").toDate();

		// Query to get user emails whose subscriptions expired exactly one month ago
		const expiredSubscriptions = await db
			.select({
				userId: users.id,
				email: users.email,
				expirationDate: subscription.stripeCurrentPeriodEnd,
			})
			.from(subscription)
			.innerJoin(users, eq(subscription.userId, users.id))
			.where(
				sql`DATE(${subscription.stripeCurrentPeriodEnd}) = DATE(${oneMonthAgo})`,
			);

		if (expiredSubscriptions.length === 0) {
			console.log("No subscriptions expired one month ago. No emails to send.");
			return new Response("No emails to send", { status: 200 });
		}

		// Send emails to each user with an expired subscription
		for (const { email, expirationDate } of expiredSubscriptions) {
			try {
				await sendEmail({
					subject: "🚨 Your QR Code Has Expired – Here's How to Reactivate It!",
					email: email!,
					react: QrCodeExpirationNotice({
						expirationDate,
						url: `${process.env.APP_URL}/pricing`,
					}),
				});

				console.log(`Email sent to ${email}`);
			} catch (emailError) {
				console.error(`Failed to send email to ${email}:`, emailError);
			}
		}

		return new Response("Expiry emails sent successfully", { status: 200 });
	} catch (error) {
		console.error("Error in daily expiry email cron job:", error);
		return new Response("Failed to send expiry emails", { status: 500 });
	}
}
