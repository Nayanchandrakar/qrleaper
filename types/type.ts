import type { Session } from "next-auth"
import type QRCodeStyling from "qr-code-styling"
import type { UseFormReturn } from "react-hook-form"
import type { FileExtension } from "qr-code-styling"
import type {
  qrCodeStyleType,
  qrCodeType,
  qrScanCountType,
} from "@/types/db-types"
import type { virtualCardFormSchemaType } from "@/zod/forms/vcard/virtual-card-form-schema"

export type SessionType = Session | null
export type qrCodeRefType = QRCodeStyling | null
export type FileExtensionTypeExtended = FileExtension | "pdf"
export type VcarStepperFieldNameType = keyof virtualCardFormSchemaType

export interface QrCodeProps {
  shape?: "square" | "circle"
  hasFrame?: boolean
  data?: string
  logo?: string
  topInput?: string
  bottomInput?: string
  colors: string[]
  colorType: colorType
  rotation: number
  qrCodeRef: React.MutableRefObject<qrCodeRefType>
}

type responseQrStyleType = {
  bottomInput: string
  image: string
  topInput: string
  hasFrame: boolean
  shape: string
  colors: string[]
  colorType: colorType
  rotation: number
}

export interface editQrLinkType {
  title: string
  link: string
  style: responseQrStyleType
}

export interface editQrFileType {
  title: string
  fileName: string
  style: responseQrStyleType
}

export interface editQrGoogleDocsType {
  title: string
  googleDocUrl: string
  style: responseQrStyleType
}
export interface editQrYoutubeType {
  title: string
  youtubeUrl: string
  style: responseQrStyleType
}

export interface editQrInstagramType {
  title: string
  instagram: string
  style: responseQrStyleType
}

export interface editQrFacebookType {
  title: string
  facebookUrl: string
  style: responseQrStyleType
}

export interface editQrMessageType {
  title: string
  message?: string
  phoneNumber: string
  style: responseQrStyleType
}

export interface editQrEmailType {
  title: string
  message?: string
  email: string
  subject?: string
  style: responseQrStyleType
}

export interface qrCardType {
  qr_code: qrCodeType
  qr_code_style: qrCodeStyleType | null
  qr_scan_count: qrScanCountType | null
}

export interface editQrVcardType {
  profileImage: File | string
  images: File[] | string[]

  id: string
  title: string
  firstName: string
  lastName: string
  middleName?: string
  prefix: string
  suffix: string

  // Phone Numbers
  mobileNumber: string
  workNumber: string
  homeNumber: string
  whatsappNumber: string
  faxNumber: string

  // Email addresses
  personalEmail: string
  workEmail: string

  // Home Addresses
  homeStreet: string
  homeCity: string
  homeState: string
  homeZip: string
  homeCountry: string

  // Work Addresses
  workStreet: string
  workCity: string
  workState: string
  workZip: string
  workCountry: string

  // Website
  website: string

  // Professional Information
  company: string
  jobTitle: string
  department: string

  // Social accounts
  linkedin: string
  twitter: string
  instagram: string
  facebook: string

  // Additional Information
  note: string

  style: responseQrStyleType
}

export interface userNameInputType {
  result: string
  currentUserName: string
}

export type formType = UseFormReturn<any, any, unknown>

export type geoDataType = {
  country: string
  count: number
}

export type colorType = qrCodeStyleType["colorType"]
export type colorSelectType = "gradient" | "single"
