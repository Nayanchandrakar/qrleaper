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

import { Input } from "@/components/ui/input"

interface AddressSectionProps {
  isExecuting?: boolean
}

export const AddressSection = ({
  isExecuting = false,
}: AddressSectionProps) => {
  const form = useFormContext()

  return (
    <AccordionItem className="border-b-0" value="address-section">
      <AccordionTrigger className="px-2 rounded-lg  bg-gray-100 text-gray-500 hover:no-underline">
        Phone Numbers
      </AccordionTrigger>
      <AccordionContent className="pt-4 px-2 space-y-6">
        <div className="flex items-center sm:flex-row flex-col gap-4 sm:gap-3 ">
          <FormField
            control={form.control}
            name="homeStreet"
            disabled={isExecuting}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Street Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Street Name (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="homeCity"
            disabled={isExecuting}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>City Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your City Name (optional)"
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
            name="homeState"
            disabled={isExecuting}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>State Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your State Name (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="homeZip"
            disabled={isExecuting}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your Zip Code (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="homeCountry"
            disabled={isExecuting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your Country Name (optional)"
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
