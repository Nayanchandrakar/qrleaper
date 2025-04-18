import { count, desc, eq } from "drizzle-orm";

import { db } from "@/database/db";
import { qrCode, qrCodeStyle, qrScanCount } from "@/database/schema";

export const getQrCodesWithStyleAndTotalQrCount = async (
	userId: string,
	pageSize: number,
	page: number,
) => {
	const [[totalQrCodes], data] = await Promise.all([
		db
			.select({ count: count() })
			.from(qrCode)
			.where(eq(qrCode.userId, userId))
			.limit(1),

		db
			.select()
			.from(qrCode)
			.leftJoin(qrCodeStyle, eq(qrCode.id, qrCodeStyle.qrCodeId))
			.leftJoin(qrScanCount, eq(qrCode.id, qrScanCount.qrCodeId))
			.where(eq(qrCode.userId, userId))
			.orderBy(desc(qrCode.createdAt))
			.limit(pageSize)
			.offset((page - 1) * pageSize),
	]);
	return {
		count: totalQrCodes?.count ?? 0,
		data,
	};
};
