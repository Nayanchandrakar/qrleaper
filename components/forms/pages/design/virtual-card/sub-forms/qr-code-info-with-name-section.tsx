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
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Input } from "@/components/ui/input"
import { UserNameInput } from "./username-input"

interface QrCodeInfoWithNameSectionProps {
  isExecuting?: boolean
  isEditForm?: boolean
}

export const QrCodeInfoWithNameSection = ({
  isExecuting = false,
  isEditForm = false,
}: QrCodeInfoWithNameSectionProps) => {
  const form = useFormContext()

  return (
    <AccordionItem className="border-b-0" value="basic-information">
      <AccordionTrigger className="px-2 rounded-lg  bg-gray-100 text-gray-500 hover:no-underline">
        Basic Information
      </AccordionTrigger>
      <AccordionContent className="pt-4 px-2 space-y-6">
        <div className="flex items-center sm:flex-row flex-col gap-4 sm:gap-3 ">
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

        <div className="flex items-center sm:flex-row flex-col gap-4 sm:gap-3 ">
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
      </AccordionContent>
    </AccordionItem>
  )
}
