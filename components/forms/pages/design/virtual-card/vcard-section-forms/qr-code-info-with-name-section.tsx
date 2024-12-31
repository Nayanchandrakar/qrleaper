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
import { UserNameInputWithSuffix } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/username-input"

interface QrCodeInfoWithNameSectionProps {
  isExecuting: boolean
  isEditForm?: boolean
}

export const QrCodeInfoWithNameSection = ({
  isExecuting,
  isEditForm = false,
}: QrCodeInfoWithNameSectionProps) => {
  const form = useFormContext()

  return (
    <div className="space-y-6">
      <VCardLabelCard>Basic Information</VCardLabelCard>
      <FormField
        control={form.control}
        name="title"
        disabled={isExecuting}
        render={({ field }) => (
          <FormItem>
            <FormLabel>QR title</FormLabel>
            <FormControl>
              <Input type="text" placeholder="example:StarBucks" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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

      <UserNameInputWithSuffix
        isEditForm={isEditForm}
        isExecuting={isExecuting}
      />
    </div>
  )
}
