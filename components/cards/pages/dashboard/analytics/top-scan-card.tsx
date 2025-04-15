"use client";

import Image from "next/image";

import { COUNTRIES } from "@/constants/pages/dashboard/analytics/countries";
import { clicksFormatter } from "@/lib/utils";
import type { geoDataType } from "@/types/type";

interface TopScanCardProps {
	data: geoDataType;
}

export const TopScanCard = ({ data }: TopScanCardProps) => {
	return (
		<div className="flex items-center justify-between gap-2 rounded-md bg-green-100 p-2.5">
			<span className="flex items-center gap-2">
				<Image
					alt="flag-image"
					src={`https://flag.vercel.app/m/${data.country}.svg`}
					width={1000}
					height={1000}
					sizes="100vw"
					className="size-fit"
				/>
				<p className="truncate text-gray-800 text-sm">
					{COUNTRIES[data.country] ?? "NA"}
				</p>
			</span>
			<p className="text-gray-800 text-sm">
				{clicksFormatter(data.count ?? 0, { full: true })}
			</p>
		</div>
	);
};
