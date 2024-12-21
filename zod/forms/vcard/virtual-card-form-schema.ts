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
  firstName: z.string().min(1, { message: "First name is required" }).max(20),
  lastName: z.string().min(1, { message: "Last name is required" }).max(20),
  middleName: z.string().max(10).optional(),
  prefix: z.string().max(7).optional(),
  suffix: z.string().max(7).optional(),

  // Phone Numbers
  mobileNumber: z.string().optional(),
  workNumber: z.string().max(40).optional(),
  homeNumber: z.string().max(80).optional(),
  whatsappNumber: z.string().max(15).optional(),
  faxNumber: z.string().max(15).optional(),

  // Email addresses
  personalEmail: z
    .string()
    .email({ message: "Invalid personal email" })
    .optional(),
  workEmail: z.string().email({ message: "Invalid work email" }).optional(),

  // Home Addresses
  homeStreet: z.string().max(30).optional(),
  homeCity: z.string().max(30).optional(),
  homeState: z.string().max(40).optional(),
  homeZip: z.string().optional(),
  homeCountry: z.string().max(40).optional(),

  // Work Addresses
  workStreet: z.string().max(30).optional(),
  workCity: z.string().max(30).optional(),
  workState: z.string().max(40).optional(),
  workZip: z.string().optional(),
  workCountry: z.string().max(40).optional(),

  // Website
  website: z.string().url({ message: "Invalid URL" }).optional(),

  // Professional Information
  company: z.string().max(50).optional(),
  jobTitle: z.string().max(40).optional(),
  department: z.string().max(50).optional(),

  // Social accounts
  linkedin: z.string().url({ message: "Invalid LinkedIn URL" }).optional(),
  twitter: z.string().url({ message: "Invalid Twitter URL" }).optional(),
  instagram: z.string().url({ message: "Invalid Instagram URL" }).optional(),
  facebook: z.string().url({ message: "Invalid Facebook URL" }).optional(),

  // Additional Information
  note: z.string().max(200).optional(),

  // QR Code Style
  style: qrStyleSchema,
})

export type virtualCardFormSchemaType = z.infer<typeof virtualCardFormSchema>
