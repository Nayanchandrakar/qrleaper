"use client"

import { ListComponent } from "@/components/global/list-component"
import { qrStyleNavigationData } from "@/constants/pages/design/qr-style-navigation"
import {
  type stepTypes,
  useQrStyleContext
} from "@/hooks/pages/design/useQrStyleContext"
import { cn } from "@/lib/utils"

export const QrStyleNav = () => {
  const { step, setStep } = useQrStyleContext((state) => ({
    step: state.step,
    setStep: state.setStep
  }))

  return (
    <ListComponent
      data={qrStyleNavigationData}
      className="flex items-center gap-1 border-b pb-2 sm:gap-2"
      renderItem={({ label, value, id }) => (
        <button
          key={id}
          type="button"
          onClick={() => setStep(value as stepTypes)}
          className={cn(
            "cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 transition-colors duration-200 hover:bg-gray-100 sm:px-4",
            value === step && "bg-gray-100"
          )}
        >
          {label}
        </button>
      )}
    />
  )
}
