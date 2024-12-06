import { createId } from "@paralleldrive/cuid2"
import { pgTable, text } from "drizzle-orm/pg-core"

import { qrCode } from "@/database/schema/qr-code"

export const qrLink = pgTable("qr_code_link", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  qrCodeId: text("qr_code_id")
    .references(() => qrCode.id, {
      onDelete: "cascade",
    })
    .notNull(),
  link: text("link").notNull(),
})

export const qrMessage = pgTable("qr_message", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  qrCodeId: text("qr_code_id")
    .references(() => qrCode.id, {
      onDelete: "cascade",
    })
    .notNull(),
  phoneNumber: text("phoneNumber").notNull(),
  message: text("message"),
})

export const qrEmail = pgTable("qr_email", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  qrCodeId: text("qr_code_id")
    .references(() => qrCode.id, {
      onDelete: "cascade",
    })
    .notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message"),
})

export const qrInstagram = pgTable("qr_instagram", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  qrCodeId: text("qr_code_id")
    .references(() => qrCode.id, {
      onDelete: "cascade",
    })
    .notNull(),
  instagramId: text("instagram_id").notNull(),
})

export const qrFacebook = pgTable("qr_facebook", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  qrCodeId: text("qr_code_id")
    .references(() => qrCode.id, {
      onDelete: "cascade",
    })
    .notNull(),
  facebookUrl: text("facebook_url").notNull(),
})

export const qrYoutube = pgTable("qr_youtube", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  qrCodeId: text("qr_code_id")
    .references(() => qrCode.id, {
      onDelete: "cascade",
    })
    .notNull(),
  youtubeUrl: text("youtube_url").notNull(),
})

export const qrGoogleDoc = pgTable("qr_google_doc", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  qrCodeId: text("qr_code_id")
    .references(() => qrCode.id, {
      onDelete: "cascade",
    })
    .notNull(),
  googleDocUrl: text("google_doc_url").notNull(),
})
