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
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface WebsiteSectionProps {
  isExecuting?: boolean
}

export const WebsiteSection = ({
  isExecuting = false,
}: WebsiteSectionProps) => {
  const form = useFormContext()

  return (
    <AccordionItem className="border-b-0" value="website-section">
      <AccordionTrigger className="px-2 rounded-lg  bg-gray-100 text-gray-500 hover:no-underline">
        Website
      </AccordionTrigger>
      <AccordionContent className="pt-4 px-2 space-y-6">
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
      </AccordionContent>
    </AccordionItem>
  )
}
