/** @type {import('next').NextConfig} */
const nextConfig = {
	redirects: async () => {
		return [
			{
				source: "/",
				destination: "/design",
				permanent: true,
			},
			{
				source: "/dashboard",
				destination: "/dashboard/qr-codes",
				permanent: true,
			},
		];
	},
	images: {
		domains: ["localhost", "www.qrleaper.com"],
	},
};

export default nextConfig;
