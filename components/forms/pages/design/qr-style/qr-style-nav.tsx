"use client";

import { ListComponent } from "@/components/global/list-component";
import { qrStyleNavigationData } from "@/constants/pages/design/qr-style-navigation";
import {
	type stepTypes,
	useQrStyleContext,
} from "@/hooks/pages/design/useQrStyleContext";
import { cn } from "@/lib/utils";

export const QrStyleNav = () => {
	const { step, setStep } = useQrStyleContext((state) => ({
		step: state.step,
		setStep: state.setStep,
	}));

	return (
		<ListComponent
			data={qrStyleNavigationData}
			className="flex items-center gap-1 sm:gap-2 border-b pb-2"
			renderItem={({ label, value, id }) => (
				<button
					key={id}
					type="button"
					onClick={() => setStep(value as stepTypes)}
					className={cn(
						"py-2 px-3 sm:px-4 text-sm font-semibold rounded-lg transition-colors duration-200  cursor-pointer hover:bg-gray-100 text-gray-600",
						value === step && "bg-gray-100",
					)}
				>
					{label}
				</button>
			)}
		/>
	);
};
