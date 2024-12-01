import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/style/globals.css"

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
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  )
}
