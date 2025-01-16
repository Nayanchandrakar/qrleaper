"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "../ui/skeleton"

export const MapClient = dynamic(() => import("@/components/global/map"), {
  ssr: false,
  loading: () => <Skeleton className="w-full rounded-lg h-[30rem]" />,
})
