"use client";

import { Activity } from "lucide-react";
import CountUp from "react-countup";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clicksFormatter } from "@/lib/utils";
import { formatDateToLocal } from "@/utils/date-formats";

interface TotalScanCountProps {
	count: number;
	createdAt: Date;
	updatedAt: Date;
}

export const TotalScanCount = ({
	createdAt,
	count,
	updatedAt,
}: TotalScanCountProps) => {
	const fromDate = formatDateToLocal(createdAt);
	const toDate = formatDateToLocal(updatedAt);

	return (
		<Card className="max-w-sm">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="font-medium text-sm">Total Clicks</CardTitle>
				<Activity className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="bg-gradient-brand bg-clip-text font-bold text-2xl text-transparent">
					+
					<CountUp
						preserveValue
						start={0}
						end={count}
						formattingFn={(n) => clicksFormatter(n)}
						delay={1}
					/>
				</div>
				<p className="mt-1 text-muted-foreground text-xs">
					From {fromDate} to {toDate}
				</p>
			</CardContent>
		</Card>
	);
};
