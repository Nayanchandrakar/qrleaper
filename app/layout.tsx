import "@/style/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"

const font = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "QR Leaper",
  description: "Design your imaginations in QR codes.",
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
