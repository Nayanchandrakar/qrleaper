"use client"
import { useFormContext } from "react-hook-form"

import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { StepLabel } from "@/components/ui/step-label"

interface QrTitleFormProps {
  isExecuting: boolean
}

export const QrTitleForm = ({ isExecuting }: QrTitleFormProps) => {
  const form = useFormContext()

  return (
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
              <Input type="text" placeholder="example:StarBucks" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
