import type { Session } from "next-auth"
import type QRCodeStyling from "qr-code-styling"

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
