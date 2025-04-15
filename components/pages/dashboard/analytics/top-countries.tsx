"use client";

import { ScanQrCode } from "lucide-react";

import { TopScanCard } from "@/components/cards/pages/dashboard/analytics/top-scan-card";
import { ListComponent } from "@/components/global/list-component";
import type { geoDataType } from "@/types/type";

interface TopCountriesProps {
	data: geoDataType[];
}

export const TopCountries = ({ data }: TopCountriesProps) => {
	const sortedCountries = data?.sort((a, b) => b.count - a.count)?.slice(0, 10);

	return (
		<div className="mt-8">
			<div className="flex items-center justify-between gap-2 rounded-lg bg-zinc-100 p-3">
				<p className="font-semibold text-black text-sm">
					Top {sortedCountries?.length ?? 0} Countr
					{sortedCountries.length > 1 ? "ies" : "y"}
				</p>
				<p className="flex items-center gap-2 font-medium text-gray-800 text-sm">
					<ScanQrCode className="size-4" />
					Scans
				</p>
			</div>

			<ListComponent
				data={sortedCountries}
				className="mt-4 flex flex-col gap-2"
				renderItem={(item) => <TopScanCard key={item?.country} data={item} />}
			/>
		</div>
	);
};
