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
import { QrStyleForm } from "@/components/forms/pages/design/qr-style/qr-style-form"
import { PreviewQrCard } from "@/components/cards/pages/design/preview-qr-card"
import { useQrDataContext } from "@/hooks/qr/useQrDataContext"
import { QrEditControl } from "@/components/forms/pages/edit/design/qr-edit-controls"
import type { editQrFacebookType } from "@/types/type"
import {
  facebookEditFormSchema,
  type facebookEditFormSchemaType,
} from "@/zod/pages/edit/facebook/facebook-edit-form-schema"
import { updateQrCodeFacebookAction } from "@/app/actions/pages/edit/facebook/update-qr-code-facebook-action"

interface FacebookEditFormProps {
  qrCode: editQrFacebookType
  endpoint: string
}

export const FacebookEditForm = ({
  qrCode,
  endpoint,
}: FacebookEditFormProps) => {
  const { setData } = useQrDataContext()

  const { executeAsync, isExecuting } = useAction(updateQrCodeFacebookAction, {
    onSuccess: () => {
      toast.success("Successfully updated a QR Code")
    },
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
  })

  const form = useForm<facebookEditFormSchemaType>({
    resolver: zodResolver(facebookEditFormSchema),
    defaultValues: qrCode,
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
              name="facebookUrl"
              disabled={isExecuting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://facebook.com/adson"
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
