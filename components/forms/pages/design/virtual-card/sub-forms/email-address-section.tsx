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

interface EmailAddressSectionProps {
  isExecuting?: boolean
}

export const EmailAddressSection = ({
  isExecuting = false,
}: EmailAddressSectionProps) => {
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
      <VCardLabelCard>Email Addresses</VCardLabelCard>
      <div className="flex items-center sm:flex-row flex-col gap-4 sm:gap-3 ">
        <FormField
          control={control}
          name="personalEmail"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Personal Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Personal Email address (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="workEmail"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Work Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Your Work Email (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
