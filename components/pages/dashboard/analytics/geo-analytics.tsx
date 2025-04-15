"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import {
	locationAnalytics,
	toGeoLocationArray,
	toGeoLocationObject,
} from "@/utils/location-analytics";

import { AnalyticsMapDynamic } from "@/components/dynamic";
import { TopCountries } from "@/components/pages/dashboard/analytics/top-countries";
import type { qrAnayticsType } from "@/types/db-types";

interface GeoAnalyticsProps {
	data: qrAnayticsType[];
}

export const GeoAnalytics = ({ data }: GeoAnalyticsProps) => {
	const groupedCountries = locationAnalytics(data);

	return (
		<Card>
			<CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
				<div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
					<CardTitle>Scans Metrics by Country</CardTitle>
					<CardDescription>View total scan counts by country.</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="px-2 sm:p-6">
				<AnalyticsMapDynamic data={toGeoLocationObject(groupedCountries)} />

				{groupedCountries?.length > 0 && (
					<TopCountries data={toGeoLocationArray(groupedCountries)} />
				)}
			</CardContent>
		</Card>
	);
};
