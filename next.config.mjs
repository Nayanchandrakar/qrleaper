/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/design",
        permanent: false,
      },
      {
        source: "/dashboard",
        destination: "/dashboard/qr-codes",
        permanent: false,
      },
    ]
  },
  images: {
    domains: ["localhost", "qr-leaper-eews.vercel.app"],
  },
}

export default nextConfig
