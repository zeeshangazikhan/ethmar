import type { Metadata } from "next"
import { Inter, Marcellus, Noto_Kufi_Arabic } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
})

const notokufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-kufi",
  display: "swap",
})

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
  return (
    <html lang="en">
      <body className={`${inter.variable} ${marcellus.variable} ${notokufi.variable} antialiased`}>
        <TooltipProvider>
          <Toaster />
          {children}
        </TooltipProvider>
      </body>
    </html>
  )
}
