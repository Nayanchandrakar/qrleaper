import { cn } from "@/lib/utils"

interface ListComponentProps<T> {
  data: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
}

const ListComponent = <T,>({
  data,
  renderItem,
  className,
}: ListComponentProps<T>) => {
  return (
    <div className={cn(className)}>
      {data?.map((item, index) => renderItem(item, index))}
    </div>
  )
}

export { ListComponent }
