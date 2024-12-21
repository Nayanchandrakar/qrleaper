"use client"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { VCardLabelCard } from "@/components/cards/pages/design/vcard/vcard-label-card"
import { useFormContext } from "react-hook-form"

interface PhoneNumberSectionProps {
  isExecuting: boolean
}

export const PhoneNumberSection = ({
  isExecuting,
}: PhoneNumberSectionProps) => {
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
      <VCardLabelCard>Phone Numbers</VCardLabelCard>
      <div className="flex items-center sm:flex-row flex-col gap-4 sm:gap-3 ">
        <FormField
          control={control}
          name="mobileNumber"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Your Mobile Number (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="workNumber"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Work Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Work Number (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex items-center sm:flex-row flex-col gap-4 sm:gap-3 ">
        <FormField
          control={control}
          name="whatsappNumber"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Whatsapp Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Your Whatsapp Number (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="faxNumber"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Fax Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Your Fax Number (optional)"
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
