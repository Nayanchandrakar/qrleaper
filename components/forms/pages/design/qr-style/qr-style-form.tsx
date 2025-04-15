"use client";

import { QrStyleNav } from "@/components/forms/pages/design/qr-style/qr-style-nav";
import { StepLabel } from "@/components/ui/step-label";
import { qrStyleNavigationData } from "@/constants/pages/design/qr-style-navigation";
import { useQrStyleContext } from "@/hooks/pages/design/useQrStyleContext";

export const QrStyleForm = () => {
	const { step } = useQrStyleContext((state) => ({
		step: state.step,
	}));

	const FormComponent = qrStyleNavigationData?.find(
		(data) => data.value === step,
	)?.form!;

	return (
		<div className="space-y-4 mt-12">
			<StepLabel>
				<StepLabel.Counter>2</StepLabel.Counter>
				<StepLabel.Title>Customize QR Code</StepLabel.Title>
			</StepLabel>
			<QrStyleNav />
			<FormComponent />
		</div>
	);
};
