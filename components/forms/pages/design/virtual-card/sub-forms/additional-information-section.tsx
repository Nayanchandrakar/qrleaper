"use client"

import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { VCardLabelCard } from "@/components/cards/pages/design/vcard/vcard-label-card"

interface AdditionalInformationSectionProps {
  isExecuting?: boolean
}

export const AdditionalInformationSection = ({
  isExecuting = false,
}: AdditionalInformationSectionProps) => {
  const form = useFormContext()

  return (
    <div className="space-y-6">
      <VCardLabelCard>Additional Information</VCardLabelCard>
      <FormField
        control={form.control}
        name="note"
        disabled={isExecuting}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Additional Information</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Any Additional Information (optional)"
                {...field}
                rows={6}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
