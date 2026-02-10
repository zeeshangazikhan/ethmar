import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ETHMAR International Holdings",
  description: "A refined corporate homepage showcasing Ethmar's global presence, sectors of focus, and partnership approach.",
  openGraph: {
    title: "ETHMAR International Holdings",
    description: "A refined corporate homepage showcasing Ethmar's global presence, sectors of focus, and partnership approach.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ETHMAR International Holdings",
    description: "A refined corporate homepage showcasing Ethmar's global presence, sectors of focus, and partnership approach.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
