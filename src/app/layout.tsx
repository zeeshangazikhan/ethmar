import type { Metadata } from "next"
import { Inter, Marcellus, Noto_Kufi_Arabic } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { LanguageProvider } from "@/components/LanguageProvider"

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
        <Script id="google-translate-init" strategy="beforeInteractive">
          {`(function(){if(document.cookie.indexOf('googtrans=/en/ar')!==-1){document.documentElement.dir='rtl';document.documentElement.lang='ar';document.documentElement.classList.add('translated-rtl')}})();function googleTranslateElementInit(){new google.translate.TranslateElement({pageLanguage:'en',includedLanguages:'ar',autoDisplay:false},'google_translate_element')}`}
        </Script>
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <div id="google_translate_element" style={{ display: 'none' }} />
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            {children}
          </TooltipProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
