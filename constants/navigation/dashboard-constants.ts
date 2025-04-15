import { CreditCard, QrCode, UserRoundPen } from "lucide-react";

export const dashboardNavigations = [
	{
		id: 34524,
		Icon: QrCode,
		label: "Your QR's",
		href: "/dashboard/qr-codes",
	},
	{
		id: 678734,
		Icon: UserRoundPen,
		label: "Profile",
		href: "/dashboard/user-profile",
	},
	{
		id: 4578534,
		Icon: CreditCard,
		label: "Billing",
		href: "/dashboard/billing",
	},
];
