import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface StepLabelProps extends HTMLAttributes<HTMLDivElement> {}

const StepLabel = ({ className, children, ...props }: StepLabelProps) => {
	return (
		<div className={cn("flex items-center gap-3", className)} {...props}>
			{children}
		</div>
	);
};

interface StepLabelCounterProps extends HTMLAttributes<HTMLSpanElement> {
	children: React.ReactNode;
}

const StepLabelCounter = ({
	className,
	children,
	...props
}: StepLabelCounterProps) => {
	return (
		<span
			className={cn(
				"flex size-7 items-center justify-center rounded-full bg-black font-medium text-sm text-white",
				className,
			)}
			{...props}
		>
			{children}
		</span>
	);
};

StepLabel.Counter = StepLabelCounter;

interface StepLabelTitleProps extends HTMLAttributes<HTMLParagraphElement> {
	children: React.ReactNode;
}

const StepLabelTitle = ({
	className,
	children,
	...props
}: StepLabelTitleProps) => {
	return (
		<p className={cn("font-semibold text-sm", className)} {...props}>
			{children}
		</p>
	);
};

StepLabel.Title = StepLabelTitle;

export { StepLabel };
