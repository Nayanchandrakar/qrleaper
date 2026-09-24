import type { NextConfig } from "next"

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/design",
        permanent: true
      },
      {
        source: "/dashboard",
        destination: "/dashboard/qr-codes",
        permanent: true
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qrleaper.nayan.ink"
      },
      {
        protocol: "http",
        hostname: "localhost"
      },
      {
        protocol: "https",
        hostname: "localhost"
      }
    ]
  }
} satisfies NextConfig

export default nextConfig
