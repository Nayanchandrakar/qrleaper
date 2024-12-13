import { NextResponse } from "next/server"
import type { NextURL } from "next/dist/server/web/next-url"

export const redirectTo = (nextURL: NextURL, path?: string) => {
  return NextResponse.redirect(new URL(path ?? "/design", nextURL))
}
