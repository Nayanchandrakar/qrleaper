import { z } from "zod"

import {
  max_profile_image_upload_size,
  max_vcard_image_upload_size,
} from "@/constants/qr/file"

import { createFileSchema } from "@/zod/utils/file-utils"
import { qrStyleSchema, qrTitleSchema } from "@/zod/utils"
import { profile_image_type } from "@/constants/qr/file-type"

export const virtualCardFormSchema = z.object({
  // QR Code Title
  title: qrTitleSchema.shape.title,

  // Profile Image
  profileImage: createFileSchema(
    profile_image_type,
    max_profile_image_upload_size
  ),

  // Gallery Images
  images: z
    .array(createFileSchema(profile_image_type, max_vcard_image_upload_size))
    .optional(),

  // Name Components
  userName: z.string().min(3).max(32),
  firstName: z
    .string()
    .min(1, { message: "Please enter your first name to continue." })
    .max(20),
  lastName: z
    .string()
    .min(1, { message: "Please enter your last name to continue." })
    .max(20),
  middleName: z.string().max(10).optional().or(z.literal("")),
  prefix: z.string().max(10).optional().or(z.literal("")),
  suffix: z.string().max(10).optional().or(z.literal("")),

  // Phone Numbers
  mobileNumber: z.string().optional().or(z.literal("")),
  workNumber: z.string().max(40).optional().or(z.literal("")),
  homeNumber: z.string().max(80).optional().or(z.literal("")),
  whatsappNumber: z.string().max(15).optional().or(z.literal("")),
  faxNumber: z.string().max(15).optional().or(z.literal("")),

  // Email addresses
  personalEmail: z
    .string()
    .email({ message: "Invalid personal email" })
    .optional()
    .or(z.literal("")),
  workEmail: z
    .string()
    .email({ message: "Invalid work email" })
    .optional()
    .or(z.literal("")),

  // Home Addresses
  homeStreet: z.string().max(30).optional().or(z.literal("")),
  homeCity: z.string().max(30).optional(),
  homeState: z.string().max(40).optional().or(z.literal("")),
  homeZip: z.string().optional().or(z.literal("")),
  homeCountry: z.string().max(40).optional().or(z.literal("")),

  // Work Addresses
  workStreet: z.string().max(30).optional().or(z.literal("")),
  workCity: z.string().max(30).optional().or(z.literal("")),
  workState: z.string().max(40).optional().or(z.literal("")),
  workZip: z.string().optional().or(z.literal("")),
  workCountry: z.string().max(40).optional().or(z.literal("")),

  // Website
  website: z
    .string(z.literal(""))
    .url({ message: "Invalid URL" })
    .optional()
    .or(z.literal("")),

  // Professional Information
  company: z.string().max(50).optional().or(z.literal("")),
  jobTitle: z.string().max(40).optional().or(z.literal("")),
  department: z.string().max(50).optional().or(z.literal("")),

  // Social accounts
  linkedin: z
    .string()
    .url({ message: "Invalid LinkedIn URL" })
    .optional()
    .or(z.literal("")),
  twitter: z
    .string()
    .url({ message: "Invalid Twitter URL" })
    .optional()
    .or(z.literal("")),
  instagram: z
    .string()
    .url({ message: "Invalid Instagram URL" })
    .optional()
    .or(z.literal("")),
  facebook: z
    .string()
    .url({ message: "Invalid Facebook URL" })
    .optional()
    .or(z.literal("")),

  // Additional Information
  note: z.string().max(200).optional().or(z.literal("")),

  // QR Code Style
  style: qrStyleSchema,
})

export type virtualCardFormSchemaType = z.infer<typeof virtualCardFormSchema>
