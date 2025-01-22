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
    <div className="space-y-6">
      <VCardLabelCard>Basic Information</VCardLabelCard>
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
    </div>
  )
}
