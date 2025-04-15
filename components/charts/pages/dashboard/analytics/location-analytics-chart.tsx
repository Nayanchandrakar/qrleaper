"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { COUNTRIES } from "@/constants/pages/dashboard/analytics/countries";
import type { qrAnayticsType } from "@/types/db-types";
import { locationAnalytics } from "@/utils/location-analytics";
import { TrendingUp } from "lucide-react";
import * as React from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

export const description = "A bar chart with a location analytics";

const chartConfig = {
	desktop: {
		label: "Visitors",
		color: "#22d3ee",
	},
} satisfies ChartConfig;

interface LocationAnalyticsChartProps {
	data: qrAnayticsType[];
	numberOfDays: number;
	toDateFormatted: string;
	fromDateFormatted: string;
}

export const LocationAnalyticsChart = ({
	data,
	fromDateFormatted,
	toDateFormatted,
	numberOfDays,
}: LocationAnalyticsChartProps) => {
	const groupedCountries = locationAnalytics(data);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Country based analytics</CardTitle>
				<CardDescription>
					{fromDateFormatted} - {toDateFormatted}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={groupedCountries}
						margin={{
							top: 20,
						}}
					>
						{/* Gradient Definition */}
						<defs>
							<linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
								<stop offset="0%" stopColor="#16A50B" stopOpacity={1} />
								<stop offset="100%" stopColor="#0E6A1D" stopOpacity={1} />
							</linearGradient>
						</defs>

						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="country"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) =>
								value === "Unknown" ? "UA" : value?.slice(0, 5)
							}
						/>

						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(value) => COUNTRIES[value] || "Unknown"}
									indicator="dashed"
								/>
							}
						/>
						{/* Apply Gradient to the Bar */}
						<Bar radius={8} dataKey="count" fill="url(#barGradient)">
							<LabelList
								position="top"
								offset={6}
								className="fill-foreground"
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Gives you a country-based analytics <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing total visitors for the last {numberOfDays} days
				</div>
			</CardFooter>
		</Card>
	);
};
