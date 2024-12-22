import type { Session } from "next-auth"
import type QRCodeStyling from "qr-code-styling"
import type { qrCodeStyleType, qrCodeType, qrScanCountType } from "./db-types"

export type SessionType = Session | null
export type qrCodeRefType = QRCodeStyling | null

export interface QrCodeProps {
  shape?: "square" | "circle"
  color?: string
  hasFrame?: boolean
  data?: string
  logo?: string
  topInput?: string
  bottomInput?: string
  qrCodeRef: React.MutableRefObject<qrCodeRefType>
}

type responseQrStyleType = {
  bottomInput: string
  image: string
  topInput: string
  color: string
  hasFrame: boolean
  shape: string
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
  id: string
  profileImage: string
  title: string
  firstName: string
  lastName: string
  middleName?: string | null
  prefix?: string | null
  suffix?: string | null

  // Phone Numbers
  mobileNumber?: string | null
  workNumber?: string | null
  homeNumber?: string | null
  whatsappNumber?: string | null
  faxNumber?: string | null

  // Email addresses
  personalEmail?: string | null
  workEmail?: string | null

  // Home Addresses
  homeStreet?: string | null
  homeCity?: string | null
  homeState?: string | null
  homeZip?: string | null
  homeCountry?: string | null

  // Work Addresses
  workStreet?: string | null
  workCity?: string | null
  workState?: string | null
  workZip?: string | null
  workCountry?: string | null

  // Website
  website?: string | null

  // Professional Information
  company?: string | null
  jobTitle?: string | null
  department?: string | null

  // Social accounts
  linkedin?: string | null
  twitter?: string | null
  instagram?: string | null
  facebook?: string | null

  // Additional Information
  note?: string | null

  style: responseQrStyleType
}
