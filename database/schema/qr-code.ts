import { createId } from "@paralleldrive/cuid2"
import { pgTable, text, pgEnum, index, boolean } from "drizzle-orm/pg-core"

import { lifeCycleDates } from "@/database/utils"
import { users } from "@/database/schema/user"

export const statusEnum = pgEnum("status", ["active", "inactive"])
export const typeEnum = pgEnum("type", [
  "link",
  "file",
  "message",
  "email",
  "instagram",
  "facebook",
  "youtube",
  "googleDoc",
])

// qr code main table
export const qrCode = pgTable(
  "qr_code",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: text("user_id")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    title: text("title").notNull(),
    type: typeEnum("type").notNull(),
    status: statusEnum("status").default("active"),
    endpoint: text("endpoint"),
    ...lifeCycleDates,
  },
  (table) => ({
    userIdIdx: index("userid_qrcode_idx").on(table.userId),
  })
)

export const qrCodeStyle = pgTable(
  "qr_code_style",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    qrCodeId: text("qr_code_id")
      .references(() => qrCode.id, {
        onDelete: "cascade",
      })
      .notNull(),
    color: text("color").notNull(),
    logo: text("logo"),
    shape: text("shape").notNull(),
    hasFrame: boolean("has_frame").notNull(),
    topText: text("top_text"),
    bottomText: text("bottom_text"),
  },
  (table) => ({
    qrIdIndex: index("qr_code_style_idx").on(table.qrCodeId),
  })
)
