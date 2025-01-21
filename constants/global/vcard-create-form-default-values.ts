import { colorsList } from "@/constants/qr/colors"
import { templateCarouselData } from "@/constants/pages/design/vcard/template-carousel-data"

export const vcardCreateDefaultValues = {
  title: "",
  firstName: "",
  lastName: "",
  templateId: templateCarouselData[0].templateId,
  style: {
    bottomInput: "",
    image: "",
    topInput: "",
    color: colorsList[0],
    hasFrame: false,
    shape: "square",
  },
}
