import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "QR Leaper Dashboard",
  description: "Create Your Own Styles",
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return <div className="size-full">{children}</div>
}

export default DashboardLayout
