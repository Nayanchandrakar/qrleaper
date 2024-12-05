import { Skeleton } from "@/components/ui/skeleton"

export const ProfileEditCardSkeleton = () => {
  return (
    <div className="rounded-lg border border-gray-200">
      <div className="pt-5 px-5 sm:pt-10 sm:px-10">
        <div className="flex flex-col space-y-3 ">
          <Skeleton className="w-48 h-8" />
          <Skeleton className="w-64 h-6" />
        </div>

        <div className="my-6">
          <Skeleton className="h-[4rem] w-full" />
        </div>
      </div>

      <div className="border-t border-gray-200 flex items-center gap-2 justify-end bg-gray-50 py-4 px-5 sm:px-10">
        <Skeleton className="h-9 px-4 py-2 w-36" />
      </div>
    </div>
  )
}
