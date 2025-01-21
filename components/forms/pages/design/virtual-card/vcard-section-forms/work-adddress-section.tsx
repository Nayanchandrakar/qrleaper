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

interface WorkAddressSectionProps {
  isExecuting?: boolean
}

export const WorkAddressSection = ({
  isExecuting = false,
}: WorkAddressSectionProps) => {
  const form = useFormContext()

  return (
    <div className="space-y-6">
      <VCardLabelCard>Work Address</VCardLabelCard>

      <div className="flex items-center sm:flex-row flex-col gap-4 sm:gap-3 ">
        <FormField
          control={form.control}
          name="workStreet"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Street Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Street Name (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workCity"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>City Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Your City Name (optional)"
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
          control={form.control}
          name="workState"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>State Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Your State Name (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workZip"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Your Zip Code (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div>
        <FormField
          control={form.control}
          name="workCountry"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Your Country Name (optional)"
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
