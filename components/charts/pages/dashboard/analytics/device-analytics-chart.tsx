"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { qrAnayticsType } from "@/types/db-types";

export const description = "An interactive bar chart";

const chartConfig = {
	views: {
		label: "Visitors Count",
	},
	desktop: {
		label: "Desktop",
	},
	mobile: {
		label: "Mobile",
	},
	other: {
		label: "Other",
	},
} satisfies ChartConfig;

interface AnalyticsReportInterface {
	data: qrAnayticsType[];
	numberOfDays: number;
}

// Group the data by date and sum the counts
const groupDataByDate = (data: qrAnayticsType[]) => {
	// biome-ignore lint/suspicious/noExplicitAny:
	const groupedData = new Map<string, any>();

	data?.forEach((device) => {
		const deviceType = device?.deviceType || "Unknown";
		const date = device?.updatedAt?.toDateString();

		if (!groupedData.has(date!)) {
			groupedData.set(date!, { date, desktop: 0, mobile: 0, other: 0 });
		}

		const groupedEntry = groupedData.get(date!);

		groupedEntry.desktop += deviceType === "Desktop" ? device?.count : 0;
		groupedEntry.mobile += deviceType === "Mobile" ? device?.count : 0;
		groupedEntry.other += deviceType === "Unknown" ? device?.count : 0;
	});

	return Array.from(groupedData.values());
};
// biome-ignore lint/suspicious/noExplicitAny:
const calculateTotals = (data: any[]) => {
	const totals = { desktop: 0, mobile: 0, other: 0 };

	for (const entry of data) {
		totals.desktop += entry.desktop;
		totals.mobile += entry.mobile;
		totals.other += entry.other;
	}

	return totals;
};

const DeviceAnalyticsChart = ({
	data,
	numberOfDays,
}: AnalyticsReportInterface) => {
	const [activeChart, setActiveChart] =
		React.useState<keyof typeof chartConfig>("mobile");

	const formattedDeviceData = React.useMemo(
		() => groupDataByDate(data),
		[data],
	);
	const total = React.useMemo(
		() => calculateTotals(formattedDeviceData),
		[formattedDeviceData],
	);

	const handleClick = (chart: keyof typeof chartConfig) => {
		setActiveChart(chart);
	};

	return (
		<Card>
			<CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
				<div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
					<CardTitle>Device based analytics</CardTitle>
					<CardDescription>
						Showing total visitors for the last {numberOfDays} days
					</CardDescription>
				</div>
				<div className="flex">
					{["desktop", "mobile", "other"].map((key) => {
						const chart = key as keyof typeof chartConfig;
						return (
							<button
								key={chart}
								data-active={activeChart === chart}
								className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
								onClick={() => handleClick(chart)}
							>
								<span className="text-muted-foreground text-xs">
									{chartConfig[chart].label}
								</span>
								<span className="font-bold text-lg leading-none sm:text-3xl">
									{total[key as keyof typeof total].toLocaleString()}
								</span>
							</button>
						);
					})}
				</div>
			</CardHeader>
			<CardContent className="px-2 sm:p-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full"
				>
					<BarChart
						accessibilityLayer
						data={formattedDeviceData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						{/* Define the gradient inside defs */}
						<defs>
							<linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
								<stop offset="0%" stopColor="#16A50B" stopOpacity={1} />
								<stop offset="100%" stopColor="#0E6A1D" stopOpacity={1} />
							</linearGradient>
						</defs>

						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								});
							}}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									className="w-[150px]"
									nameKey="views"
									labelFormatter={(value) => {
										return new Date(value).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
										});
									}}
								/>
							}
						/>

						<Bar radius={8} dataKey={activeChart} fill="url(#barGradient)" />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export { DeviceAnalyticsChart };
