import { KeyboardOff } from "lucide-react";

export const NullComponent = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => {
	return (
		<div className="flex items-center flex-col gap-4">
			<span className="size-16 bg-gray-50/70 backdrop-blur-sm flex items-center justify-center rounded-lg border border-gray-200">
				<KeyboardOff className="size-6 " />
			</span>
			<h3 className="font-medium text-sm ">{title}</h3>
			<p className="font-normal text-sm text-gray-500 max-w-xs text-center">
				{description}
			</p>
		</div>
	);
};
