import { createId } from "@paralleldrive/cuid2"
import { integer, pgTable, text } from "drizzle-orm/pg-core"

import { qrCode } from "@/database/schema/qr-code"
import { int } from "drizzle-orm/mysql-core"

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

export const qrFile = pgTable("qr_code_file", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  qrCodeId: text("qr_code_id")
    .references(() => qrCode.id, {
      onDelete: "cascade",
    })
    .notNull(),
  fileId: text("file_id").notNull(),
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

export const qrVirtualCard = pgTable("qr_virtual_card", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  qrCodeId: text("qr_code_id")
    .references(() => qrCode.id, {
      onDelete: "cascade",
    })
    .notNull(),

  profileImage: text("profile_image").notNull(),
  images: text("images").array(),

  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  middleName: text("middle_name"),
  prefix: text("prefix"),
  suffix: text("suffix"),

  mobileNumber: text("mobile_number"),
  work: text("work"),
  home: text("home"),
  whatsapp: text("whatsapp"),
  fax: text("fax"),

  personal: text("personal"),
  email_work: text("email_work"),

  home_street: text("home_street"),
  home_city: text("home_city"),
  home_state: text("home_state"),
  home_zip: text("home_zip"),
  home_country: text("home_country"),

  work_street: text("work_street"),
  work_city: text("work_city"),
  work_state: text("work_state"),
  work_zip: text("work_zip"),
  work_country: text("work_country"),
  website: text("website"),

  organization: text("organization"),
  job_title: text("job_title"),
  department: text("department"),

  linkedin: text("linkedin"),
  twitter: text("twitter"),
  instagram: text("instagram"),
  facebook: text("facebook"),

  info: text("info"),
})
