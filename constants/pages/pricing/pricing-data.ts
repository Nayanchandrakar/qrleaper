export const pricingData = [
  {
    id: "56895675",
    title: "Free",
    description: "Perfect for hobbyists and individuals starting out.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "1 Dynamic QR Code",
      "30-Day Trial",
      "QR Leaper Sign-Up Pop-Up",
      "500 Scans Limit",
      "Artwork Formats: SVG, PNG, JPEG",
      "Editable Code (update content after creation)",
      "Analytics (for the first 30 days)"
    ],
    stripeIds: {
      monthly: null,
      yearly: null
    },
    actionLabel: "Get Started",
    recommended: false
  },
  {
    id: "45845687",
    title: "Starter",
    description: "For individuals and small teams scaling up.",
    monthlyPrice: 10,
    yearlyPrice: 96,
    features: [
      "3 QR Codes",
      "No Ads",
      "Unlock All QR Types (URLs, Files, Menus, PDFs, etc.)",
      "Upload Your Logo",
      "Editable QR Codes (modify URL or design anytime)",
      "Unlimited Scans",
      "Artwork Formats: SVG, PNG, JPEG",
      "90 Days of Analytics (rolling trends, location insights)"
    ],
    stripeIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_STARTER_MONTHLY_PLAN_ID as string,
      yearly: process.env.NEXT_PUBLIC_STRIPE_STARTER_YEARLY_PLAN_ID as string
    },
    actionLabel: "Get Started",
    recommended: false
  },
  {
    id: "3455347",
    title: "Plus",
    description: "For businesses looking for in-depth QR solutions.",
    monthlyPrice: 30,
    yearlyPrice: 300,
    features: [
      "50 QR Codes",
      "No Ads",
      "Unlimited Scans",
      "Artwork Formats: SVG, PNG",
      "Ongoing Analytics Access (detailed scan data)",
      "Location Tracking (monitor where scans occur)"
    ],
    stripeIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_PLUS_MONTHLY_PLAN_ID as string,
      yearly: process.env.NEXT_PUBLIC_STRIPE_PLUS_YEARLY_PLAN_ID as string
    },
    actionLabel: "Get Started",
    recommended: true
  },
  {
    id: "5656856",
    title: "Pro",
    description: "Ideal for enterprises needing advanced QR features.",
    monthlyPrice: 60,
    yearlyPrice: 600,
    features: [
      "200 QR Codes",
      "No Ads",
      "Unlimited Scans",
      "Artwork Formats: SVG, PNG",
      "Ongoing Analytics Access (detailed scan data)",
      "Location Tracking (monitor where scans occur)"
    ],
    stripeIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID as string,
      yearly: process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID as string
    },
    actionLabel: "Get Started",
    recommended: false
  }
]

export type pricingDataType = (typeof pricingData)[0]
