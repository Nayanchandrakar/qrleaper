"use client";

import { MutableRefObject } from "react";
import { toast } from "sonner";

import type { FileExtensionTypeExtended, qrCodeRefType } from "@/types/type";

interface DownloadProps {
	fileName: string;
	fileExtension: FileExtensionTypeExtended;
}

export const useQrCodeDownload = (
	qrCodeRef: MutableRefObject<qrCodeRefType>,
) => {
	const download = async ({ fileName, fileExtension }: DownloadProps) => {
		if (!qrCodeRef.current) return;

		// Handle QR Code Pdf Download

		if (fileExtension === "pdf") {
			const blob = await qrCodeRef.current?.getRawData("png");

			// Dynamically import jspdf package
			const jsPDF = (await import("jspdf")).default;

			const doc = new jsPDF();

			const imageUrl = URL.createObjectURL(blob as Blob);

			const img = new Image();

			img.src = imageUrl;

			await new Promise((resolve) => (img.onload = resolve));

			const [pageWidth, pageHeight] = [
				doc.internal.pageSize.getWidth(),
				doc.internal.pageSize.getHeight(),
			];

			const imgWidth = img.naturalWidth;
			const imgHeight = img.naturalHeight;

			const qrWidth = pageWidth * 0.4;
			const qrHeight = (imgHeight / imgWidth) * qrWidth;

			const posX = (pageWidth - qrWidth) / 2;
			const posY = (pageHeight - qrHeight) / 2;

			doc.addImage(imageUrl, "PNG", posX, posY, qrWidth, qrHeight);

			URL.revokeObjectURL(imageUrl);

			doc.save(`${fileName}.pdf`);

			toast.success("QR Code Pdf Downloaded Successfully!");
		} else {
			qrCodeRef.current?.download({
				extension: fileExtension,
				name: fileName,
			});
			toast.success("QR Code Downloaded Successfully!");
		}
	};

	return {
		download,
	};
};
