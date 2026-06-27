import { KeyboardOff } from "lucide-react"

export const NullComponent = ({
  title,
  description
}: {
  title: string
  description: string
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="flex size-16 items-center justify-center rounded-lg border border-gray-200 bg-gray-50/70 backdrop-blur-sm">
        <KeyboardOff className="size-6" />
      </span>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="max-w-xs text-center text-sm font-normal text-gray-500">
        {description}
      </p>
    </div>
  )
}
