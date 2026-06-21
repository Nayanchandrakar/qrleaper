import { ColorForm } from "@/components/forms/pages/design/qr-style/color-form"
import { FrameForm } from "@/components/forms/pages/design/qr-style/frame-form"
import { LogoForm } from "@/components/forms/pages/design/qr-style/logo-form"
import { ShapeForm } from "@/components/forms/pages/design/qr-style/shape-form"

export const qrStyleNavigationData = [
  {
    id: 45745745,
    label: "Color",
    value: "color",
    form: ColorForm
  },
  {
    id: 5734245,
    label: "Shape",
    value: "shape",
    form: ShapeForm
  },
  {
    id: 56454,
    label: "Frame",
    value: "frame",
    form: FrameForm
  },
  {
    id: 34637,
    label: "Logo",
    value: "logo",
    form: LogoForm
  }
]
