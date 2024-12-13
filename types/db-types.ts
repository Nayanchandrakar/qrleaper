import {
  qrAnalytics,
  qrCode,
  qrCodeStyle,
  qrScanCount,
  subscription,
} from "@/database/schema"
import { qrLink } from "@/database/schema/qr-variations"

export type qrCodeType = typeof qrCode.$inferSelect
export type qrCodeStyleType = typeof qrCodeStyle.$inferSelect
export type qrCodeLinkType = typeof qrLink.$inferSelect
export type qrType = (typeof qrCode.$inferSelect)["type"]
export type qrScanCountType = typeof qrScanCount.$inferInsert
export type qrAnayticsType = typeof qrAnalytics.$inferSelect
export type subscritpionTableType = typeof subscription.$inferInsert
