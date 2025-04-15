"use client";

import { IdCard } from "lucide-react";
import { useRef } from "react";

import { QrCode } from "@/components/package/qr-code/qr-code";
import type { QrCodeProps, qrCardType, qrCodeRefType } from "@/types/type";
import { getFilePath } from "@/utils/client";
import { DeleteQrCodeButton } from "./delete-qr-code-button";

interface QrCodePreviewType {
	endpoint: string;
	data: qrCardType;
}

export const QrCodePreview = ({ endpoint, data }: QrCodePreviewType) => {
	const qrCodeRef = useRef<qrCodeRefType>(null);
	const { qr_code_style: styleData } = data;

	const isBussinessCard = data?.qr_code?.type === "vcard";

	return (
		<div className="group relative flex h-44 w-full items-center justify-center bg-gray-100 ">
			{isBussinessCard && (
				<span className="absolute top-4 left-4 z-10 flex size-fit items-center justify-center rounded-lg border bg-white p-2">
					<IdCard className="size-6 text-green-600" />
				</span>
			)}
			<QrCode
				data={endpoint}
				qrCodeRef={qrCodeRef}
				className="scale-[0.5]"
				hasFrame={styleData?.hasFrame}
				topInput={styleData?.topText!}
				bottomInput={styleData?.bottomText!}
				shape={styleData?.shape! as QrCodeProps["shape"]}
				colorType={styleData?.colorType!}
				colors={styleData?.colors!}
				rotation={styleData?.rotation ?? 0}
				{...(styleData?.logo! && { logo: getFilePath(styleData?.logo!) })}
			/>
			<DeleteQrCodeButton id={data.qr_code.id} />
		</div>
	);
};
