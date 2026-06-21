import Image from "next/image"
import Link from "next/link"

interface SolutionsCardProps {
  title: string
  description: string
  endpoint: string
  nextImage: string
}

export const SolutionsCard = ({
  description,
  endpoint,
  nextImage,
  title
}: SolutionsCardProps) => {
  return (
    <Link
      href={endpoint}
      className="group flex w-full flex-col items-center overflow-hidden rounded-lg border border-green-600/10 bg-gradient-to-bl from-green-600/10 via-green-600/10 to-[#7efa5161] p-6 shadow shadow-black/20 hover:border-green-600"
    >
      <h4 className="mb-2 text-base font-semibold transition duration-200 group-hover:text-green-600">
        {title}
      </h4>

      <p className="text-center text-sm font-medium text-gray-500">
        {description}
      </p>

      <Image
        src={nextImage}
        width={600}
        height={600}
        alt="new-qr-image"
        className="mt-4 size-[10rem] h-fit"
      />
    </Link>
  )
}
