import { Activity } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const TotalQrCodeSkeleton = () => {
	return (
		<Card className="max-w-sm">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="font-medium text-sm">
					<Skeleton className="h-5 w-16" />
				</CardTitle>
				<Activity className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<Skeleton className="h-5 w-11" />
				<p className="mt-2 text-muted-foreground text-xs">
					<Skeleton className="h-5 w-36" />
				</p>
			</CardContent>
		</Card>
	);
};
