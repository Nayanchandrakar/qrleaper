import {
  BadgePlus,
  CreditCard,
  FileText,
  Gem,
  QrCode,
  UserRoundPen
} from "lucide-react"

export const userAuthRoutes = [
  {
    id: 34524,
    Icon: QrCode,
    label: "Your QR's",
    href: "/dashboard/qr-codes"
  },
  {
    id: 678734,
    Icon: UserRoundPen,
    label: "Profile",
    href: "/dashboard/user-profile"
  },
  {
    id: 346346734,
    Icon: CreditCard,
    label: "Billing",
    href: "/dashboard/billing"
  }
]

export const userPublicRoutes = [
  {
    id: 345256,
    Icon: BadgePlus,
    label: "Create QR",
    href: "/design"
  },
  {
    id: 324525,
    Icon: FileText,
    label: "Solutions",
    href: "/solutions"
  },

  { id: 46367345, Icon: Gem, label: "Pricing", href: "/pricing" }
]
