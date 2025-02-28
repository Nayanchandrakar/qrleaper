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
  instagramFormSchema,
  instagramFormSchemaType,
} from "@/zod/forms/instagram/instagram-form-schema"
import { createQrCodeInstagramAction } from "@/app/actions/pages/design/instagram/create-instagram-qr-code-action"
import { useInstagramPersist } from "@/hooks/forms/design/useInstagramPersist"

export const InstagramForm = () => {
  const router = useRouter()
  const { setData } = useQrDataContext()

  const { executeAsync, isExecuting } = useAction(createQrCodeInstagramAction, {
    onSuccess: ({ data }) => {
      setData(data?.endpoint!)
      form.reset()
      toast.success("Successfully created a QR Code")
      router.push("/dashboard/qr-codes")
    },
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
  })

  const form = useForm<instagramFormSchemaType>({
    resolver: zodResolver(instagramFormSchema),
    defaultValues: {
      title: "",
      instagram: "@",
      style: {
        bottomInput: "",
        image: "",
        topInput: "",
        colors: [colorsList[0]],
        colorType: "linear",
        rotation: 0,
        hasFrame: false,
        shape: "square",
      },
    },
  })

  useInstagramPersist(form)

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
              name="instagram"
              disabled={isExecuting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram Profile ID</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="@adson" {...field} />
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
