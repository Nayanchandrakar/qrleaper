import { getVCardUserNameByQrCodeId } from "@/app/actions/utils";
import { CopyButton } from "@/components/cards/pages/dashboard/qr-codes/qr-card/copy-button";
import { ShowQrCodePopupButton } from "@/components/cards/pages/dashboard/qr-codes/qr-card/show-qr-code-popup-button";
import type { qrCardType } from "@/types/type";
import { getEndpointURL, getvCardCopyEndpointURL } from "@/utils";

interface QrHeaderProps {
	data: qrCardType;
}

export const QrHeader = async ({ data }: QrHeaderProps) => {
	let endpoint = getEndpointURL(data.qr_code.id);

	if (data.qr_code.type === "vcard") {
		const userName = await getVCardUserNameByQrCodeId(data.qr_code.id);
		endpoint = getvCardCopyEndpointURL(userName!);
	}

	return (
		<div className="flex items-center gap-4 justify-between">
			<span className="truncate text-gray-500 font-semibold">
				{data?.qr_code.title}
			</span>

			<div className="flex items-center gap-2">
				<CopyButton endpoint={endpoint} />
				<ShowQrCodePopupButton data={data} />
			</div>
		</div>
	);
};
