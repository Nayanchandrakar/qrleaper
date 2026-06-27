"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"

import { updateQrCodeGoogleDocsAction } from "@/app/actions/pages/edit/google-docs/update-qr-code-google-docs-action"
import { PreviewQrCard } from "@/components/cards/pages/design/preview-qr-card"
import { QrStyleForm } from "@/components/forms/pages/design/qr-style/qr-style-form"
import { QrEditControl } from "@/components/forms/pages/edit/design/qr-edit-controls"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { StepLabel } from "@/components/ui/step-label"
import { useQrDataContext } from "@/hooks/qr/useQrDataContext"
import type { editQrGoogleDocsType } from "@/types/type"
import {
  googleDocsEditFormSchema,
  type googleDocsEditFormSchemaType
} from "@/zod/pages/edit/google-docs/google-docs-edit-form-schema"

interface GoogleDocsEditFormProps {
  qrCode: editQrGoogleDocsType
  endpoint: string
}

export const GoogleDocsEditForm = ({
  qrCode,
  endpoint
}: GoogleDocsEditFormProps) => {
  const { setData } = useQrDataContext()

  const { executeAsync, isExecuting } = useAction(
    updateQrCodeGoogleDocsAction,
    {
      onSuccess: () => {
        toast.success("Successfully updated a QR Code")
      },
      onError: ({ error }) => {
        toast.error(error.serverError)
      }
    }
  )

  const form = useForm<googleDocsEditFormSchemaType>({
    resolver: zodResolver(googleDocsEditFormSchema),
    defaultValues: qrCode
  })

  useEffect(() => {
    if (endpoint) {
      setData(endpoint)
    }
  }, [endpoint, setData])

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(executeAsync)}
        className="grid grid-cols-1 gap-8 lg:grid-cols-2"
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
                  <FormLabel>QR title</FormLabel>
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
              name="googleDocUrl"
              disabled={isExecuting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Docs</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="docs.google.com"
                      {...field}
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
