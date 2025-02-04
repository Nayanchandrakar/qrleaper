"use client"

import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Textarea } from "@/components/ui/textarea"

interface AdditionalInformationSectionProps {
  isExecuting?: boolean
}

export const AdditionalInformationSection = ({
  isExecuting = false,
}: AdditionalInformationSectionProps) => {
  const form = useFormContext()

  return (
    <AccordionItem className="border-b-0" value="additional-information">
      <AccordionTrigger className="px-2 rounded-lg  bg-gray-100 text-gray-500 hover:no-underline">
        Additional Information
      </AccordionTrigger>
      <AccordionContent className="pt-4 px-2 space-y-6">
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
      </AccordionContent>
    </AccordionItem>
  )
}
