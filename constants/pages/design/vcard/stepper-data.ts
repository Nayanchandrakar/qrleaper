import { QrCode, UserPen } from "lucide-react"

import { VcardCreateForm, VcardQrCodeDesign } from "@/components/dynamic"

export const stepperVcardData = [
  {
    id: 4373463456,
    Icon: UserPen,
    label: "Enter Information",
    index: 0,
    Component: VcardCreateForm,
    fields: [
      "profileImage",
      "images",
      "userName",
      "firstName",
      "lastName",
      "middleName",
      "prefix",
      "suffix",
      "mobileNumber",
      "workNumber",
      "homeNumber",
      "whatsappNumber",
      "faxNumber",
      "personalEmail",
      "workEmail",
      "homeStreet",
      "homeCity",
      "homeState",
      "homeZip",
      "homeCountry",
      "workStreet",
      "workCity",
      "workState",
      "workZip",
      "workCountry",
      "website",
      "company",
      "jobTitle",
      "department",
      "linkedin",
      "twitter",
      "instagram",
      "facebook",
      "note"
    ]
  },
  {
    id: 33456346346,
    Icon: QrCode,
    label: "Create QR Code",
    index: 1,
    Component: VcardQrCodeDesign,
    fields: [
      "title",
      "style.color",
      "style.bottomInput",
      "style.topInput",
      "style.shape",
      "style.hasFramee",
      "style.image"
    ]
  }
]
