import { cn } from "@/lib/utils"

interface ListComponentProps<T> {
  data: T[]
  renderItem: (item: T) => React.ReactNode
  className?: string
}

const ListComponent = <T,>({
  data,
  renderItem,
  className,
}: ListComponentProps<T>) => {
  return (
    <div className={cn(className)}>{data?.map((item) => renderItem(item))}</div>
  )
}

export { ListComponent }
