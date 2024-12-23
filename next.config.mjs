/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/design",
        permanent: true,
      },
    ]
  },
  images: {
    domains: ["localhost", "qr-leaper-eews.vercel.app"],
  },
}

export default nextConfig
