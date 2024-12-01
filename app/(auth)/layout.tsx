import MaskBackground from "@/components/layouts/mask-background"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="size-full">
      <MaskBackground />
      <div className="flex relative min-h-screen justify-center items-center">
        <img
          src="/logo.svg"
          alt="logo"
          className="absolute w-32 h-fit left-4 top-[-20px] z-10"
        />
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
