import { Inter, Marcellus, Noto_Kufi_Arabic } from "next/font/google"
import "../globals.css"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { LanguageProvider } from "@/components/LanguageProvider"
import { locales, type Locale, getDirection } from "@/lib/i18n"
import { cookies } from "next/headers"

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: localeParam } = await params
  const locale = (locales.includes(localeParam as Locale) ? localeParam : 'en') as Locale
  const dir = getDirection(locale)

  // Set cookie so middleware remembers preference
  const cookieStore = await cookies()
  // Note: cookies can only be set in Server Actions/Route Handlers, not during render.
  // The middleware will handle redirects based on the URL locale.

  return (
    <html lang={locale} dir={dir}>
      <body className={`${inter.variable} ${marcellus.variable} ${notokufi.variable} antialiased`}>
        <LanguageProvider locale={locale}>
          <TooltipProvider>
            <Toaster />
            {children}
          </TooltipProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
