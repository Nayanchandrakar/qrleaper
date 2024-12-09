import { qrCode, qrCodeStyle } from "@/database/schema"
import { qrLink } from "@/database/schema/qr-variations"

export type qrCodeType = typeof qrCode.$inferSelect
export type qrCodeStyleType = typeof qrCodeStyle.$inferSelect
export type qrCodeLinkType = typeof qrLink.$inferSelect
