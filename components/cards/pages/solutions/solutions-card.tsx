import Link from "next/link"
import Image from "next/image"

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
  title,
}: SolutionsCardProps) => {
  return (
    <Link
      href={endpoint}
      className="rounded-lg w-full shadow shadow-black/20 bg-gradient-to-bl from-green-600/10 via-green-600/10 to-[#7efa5161] p-6 overflow-hidden group border border-green-600/10 hover:border-green-600 flex flex-col items-center"
    >
      <h4 className="text-base font-semibold group-hover:text-green-600 transition duration-200 mb-2">
        {title}
      </h4>

      <p className="text-sm font-medium text-gray-500 text-center">
        {description}
      </p>

      <Image
        src={nextImage}
        width={600}
        height={600}
        alt="new-qr-image"
        className="size-[10rem] h-fit mt-4"
      />
    </Link>
  )
}
