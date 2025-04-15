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
			className="group w-full overflow-hidden rounded-lg border border-green-600/10 bg-green-600/10 shadow shadow-black/20 backdrop-blur-sm hover:border-green-600"
		>
			<div className="flex h-[12rem] w-full justify-center overflow-hidden">
				<Image
					src={nextImage}
					width={600}
					height={600}
					alt="new-qr-image"
					className="size-[10rem] h-fit"
				/>
			</div>
			<div className="flex flex-col gap-1 border-gray-100 border-t bg-white px-4 py-5 text-center ">
				<h4 className="font-semibold text-base transition duration-200 group-hover:text-green-600">
					{title}
				</h4>
				<p className="group-hover:text font-medium text-gray-500 text-sm transition duration-200">
					{description}
				</p>
			</div>
		</Link>
	);
};
