import Image from "next/image";
import Link from "next/link";

interface NewQrCodeGridCardProps {
	title: string;
	description: string;
	endpoint: string;
	nextImage: string;
}

export const NewQrCodeGridCard = ({
	description,
	endpoint,
	nextImage,
	title,
}: NewQrCodeGridCardProps) => {
	return (
		<Link
			href={endpoint}
			className="rounded-lg w-full shadow shadow-black/20 bg-green-600/10 backdrop-blur-sm overflow-hidden group border border-green-600/10 hover:border-green-600"
		>
			<div className="w-full h-[12rem] overflow-hidden flex justify-center">
				<Image
					src={nextImage}
					width={600}
					height={600}
					alt="new-qr-image"
					className="size-[10rem] h-fit"
				/>
			</div>
			<div className="bg-white py-5 px-4 text-center flex flex-col gap-1 border-t border-gray-100 ">
				<h4 className="text-base font-semibold group-hover:text-green-600 transition duration-200">
					{title}
				</h4>
				<p className="text-sm font-medium text-gray-500 transition duration-200 group-hover:text">
					{description}
				</p>
			</div>
		</Link>
	);
};
