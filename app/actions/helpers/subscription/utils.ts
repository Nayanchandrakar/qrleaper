import dayjs from "dayjs";
import { eq, sql } from "drizzle-orm";

import { subscriptionPlan } from "@/app/actions/helpers";
import { db } from "@/database/db";
import { qrCode, subscription } from "@/database/schema";
import { decrement, increment } from "@/database/utils";

export const createSubscription = async (userId: string) => {
	try {
		await db?.insert(subscription).values({
			userId,
			count: 0,
			stripeCurrentPeriodEnd: dayjs()?.add(1, "month").toDate(),
		});
	} catch {
		return null;
	}
};

export const incrementQrSubscriptionCountByUserId = async (userId: string) => {
	try {
		// increment user qr code subscription count by 1 each time
		await db
			.update(subscription)
			.set({
				count: increment(subscription.count, 1),
			})
			.where(eq(subscription.userId, userId));
	} catch {
		return null;
	}
};

export const decrementQrSubscriptionCountByUserId = async (userId: string) => {
	try {
		// decrement user qr code subscription count by 1 each time
		await db
			.update(subscription)
			.set({
				count: decrement(subscription.count, 1),
			})
			.where(eq(subscription.userId, userId));
	} catch {
		return null;
	}
};

export const updateQrCodeStatusWithSubscriptionChange = async (
	userId: string,
	stripePriceId: string,
) => {
	const plan = subscriptionPlan(stripePriceId);

	await db
		.update(qrCode)
		.set({
			status: sql`CASE 
      WHEN "id" IN (
        SELECT "id" FROM "qr_code"
        WHERE "user_id" = ${userId}
        ORDER BY "createdAt" DESC
        LIMIT ${plan.limit}
      ) THEN 'active'::status
      ELSE 'inactive'::status
    END`,
		})
		.where(eq(qrCode.userId, userId));
};
