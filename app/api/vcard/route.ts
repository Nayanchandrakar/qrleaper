import { NextResponse } from "next/server";

import { generateVCard } from "@/utils/vcard";

export async function POST(req: Request) {
	try {
		const data = await req.json();
		const vCard = generateVCard(data);

		return new NextResponse(vCard.getFormattedString(), {
			headers: {
				"Content-Type": "text/vcard",
				"Content-Disposition": `attachment; filename="${data.qrCodeId}.vcf"`,
			},
		});
	} catch (error) {
		console.error("vCard generation error:", error);
		return new Response("Internal Server Error", { status: 500 });
	}
}
