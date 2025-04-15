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
		<div className="flex rounded-md bg-green-100 items-center justify-between gap-2 p-2.5">
			<span className="flex items-center gap-2">
				<Image
					alt="flag-image"
					src={`https://flag.vercel.app/m/${data.country}.svg`}
					width={1000}
					height={1000}
					sizes="100vw"
					className="size-fit"
				/>
				<p className="text-sm text-gray-800 truncate">
					{COUNTRIES[data.country] ?? "NA"}
				</p>
			</span>
			<p className="text-sm text-gray-800">
				{clicksFormatter(data.count ?? 0, { full: true })}
			</p>
		</div>
	);
};
