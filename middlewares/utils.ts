import type { NextURL } from "next/dist/server/web/next-url"
import { NextRequest, NextResponse } from "next/server"

import type { qrType } from "@/types/db-types"

export const redirectTo = (nextURL: NextRequest["nextUrl"], path?: string) => {
  return NextResponse.redirect(new URL(path ?? "/design", nextURL))
}

export const handleFinalRedirect = (
  nexturl: NextURL,
  path: string,
  qrType: qrType
) => {
  if (["email", "message"].includes(qrType)) {
    return new Response(
      `<meta http-equiv="refresh" content="0; url=${path}" />`,
      {
        headers: { "Content-Type": "text/html" }
      }
    )
  }

  return redirectTo(nexturl, path)
}
