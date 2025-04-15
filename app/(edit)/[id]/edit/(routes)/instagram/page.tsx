import { redirect } from "next/navigation";

import {
	getInstagramQrStyleAndDataByQrCodeId,
	getQrCodeByUserIdAndIdWithType,
} from "@/app/actions/utils";
import { InstagramEditForm } from "@/components/forms/pages/edit/instagram/instagram-edit-form";
import { auth } from "@/lib/auth/auth";
import { getEndpointURL } from "@/utils";

// Site metadata
export const metadata = {
	title: "Edit Instagram Profile based QR Codes",
};

interface InstagramEditPageProps {
	params: {
		id: string;
	};
}

const InstagramEditPage = async ({ params }: InstagramEditPageProps) => {
	if (!params.id) redirect("/design");

	const session = await auth();

	if (!session?.user?.id) redirect("/login");

	const data = await getQrCodeByUserIdAndIdWithType(
		session.user.id,
		params.id,
		"instagram",
	);

	if (!data) redirect("/design");

	const qrStyleAndLinkData = await getInstagramQrStyleAndDataByQrCodeId(
		data.id,
	);

	const qrCode = {
		id: data.id,
		title: data.title ?? "",
		instagram: qrStyleAndLinkData?.instagram.instagramId ?? "",
		style: {
			bottomInput: qrStyleAndLinkData?.style.bottomText ?? "",
			image: qrStyleAndLinkData?.style.logo ?? "",
			topInput: qrStyleAndLinkData?.style.topText ?? "",
			hasFrame: !!qrStyleAndLinkData?.style.hasFrame,
			shape: qrStyleAndLinkData?.style.shape ?? "square",
			colors: qrStyleAndLinkData?.style.colors ?? [""],
			colorType: qrStyleAndLinkData?.style.colorType ?? "linear",
			rotation: qrStyleAndLinkData?.style.rotation ?? 0,
		},
	};

	return (
		<InstagramEditForm qrCode={qrCode} endpoint={getEndpointURL(data.id)} />
	);
};

export default InstagramEditPage;
