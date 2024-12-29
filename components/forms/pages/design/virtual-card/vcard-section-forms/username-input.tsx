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

interface UserNameInputProps {
  isExecuting: boolean
}
export const UserNameInput = ({ isExecuting }: UserNameInputProps) => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name="username"
      disabled={isExecuting}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>UserName</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Your Unique User Name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
