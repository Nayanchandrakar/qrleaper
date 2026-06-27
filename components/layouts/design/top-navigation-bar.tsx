"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { ListComponent } from "@/components/global/list-component"
import { topNavigationData } from "@/constants/pages/design/top-navigation"
import { cn } from "@/lib/utils"

const TopNavigationBar = () => {
  const pathname = usePathname()

  const currentTab = (endpoint: string) => {
    if (endpoint === pathname) {
      return "bg-zinc-200/60"
    }
  }

  return (
    <div className="rounded-lg bg-white p-3">
      <ListComponent
        className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8"
        data={topNavigationData}
        renderItem={({ Icon, endpoint, id, label }) => (
          <Link
            key={id}
            href={endpoint}
            className={cn(
              "flex w-full items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 px-5 py-2 text-sm font-medium text-zinc-800 transition-colors duration-200 hover:bg-zinc-200/60",
              currentTab(endpoint)
            )}
          >
            <Icon className="mr-2 size-4" />
            {label}
          </Link>
        )}
      />
    </div>
  )
}

export { TopNavigationBar }
