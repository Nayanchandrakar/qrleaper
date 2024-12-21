"use client"

import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { VCardLabelCard } from "@/components/cards/pages/design/vcard/vcard-label-card"

interface WebsiteSectionProps {
  isExecuting: boolean
}

export const WebsiteSection = ({ isExecuting }: WebsiteSectionProps) => {
  const form = useFormContext()

  return (
    <div className="space-y-6">
      <VCardLabelCard>Website</VCardLabelCard>

      <FormField
        control={form.control}
        name="website"
        disabled={isExecuting}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Website</FormLabel>
            <FormControl>
              <Input
                type="url"
                placeholder="Your Website Url (optional)"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
