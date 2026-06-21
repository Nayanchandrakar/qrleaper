import { createId } from "@paralleldrive/cuid2"
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text
} from "drizzle-orm/pg-core"

import { users } from "@/database/schema/user"
import { lifeCycleDates } from "@/database/utils"

export const statusEnum = pgEnum("status", ["active", "inactive"])
export const gradientType = pgEnum("gradient_type", ["linear", "radial"])
export const typeEnum = pgEnum("type", [
  "link",
  "file",
  "message",
  "email",
  "instagram",
  "facebook",
  "youtube",
  "googleDoc",
  "vcard"
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
        onDelete: "cascade"
      })
      .notNull(),
    title: text("title").notNull(),
    type: typeEnum("type").notNull(),
    status: statusEnum("status").default("active"),
    endpoint: text("endpoint"),
    ...lifeCycleDates
  },
  (table) => ({
    userIdIdx: index("userid_qrcode_idx").on(table.userId)
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
        onDelete: "cascade"
      })
      .notNull(),
    logo: text("logo"),
    topText: text("top_text"),
    shape: text("shape").notNull(),
    bottomText: text("bottom_text"),
    colors: text("colors").array().notNull(),
    hasFrame: boolean("has_frame").notNull(),
    rotation: integer("rotation").notNull().default(0),
    colorType: gradientType("gradient_type").default("linear").notNull()
  },
  (table) => ({
    qrIdIndex: index("qr_code_style_idx").on(table.qrCodeId)
  })
)
