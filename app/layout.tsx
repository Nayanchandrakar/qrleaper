import "@/style/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SessionProvider, SessionProviderProps } from "next-auth/react"

import { Toaster } from "@/components/ui/sonner"
import { Navbar } from "@/components/navbar/navbar"
import { auth } from "@/lib/auth/auth"

const font = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "QR Leaper",
  description: "Design your imaginations in QR codes.",
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang="en">
      <SessionProvider>
        <body className={`${font.className} antialiased`}>
          <Navbar session={session} />
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  )
}
