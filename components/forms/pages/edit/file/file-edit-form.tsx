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
import type { editQrFileType } from "@/types/type"
import { FileUploadForm } from "@/components/forms/pages/design/file/file-upload-form"
import { updateQrCodeFileAction } from "@/app/actions/pages/edit/file/update-qr-code-file-action"
import {
  fileEditFormSchema,
  type fileEditFormSchemaType,
} from "@/zod/pages/edit/file/file-edit-form-schema"

interface FileEditFormProps {
  qrCode: editQrFileType
  endpoint: string
}

export const FileEditForm = ({ qrCode, endpoint }: FileEditFormProps) => {
  const { setData } = useQrDataContext()

  const { executeAsync, isExecuting } = useAction(updateQrCodeFileAction, {
    onSuccess: () => {
      toast.success("Successfully updated a QR Code")
    },
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
  })

  const form = useForm<fileEditFormSchemaType>({
    resolver: zodResolver(fileEditFormSchema),
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

            <FileUploadForm />

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
