import { redirect } from "next/navigation";

import {
	getFacebookQrStyleAndDataByQrCodeId,
	getQrCodeByUserIdAndIdWithType,
} from "@/app/actions/utils";
import { FacebookEditForm } from "@/components/forms/pages/edit/facebook/facebook-edit-form";
import { auth } from "@/lib/auth/auth";
import { getEndpointURL } from "@/utils";

// Site metadata
export const metadata = {
	title: "Edit Facebook based QR Codes",
};

interface FacebookEditPageProps {
	params: {
		id: string;
	};
}

const FacebookEditPage = async ({ params }: FacebookEditPageProps) => {
	if (!params.id) redirect("/design");

	const session = await auth();

	if (!session?.user?.id) redirect("/login");

	const data = await getQrCodeByUserIdAndIdWithType(
		session.user.id,
		params.id,
		"facebook",
	);

	if (!data) redirect("/design");

	const qrStyleAndFacebookData = await getFacebookQrStyleAndDataByQrCodeId(
		data.id,
	);

	const qrCode = {
		id: data.id,
		title: data.title ?? "",
		facebookUrl: qrStyleAndFacebookData?.facebook.facebookUrl ?? "",
		style: {
			bottomInput: qrStyleAndFacebookData?.style.bottomText ?? "",
			image: qrStyleAndFacebookData?.style.logo ?? "",
			topInput: qrStyleAndFacebookData?.style.topText ?? "",
			hasFrame: !!qrStyleAndFacebookData?.style.hasFrame,
			shape: qrStyleAndFacebookData?.style.shape ?? "square",
			colors: qrStyleAndFacebookData?.style.colors ?? [""],
			colorType: qrStyleAndFacebookData?.style.colorType ?? "linear",
			rotation: qrStyleAndFacebookData?.style.rotation ?? 0,
		},
	};

	return (
		<FacebookEditForm qrCode={qrCode} endpoint={getEndpointURL(data.id)} />
	);
};

export default FacebookEditPage;
