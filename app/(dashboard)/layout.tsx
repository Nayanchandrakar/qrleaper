import { redirect } from "next/navigation"
import { auth } from "@/lib/auth/auth"
import { Sidebar } from "@/components/sidebars/dashboard-sidebar/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await auth()

  if (!session?.user?.id) redirect("/login")

  return (
    <div className="size-full flex">
      <div className="fixed inset-0 z-[30] hidden h-full w-64 border-r bg-white p-4 md:flex">
        <Sidebar />
      </div>

      {/* Pages div  */}
      <div className="size-full md:ml-64">{children}</div>
    </div>
  )
}

export default DashboardLayout
