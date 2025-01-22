"use client"

import { QrTitleForm } from "@/components/forms/global/qr-title-form"
import { PreviewQrCard } from "@/components/cards/pages/design/preview-qr-card"
import { QrStyleForm } from "@/components/forms/pages/design/qr-style/qr-style-form"

interface DesignComponentProps {
  isExecuting: boolean
}

export const DesignComponent = ({ isExecuting }: DesignComponentProps) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <QrTitleForm isExecuting={isExecuting} />
        <QrStyleForm />
      </div>

      <PreviewQrCard />
    </section>
  )
}
