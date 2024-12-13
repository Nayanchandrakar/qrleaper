import { auth } from "@/lib/auth/auth"
import { redirect } from "next/navigation"
import { getSubscriptionByUserId } from "@/app/actions/utils"
import { Sidebar } from "@/components/sidebars/dashboard-sidebar/sidebar"
import { ShowQrCodePopup } from "@/components/popups/pages/dashboard/qr-codes/show-qr-code-popup/show-qr-code-popup"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await auth()

  if (!session?.user?.id) redirect("/login")

  const subscription = await getSubscriptionByUserId(session?.user.id!)

  return (
    <div className="size-full flex">
      <div className="fixed inset-0 z-[30] hidden h-full w-64 border-r bg-white p-4 md:flex">
        <Sidebar subscription={subscription!} />
      </div>

      <div className="size-full md:ml-64">
        {children}
        <ShowQrCodePopup />
      </div>
    </div>
  )
}

export default DashboardLayout
