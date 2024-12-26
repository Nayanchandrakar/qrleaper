"use client"

import { toast } from "sonner"
import { useRouter } from "next/navigation"
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
import { colorsList } from "@/constants/qr/colors"
import { PreviewQrCard } from "@/components/cards/pages/design/preview-qr-card"
import { QrControls } from "@/components/forms/pages/design/qr-style/qr-controls"
import { useQrDataContext } from "@/hooks/qr/useQrDataContext"
import {
  googleDocsFormSchema,
  googleDocsFormSchemaType,
} from "@/zod/forms/google-docs/google-docs-form-schema"
import { createQrCodeGoogleDocsAction } from "@/app/actions/pages/design/google-docs/create-google-docs-qr-code-action"

export const GoogleDocsForm = () => {
  const router = useRouter()
  const { setData } = useQrDataContext()

  const { executeAsync, isExecuting } = useAction(
    createQrCodeGoogleDocsAction,
    {
      onSuccess: ({ data }) => {
        setData(data?.endpoint!)
        toast.success("Successfully created a QR Code")
        router.push("/dashboard/qr-codes")
      },
      onError: ({ error }) => {
        toast.error(error.serverError)
      },
    }
  )

  const form = useForm<googleDocsFormSchemaType>({
    resolver: zodResolver(googleDocsFormSchema),
    defaultValues: {
      title: "",
      googleDocUrl: "",
      style: {
        bottomInput: "",
        image: "",
        topInput: "",
        color: colorsList[0],
        hasFrame: false,
        shape: "square",
      },
    },
  })

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
              <StepLabel.Title>Complete the content</StepLabel.Title>
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

            <QrControls isExecuting={isExecuting} />
          </div>
          <QrStyleForm />
        </div>
        <PreviewQrCard />
      </form>
    </FormProvider>
  )
}
