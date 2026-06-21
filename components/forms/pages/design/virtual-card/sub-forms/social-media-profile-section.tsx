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

interface SocialMediaProfileSectionProps {
  isExecuting?: boolean
}

export const SocialMediaProfileSection = ({
  isExecuting = false
}: SocialMediaProfileSectionProps) => {
  const form = useFormContext()

  return (
    <AccordionItem className="border-b-0" value="social-media-profile">
      <AccordionTrigger className="rounded-lg bg-gray-100 px-2 text-gray-500 hover:no-underline">
        Social Media Profiles
      </AccordionTrigger>
      <AccordionContent className="space-y-6 px-2 pt-4">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-3">
          <FormField
            control={form.control}
            name="linkedin"
            disabled={isExecuting}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Linkedin</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="Your Linkedin Url (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="twitter"
            disabled={isExecuting}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Twitter (x.com)</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="Your Twitter Url (optional)"
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
            name="instagram"
            disabled={isExecuting}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="Your Instagram Url (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="facebook"
            disabled={isExecuting}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="Your Facebook Url (optional)"
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
