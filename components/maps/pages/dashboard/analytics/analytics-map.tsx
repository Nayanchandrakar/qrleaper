"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card"
import { MapClient } from "@/components/dynamic"

export const AnalyticsMap = () => {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Scans by Countries</CardTitle>
          <CardDescription>See your total scan counts</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <MapClient position={[51.505, -0.09]} />
      </CardContent>
    </Card>
  )
}
