import { cn } from "@/lib/utils";
import { FC } from "react";

interface ContainerProps {
	children: React.ReactNode;
	className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
	return (
		<div
			className={cn(
				"mx-auto w-full max-w-[1550px] px-4 sm:px-6 md:px-10 lg:px-8",
				className,
			)}
		>
			{children}
		</div>
	);
};

export { Container };
