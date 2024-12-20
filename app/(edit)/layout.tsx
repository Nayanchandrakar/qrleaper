import { Container } from "@/components/global/container"

interface EditLayoutProps {
  children: React.ReactNode
}

const EditLayout = ({ children }: EditLayoutProps) => {
  return (
    <div className="size-full  relative">
      <div className="design-mesh fixed size-full z-[-1]" />

      <Container>
        <div className="flex  items-center justify-center flex-col gap-3 my-16 sm:my-20">
          <h2 className="font-bold text-3xl sm:text-4xl text-black text-center">
            Edit Your QR Code with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-brand">
              Super Powers.
            </span>
          </h2>
          <p className="text-base font-semibold text-zinc-600 text-center">
            Customize it with your color, shape and logo in 3 simple steps.
          </p>
        </div>

        <div className="bg-gray-400/10 backdrop-blur-sm p-4 rounded-lg mb-20">
          <div className="bg-white p-4 sm:p-6 rounded-lg">{children}</div>
        </div>
      </Container>
    </div>
  )
}

export default EditLayout
