"use client"
import { CloudUpload, Loader } from "lucide-react"

interface UploadthingProps {
  isExecuting: boolean
  fileName: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  footerText: string
  accept: string
  htmlFor: string
}

export const Uploadthing = ({
  fileName,
  footerText,
  isExecuting,
  onChange,
  accept,
  htmlFor
}: UploadthingProps) => {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="h-50 flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-12 transition-colors duration-200 hover:bg-gray-100"
      >
        <input
          name="file"
          id={htmlFor}
          type="file"
          hidden
          accept={accept}
          onChange={onChange}
          disabled={isExecuting}
        />

        {isExecuting ? (
          <Loader className="size-6 animate-spin text-gray-600" />
        ) : (
          <CloudUpload className="size-8 stroke-gray-500" />
        )}
        <p className="text-sm font-semibold text-gray-900 transition-colors duration-200 hover:text-green-600">
          {isExecuting ? "Uploading..." : fileName || "Click to upload a file"}
        </p>
        {!isExecuting && <p className="text-xs font-medium">Allowed content</p>}
      </label>
      <p className="mt-2 text-xs font-medium text-gray-500">{footerText}</p>
    </div>
  )
}
