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

interface ProfessionalInformationSection {
  isExecuting?: boolean
}

export const ProfessionalInformationSection = ({
  isExecuting = false,
}: ProfessionalInformationSection) => {
  const form = useFormContext()

  return (
    <div className="space-y-6">
      <VCardLabelCard>Professional Information</VCardLabelCard>

      <div className="flex items-center sm:flex-row flex-col gap-4 sm:gap-3 ">
        <FormField
          control={form.control}
          name="company"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Organization/Company</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Your Company/Organization Name (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jobTitle"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Job Title/Position</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Job Title/Position (optional)"
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
          name="department"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Department Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Your Department Name (optional)"
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
