import { ColorForm } from "@/components/forms/pages/design/qr-style/color-form/color-form"
import { FrameForm } from "@/components/forms/pages/design/qr-style/frame-form"
import { LogoForm } from "@/components/forms/pages/design/qr-style/logo-form"
import { ShapeForm } from "@/components/forms/pages/design/qr-style/shape-form"

export const qrStyleNavigationData = [
  {
    id: 34235,
    label: "Color",
    value: "color",
    form: ColorForm,
  },
  {
    id: 346346,
    label: "Shape",
    value: "shape",
    form: ShapeForm,
  },
  {
    id: 34235,
    label: "Frame",
    value: "frame",
    form: FrameForm,
  },
  {
    id: 34235,
    label: "Logo",
    value: "logo",
    form: LogoForm,
  },
]
