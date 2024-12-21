/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/design",
        permanent: true, // Set to true if this is a permanent redirect (301), otherwise false (temporary redirect, 307).
      },
    ]
  },
  images: {
    domains: ["localhost"],
  },
}

export default nextConfig
