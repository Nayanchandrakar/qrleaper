import { createId } from "@paralleldrive/cuid2"
import { index, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core"

import { qrCode } from "@/database/schema/qr-code"

export const qrLink = pgTable(
  "qr_code_link",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    qrCodeId: text("qr_code_id")
      .references(() => qrCode.id, {
        onDelete: "cascade"
      })
      .notNull(),
    link: text("link").notNull()
  },
  (table) => ({
    qrCodeIdIndex: index("qr_link_qrcode_idx").on(table.qrCodeId)
  })
)

export const qrFile = pgTable(
  "qr_code_file",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    qrCodeId: text("qr_code_id")
      .references(() => qrCode.id, {
        onDelete: "cascade"
      })
      .notNull(),
    fileId: text("file_id").notNull()
  },
  (table) => ({
    qrCodeIdIndex: index("qr_file_qrcode_idx").on(table.qrCodeId)
  })
)

export const qrMessage = pgTable(
  "qr_message",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    qrCodeId: text("qr_code_id")
      .references(() => qrCode.id, {
        onDelete: "cascade"
      })
      .notNull(),
    phoneNumber: text("phoneNumber").notNull(),
    message: text("message")
  },
  (table) => ({
    qrCodeIdIndex: index("qr_message_qrcode_idx").on(table.qrCodeId)
  })
)

export const qrEmail = pgTable(
  "qr_email",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    qrCodeId: text("qr_code_id")
      .references(() => qrCode.id, {
        onDelete: "cascade"
      })
      .notNull(),
    email: text("email").notNull(),
    subject: text("subject"),
    message: text("message")
  },
  (table) => ({
    qrCodeIdIndex: index("qr_email_qrcode_idx").on(table.qrCodeId)
  })
)

export const qrInstagram = pgTable(
  "qr_instagram",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    qrCodeId: text("qr_code_id")
      .references(() => qrCode.id, {
        onDelete: "cascade"
      })
      .notNull(),
    instagramId: text("instagram_id").notNull()
  },
  (table) => ({
    qrCodeIdIndex: index("qr_instagram_qrcode_idx").on(table.qrCodeId)
  })
)

export const qrFacebook = pgTable(
  "qr_facebook",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    qrCodeId: text("qr_code_id")
      .references(() => qrCode.id, {
        onDelete: "cascade"
      })
      .notNull(),
    facebookUrl: text("facebook_url").notNull()
  },
  (table) => ({
    qrCodeIdIndex: index("qr_facebook_qrcode_idx").on(table.qrCodeId)
  })
)

export const qrYoutube = pgTable(
  "qr_youtube",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    qrCodeId: text("qr_code_id")
      .references(() => qrCode.id, {
        onDelete: "cascade"
      })
      .notNull(),
    youtubeUrl: text("youtube_url").notNull()
  },
  (table) => ({
    qrCodeIdIndex: index("qr_youtube_qrcode_idx").on(table.qrCodeId)
  })
)

export const qrGoogleDoc = pgTable(
  "qr_google_doc",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    qrCodeId: text("qr_code_id")
      .references(() => qrCode.id, {
        onDelete: "cascade"
      })
      .notNull(),
    googleDocUrl: text("google_doc_url").notNull()
  },
  (table) => ({
    qrCodeIdIndex: index("qr_google_doc_qrcode_idx").on(table.qrCodeId)
  })
)

export const qrVirtualCard = pgTable(
  "qr_virtual_card",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    qrCodeId: text("qr_code_id")
      .references(() => qrCode.id, {
        onDelete: "cascade"
      })
      .notNull(),

    templateId: text("template_id").notNull(),
    userName: text("user_name").unique().notNull(),

    // Profile Image
    profileImage: text("profile_image").notNull(),

    // Gallery Images
    images: text("images").array(),

    // Name Components
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    middleName: text("middle_name"),
    prefix: text("prefix"),
    suffix: text("suffix"),

    // Phone Numbers
    mobileNumber: text("mobile_number"),
    workNumber: text("work_number"),
    homeNumber: text("home_number"),
    whatsappNumber: text("whatsapp_number"),
    faxNumber: text("fax_number"),

    // Email addresses
    personalEmail: text("personal_email"),
    workEmail: text("work_email"),

    // Home Addresses
    homeStreet: text("home_street"),
    homeCity: text("home_city"),
    homeState: text("home_state"),
    homeZip: text("home_zip"),
    homeCountry: text("home_country"),

    // Work Addresses
    workStreet: text("work_street"),
    workCity: text("work_city"),
    workState: text("work_state"),
    workZip: text("work_zip"),
    workCountry: text("work_country"),

    // Website
    website: text("website"),

    // Professional Information
    company: text("company"),
    jobTitle: text("job_title"),
    department: text("department"),

    // Social accounts
    linkedin: text("linkedin"),
    twitter: text("twitter"),
    instagram: text("instagram"),
    facebook: text("facebook"),

    // Additional Information
    note: text("additional_information")
  },
  (table) => ({
    userNameIndex: uniqueIndex("qr_vcard_unique_idx").on(table.userName),
    qrCodeIdIndex: index("qr_vcard_qrcode_idx").on(table.qrCodeId)
  })
)
