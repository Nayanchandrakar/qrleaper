import { Container } from "@/components/global/container"

interface EditLayoutProps {
  children: React.ReactNode
}

const EditLayout = ({ children }: EditLayoutProps) => {
  return (
    <div className="relative size-full">
      <div className="design-mesh fixed z-[-1] size-full" />

      <Container>
        <div className="my-16 flex flex-col items-center justify-center gap-3 sm:my-20">
          <h2 className="text-center text-3xl font-bold text-black sm:text-4xl">
            Edit Your QR Code with{" "}
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              Super Powers.
            </span>
          </h2>
          <p className="text-center text-base font-semibold text-zinc-600">
            Customize it with your color, shape and logo in 3 simple steps.
          </p>
        </div>

        <div className="mb-20 rounded-lg bg-gray-400/10 p-4 backdrop-blur-sm">
          <div className="rounded-lg bg-white p-4 sm:p-6">{children}</div>
        </div>
      </Container>
    </div>
  )
}

export default EditLayout
