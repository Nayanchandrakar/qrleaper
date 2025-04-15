import { cn } from "@/lib/utils";
import Link, { type LinkProps } from "next/link";

interface LinkButtonProps extends LinkProps {
	className?: string;
	children?: React.ReactNode;
}

export const LinkButton = ({
	className,
	href,
	children,
	...props
}: LinkButtonProps) => {
	return (
		<Link
			className={cn(
				"font-semibold text-gray-100 text-sm transition-colors duration-200 hover:text-gray-200",
				className,
			)}
			href={href}
			{...props}
		>
			{children}
		</Link>
	);
};
