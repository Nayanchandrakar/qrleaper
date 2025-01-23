import { ListComponent } from "@/components/global/list-component"
import { Skeleton } from "@/components/ui/skeleton"

export const DesignEditPageSkeleton = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {/* form section  */}
      <div>
        <ListComponent
          className="flex flex-col gap-8"
          data={Array.from({ length: 2 })}
          renderItem={(_, index) => (
            <div key={index + 4} className="space-y-3">
              <Skeleton className="w-28 h-5" />
              <Skeleton className="w-full h-9" />
            </div>
          )}
        />

        <Skeleton className="w-full h-9 max-w-[8rem] mt-7" />

        <div className="flex flex-wrap gap-3">
          <ListComponent
            className="flex gap-2 mt-8 w-full"
            data={Array.from({ length: 4 })}
            renderItem={(_, index) => (
              <Skeleton key={index + 2} className="w-full h-9 max-w-[6rem] " />
            )}
          />
          <Skeleton className="h-28 w-full mt-3" />
        </div>
      </div>

      {/* qr preview section  */}
      <Skeleton className="w-full min-h-64 lg:min-h-full" />
    </section>
  )
}
