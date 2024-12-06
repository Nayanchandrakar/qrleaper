"use client"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { StepLabel } from "@/components/ui/step-label"

export const DesignForm = () => {
  return (
    <form className="">
      <StepLabel>
        <StepLabel.Counter>1</StepLabel.Counter>
        <StepLabel.Title>Complete the content</StepLabel.Title>
      </StepLabel>
    </form>
  )
}
