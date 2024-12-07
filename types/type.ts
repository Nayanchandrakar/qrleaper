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
