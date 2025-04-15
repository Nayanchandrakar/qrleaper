import { redirect } from "next/navigation";

import {
	getQrCodeByUserIdAndIdWithType,
	getVcardQrStyleAndDataByQrCodeId,
} from "@/app/actions/utils";
import { VcardEditForm } from "@/components/forms/pages/edit/vcard/vcard-edit-form";
import { auth } from "@/lib/auth/auth";
import type { editQrVcardType } from "@/types/type";
import { getEndpointURL } from "@/utils";

// Site metadata
export const metadata = {
	title: "Edit Profile based QR Codes",
};

interface VcardEditPageProps {
	params: {
		id: string;
	};
}

const VcardEditPage = async ({ params }: VcardEditPageProps) => {
	if (!params.id) redirect("/design");

	const session = await auth();

	if (!session?.user?.id) redirect("/login");

	const data = await getQrCodeByUserIdAndIdWithType(
		session.user.id,
		params.id,
		"vcard",
	);

	if (!data) redirect("/design");

	const qrStyleAndVcardData = await getVcardQrStyleAndDataByQrCodeId(data.id);

	const { id, qrCodeId, ...remaining } = qrStyleAndVcardData.vcard;

	const formatRemaining = Object.fromEntries(
		Object.entries(remaining)?.map(([key, value]) => [key, value ?? ""]),
	);

	const qrCode = {
		id: data.id,
		title: data.title ?? "",
		...formatRemaining,
		style: {
			bottomInput: qrStyleAndVcardData?.style.bottomText ?? "",
			image: qrStyleAndVcardData?.style.logo ?? "",
			topInput: qrStyleAndVcardData?.style.topText ?? "",
			hasFrame: !!qrStyleAndVcardData?.style.hasFrame,
			shape: qrStyleAndVcardData?.style.shape ?? "square",
			colors: qrStyleAndVcardData?.style.colors ?? [""],
			colorType: qrStyleAndVcardData?.style.colorType ?? "linear",
			rotation: qrStyleAndVcardData?.style.rotation ?? 0,
		},
	};

	return (
		<VcardEditForm
			qrCode={qrCode as editQrVcardType}
			endpoint={getEndpointURL(data.id)}
		/>
	);
};

export default VcardEditPage;
