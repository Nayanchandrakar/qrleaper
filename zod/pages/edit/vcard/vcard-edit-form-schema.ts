import { z } from "zod"

import { idSchema } from "@/zod/utils"
import { virtualCardFormSchema } from "@/zod/forms/vcard/virtual-card-form-schema"
import { createFileSchema } from "@/zod/utils/file-utils"
import { profile_image_type } from "@/constants/qr/file-type"
import { max_profile_image_upload_size } from "@/constants/qr/file"

export const vCardEditFormSchema = virtualCardFormSchema
  .pick({
    // QR Code Title
    title: true,

    // Name Components
    firstName: true,
    lastName: true,
    middleName: true,
    prefix: true,
    suffix: true,

    // Phone Numbers
    mobileNumber: true,
    workNumber: true,
    homeNumber: true,
    whatsappNumber: true,
    faxNumber: true,

    // Email addresses
    personalEmail: true,
    workEmail: true,

    // Home Addresses
    homeStreet: true,
    homeCity: true,
    homeState: true,
    homeZip: true,
    homeCountry: true,

    // Work Addresses
    workStreet: true,
    workCity: true,
    workState: true,
    workZip: true,
    workCountry: true,

    // Website
    website: true,

    // Professional Information
    company: true,
    jobTitle: true,
    department: true,

    // Social accounts
    linkedin: true,
    twitter: true,
    instagram: true,
    facebook: true,

    // Additional Information
    note: true,

    // QR Code Style
    style: true,
  })
  .extend({
    id: idSchema.shape.id,
    profileImage: z.union([
      createFileSchema(profile_image_type, max_profile_image_upload_size),
      z.string().min(5).max(100).optional().or(z.literal("")),
    ]),
  })

export type vCardEditFormSchemaType = z.infer<typeof vCardEditFormSchema>
