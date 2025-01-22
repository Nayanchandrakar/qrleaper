"use client"

import { useFormContext } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { StepLabel } from "@/components/ui/step-label"
import { PreviewQrCard } from "@/components/cards/pages/design/preview-qr-card"
import { QrStyleForm } from "@/components/forms/pages/design/qr-style/qr-style-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

interface VcardQrCodeDesignProps {
  isExecuting: boolean
}

// Dynamic Component

export default ({ isExecuting }: VcardQrCodeDesignProps) => {
  const form = useFormContext()

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <div className="flex flex-col gap-4">
          <StepLabel className="mt-3">
            <StepLabel.Counter>1</StepLabel.Counter>
            <StepLabel.Title>Complete the content</StepLabel.Title>
          </StepLabel>

          <FormField
            control={form.control}
            name="title"
            disabled={isExecuting}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>QR title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="example:StarBucks"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <QrStyleForm />
      </div>

      <PreviewQrCard />
    </section>
  )
}
