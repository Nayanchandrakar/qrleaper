"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"

import { createQrCodeMessageAction } from "@/app/actions/pages/design/message/create-message-qr-code-action"
import { PreviewQrCard } from "@/components/cards/pages/design/preview-qr-card"
import { QrControls } from "@/components/forms/pages/design/qr-style/qr-controls"
import { QrStyleForm } from "@/components/forms/pages/design/qr-style/qr-style-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { StepLabel } from "@/components/ui/step-label"
import { Textarea } from "@/components/ui/textarea"
import { colorsList } from "@/constants/qr/colors"
import { useMessageFormPersist } from "@/hooks/forms/design/useMessageFormPersist"
import { useQrDataContext } from "@/hooks/qr/useQrDataContext"
import {
  messageFormSchema,
  type messageFormSchemaType
} from "@/zod/forms/message/message-form-schema"

export const MessageForm = () => {
  const router = useRouter()
  const { setData } = useQrDataContext()

  const { executeAsync, isExecuting } = useAction(createQrCodeMessageAction, {
    onSuccess: ({ data }) => {
      setData(data?.endpoint)
      form.reset()
      toast.success("Successfully created a QR Code")
      router.push("/dashboard/qr-codes")
    },
    onError: ({ error }) => {
      toast.error(error.serverError)
    }
  })

  const form = useForm<messageFormSchemaType>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      title: "",
      message: "",
      phoneNumber: "",
      style: {
        bottomInput: "",
        image: "",
        topInput: "",
        colors: [colorsList[0]],
        colorType: "linear",
        rotation: 0,
        hasFrame: false,
        shape: "square"
      }
    }
  })

  useMessageFormPersist(form)

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
            <QrControls isExecuting={isExecuting} />
          </div>
          <QrStyleForm />
        </div>
        <PreviewQrCard />
      </form>
    </FormProvider>
  )
}
