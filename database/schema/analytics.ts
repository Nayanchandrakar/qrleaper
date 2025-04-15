import { createId } from "@paralleldrive/cuid2";
import {
	index,
	integer,
	pgTable,
	text,
	uniqueIndex,
} from "drizzle-orm/pg-core";

import { qrCode } from "@/database/schema/qr-code";
import { lifeCycleDates } from "@/database/utils";

export const qrAnalytics = pgTable(
	"qr_analytics",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => createId()),
		qrCodeId: text("qr_code_id")
			.references(() => qrCode.id, {
				onDelete: "cascade",
			})
			.notNull(),
		count: integer("count").default(1),
		deviceId: text("device_id"),
		userAgent: text("user_agent"),
		ip: text("ip"),
		continent: text("continent"),
		country: text("country"),
		city: text("city"),
		region: text("region"),
		deviceType: text("device_type"),
		device_vendor: text("device_vendor"),
		device_model: text("device_model"),
		browser: text("browser"),
		...lifeCycleDates,
	},
	(table) => ({
		deviceIdIdx: index("deviceId_Idx").on(table.deviceId),
		qrCodeIdx: index("qrCode_Idx").on(table.qrCodeId),
	}),
);

export const qrScanCount = pgTable(
	"qr_scan_count",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => createId()),
		count: integer("count").default(1),
		qrCodeId: text("qr_code_id")
			.references(() => qrCode.id, {
				onDelete: "cascade",
			})
			.notNull(),
		...lifeCycleDates,
	},
	(table) => ({
		qrCodeUniqueIndex: uniqueIndex("qrCode_unique_Idx").on(table.qrCodeId),
	}),
);
