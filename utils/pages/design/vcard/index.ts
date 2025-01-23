import { templateCarouselData } from "@/constants/pages/design/vcard/template-carousel-data"

export const getTemplateComponent = (templateId: string) => {
  return (
    templateCarouselData?.find((e) => e.templateId === templateId)
      ?.Component! || templateCarouselData[0]?.Component
  )
}
