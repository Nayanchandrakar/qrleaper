import { ListComponent } from "@/components/global/list-component"
import { Skeleton } from "@/components/ui/skeleton"

export const DesignEditPageSkeleton = () => {
  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
      {/* form section  */}
      <div>
        <ListComponent
          className="flex flex-col gap-8"
          data={Array.from({ length: 2 })}
          renderItem={(_, index) => (
            <div key={index + 4} className="space-y-3">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-9 w-full" />
            </div>
          )}
        />

        <Skeleton className="mt-7 h-9 w-full max-w-[8rem]" />

        <div className="flex flex-wrap gap-3">
          <ListComponent
            className="mt-8 flex w-full gap-2"
            data={Array.from({ length: 4 })}
            renderItem={(_, index) => (
              <Skeleton key={index + 2} className="h-9 w-full max-w-[6rem]" />
            )}
          />
          <Skeleton className="mt-3 h-28 w-full" />
        </div>
      </div>

      {/* qr preview section  */}
      <Skeleton className="min-h-64 w-full lg:min-h-full" />
    </section>
  )
}
