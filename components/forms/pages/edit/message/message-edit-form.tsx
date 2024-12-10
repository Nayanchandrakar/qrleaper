"use client"

import { toast } from "sonner"
import { useEffect } from "react"
import { useAction } from "next-safe-action/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { StepLabel } from "@/components/ui/step-label"
import { useQrDataContext } from "@/hooks/qr/useQrDataContext"
import { QrStyleForm } from "@/components/forms/pages/design/qr-style/qr-style-form"
import { PreviewQrCard } from "@/components/cards/pages/design/preview-qr-card"
import { QrEditControl } from "@/components/forms/pages/edit/design/qr-edit-controls"
import { updateQrCodeMessageAction } from "@/app/actions/pages/edit/message/update-message-qr-code-action"
import type { editQrMessageType } from "@/types/type"
import { Textarea } from "@/components/ui/textarea"
import {
  messageFormSchema,
  messageFormSchemaType,
} from "@/zod/forms/message/message-form-schema"

interface MessageEditFormProps {
  qrCode: editQrMessageType
  endpoint: string
  id: string
}

export const MessageEditForm = ({
  qrCode,
  endpoint,
  id,
}: MessageEditFormProps) => {
  const { setData } = useQrDataContext()

  const { executeAsync, isExecuting } = useAction(updateQrCodeMessageAction, {
    onSuccess: () => {
      toast.success("Successfully updated a QR Code")
    },
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
  })

  const form = useForm<messageFormSchemaType>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: qrCode,
  })

  useEffect(() => {
    if (endpoint) {
      setData(endpoint)
    }
  }, [endpoint])

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((formData: messageFormSchemaType) =>
          executeAsync({ ...formData, id })
        )}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* main form  */}
        <div>
          <div className="space-y-4">
            <StepLabel className="mt-3">
              <StepLabel.Counter>1</StepLabel.Counter>
              <StepLabel.Title>Edit the content</StepLabel.Title>
            </StepLabel>

            <FormField
              control={form.control}
              name="title"
              disabled={isExecuting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="example:StarBucks"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              disabled={isExecuting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="(5555) 5555-5555"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              disabled={isExecuting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your text message here (optional)"
                      {...field}
                      maxLength={256}
                      className="h-32"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <QrEditControl
              isExecuting={isExecuting}
              isEditable={
                JSON.stringify(form.getValues()) === JSON.stringify(qrCode)
              }
            />
          </div>
          <QrStyleForm />
        </div>
        <PreviewQrCard />
      </form>
    </FormProvider>
  )
}
