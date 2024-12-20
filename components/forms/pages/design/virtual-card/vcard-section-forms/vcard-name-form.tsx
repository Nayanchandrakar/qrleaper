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

interface VirtualCardNameFormProps {
  isExecuting: boolean
}

export const VirtualCardNameForm = ({
  isExecuting,
}: VirtualCardNameFormProps) => {
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
            <FormLabel>Title</FormLabel>
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

      <div className="flex items-center sm:flex-row flex-col gap-4 sm:gap-3 ">
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

        <FormField
          control={form.control}
          name="mobileNumber"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Your Phone Number (optional)"
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
          name="work"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Work</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Your Work (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="home"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Home</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Home (optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex items-center sm:flex-row flex-col gap-4 sm:gap-3 ">
        <FormField
          control={form.control}
          name="whatsapp"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Whatsapp</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Your Whatsapp Number (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fax"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Fax</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Your Fax Number (optional)"
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
          name="personal"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Personal</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Personal (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="work_email"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Work Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Your Work Email (optional)"
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
