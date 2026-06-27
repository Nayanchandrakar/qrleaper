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
import { Textarea } from "@/components/ui/textarea"

import { UserNameInput } from "./username-input"

interface QrCodeInfoWithNameSectionProps {
  isExecuting?: boolean
  isEditForm?: boolean
}

export const QrCodeInfoWithNameSection = ({
  isExecuting = false,
  isEditForm = false
}: QrCodeInfoWithNameSectionProps) => {
  const form = useFormContext()

  return (
    <AccordionItem className="border-b-0" value="basic-information">
      <AccordionTrigger className="rounded-lg bg-gray-100 px-2 text-gray-500 hover:no-underline">
        Basic Information
      </AccordionTrigger>
      <AccordionContent className="space-y-6 px-2 pt-4">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-3">
          <FormField
            control={form.control}
            name="firstName"
            disabled={isExecuting}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Your First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            disabled={isExecuting}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Your Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-3">
          <FormField
            control={form.control}
            name="middleName"
            disabled={isExecuting}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your Middle Name (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prefix"
            disabled={isExecuting}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Prefix</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Any Prefix (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="suffix"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Suffix</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Your Suffix (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <UserNameInput isEditForm={isEditForm} isExecuting={isExecuting} />

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
