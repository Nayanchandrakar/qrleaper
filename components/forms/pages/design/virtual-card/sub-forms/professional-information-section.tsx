"use client"

import { useFormContext } from "react-hook-form"

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface ProfessionalInformationSection {
  isExecuting?: boolean
}

export const ProfessionalInformationSection = ({
  isExecuting = false
}: ProfessionalInformationSection) => {
  const form = useFormContext()

  return (
    <AccordionItem className="border-b-0" value="professional-information">
      <AccordionTrigger className="rounded-lg bg-gray-100 px-2 text-gray-500 hover:no-underline">
        Professional Information
      </AccordionTrigger>
      <AccordionContent className="space-y-6 px-2 pt-4">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-3">
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

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-3">
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
      </AccordionContent>
    </AccordionItem>
  )
}
