import { BadgePlus, CreditCard, Gem, QrCode, UserRoundPen } from "lucide-react"

export const userNavigationLinks = [
  {
    id: 345256,
    Icon: BadgePlus,
    label: "Create QR",
    href: "/",
  },
  {
    id: 34524,
    Icon: QrCode,
    label: "Your QR's",
    href: "/dashboard/qr-codes",
  },
  {
    id: 678734,
    Icon: UserRoundPen,
    label: "Profile",
    href: "/dashboard/user-profile",
  },
  { id: 46367345, Icon: Gem, label: "Pricing", href: "/pricing" },
  {
    id: 346346734,
    Icon: CreditCard,
    label: "Billing",
    href: "/dashboard/billing",
  },
]
