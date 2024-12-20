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

interface VirtualCardJobDetailsFormProps {
  isExecuting: boolean
}

export const VirtualCardJobDetailsForm = ({
  isExecuting,
}: VirtualCardJobDetailsFormProps) => {
  const form = useFormContext()

  return (
    <div className="space-y-6">
      <VCardLabelCard>Organization Details</VCardLabelCard>

      <div className="flex items-center sm:flex-row flex-col gap-4 sm:gap-3 ">
        <FormField
          control={form.control}
          name="website"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Website Link</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="Your Website Link (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organization"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Organization</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Your Organization Name (optional)"
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
          name="job_title"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Your Job Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Your Job Title (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
