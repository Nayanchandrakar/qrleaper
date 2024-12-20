import { z } from "zod"

import {
  max_profile_image_upload_size,
  max_vcard_image_upload_size,
} from "@/constants/qr/file"

import { createFileSchema } from "@/zod/utils/file-utils"
import { qrStyleSchema, qrTitleSchema } from "@/zod/utils"
import { profile_image_type } from "@/constants/qr/file-type"

export const virtualCardFormSchema = z.object({
  title: qrTitleSchema.shape.title,
  profileImage: createFileSchema(
    profile_image_type,
    max_profile_image_upload_size
  ),

  images: z
    .array(createFileSchema(profile_image_type, max_vcard_image_upload_size))
    .optional(),

  firstName: z.string().min(1, { message: "First name is required" }).max(20),
  lastName: z.string().min(1, { message: "Last name is required" }).max(20),
  middleName: z.string().max(10).optional(),
  prefix: z.string().max(7).optional(),
  suffix: z.string().max(7).optional(),
  mobileNumber: z.string().optional(),

  work: z.string().max(40).optional(),
  home: z.string().max(80).optional(),
  whatsapp: z.string().max(15).optional(),
  fax: z.string().max(15).optional(),

  personal: z.string().optional(),
  email_work: z.string().email({ message: "Invalid work email" }).optional(),

  home_street: z.string().max(30).optional(),
  home_city: z.string().max(30).optional(),
  home_state: z.string().max(40).optional(),
  home_zip: z.string().optional(),
  home_country: z.string().max(40).optional(),

  work_street: z.string().max(30).optional(),
  work_city: z.string().max(30).optional(),
  work_state: z.string().max(40).optional(),
  work_zip: z.string().optional(),
  work_country: z.string().max(40).optional(),

  website: z.string().url({ message: "Invalid URL" }).optional(),
  organization: z.string().max(50).optional(),
  job_title: z.string().max(40).optional(),
  department: z.string().max(50).optional(),

  linkedin: z.string().url({ message: "Invalid LinkedIn URL" }).optional(),
  twitter: z.string().url({ message: "Invalid Twitter URL" }).optional(),
  instagram: z.string().url({ message: "Invalid Instagram URL" }).optional(),
  facebook: z.string().url({ message: "Invalid Facebook URL" }).optional(),

  info: z.string().max(200).optional(),
  style: qrStyleSchema,
})

export type virtualCardFormSchemaType = z.infer<typeof virtualCardFormSchema>
