'use client'

import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ArrowRight } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

export default function WhoWeAre() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  // Scroll animation setup
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
          entry.target.classList.remove('opacity-0')
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll('[data-scroll-animate]')
    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  // Navigation structure
  const navigation = [
    {
      title: 'About Us',
      items: ['EIH Legacy / Who We Are', 'Vision, Mission, Values', 'Leadership', 'Corporate Sustainability']
    },
    {
      title: 'Investment Sectors',
      items: ['Growth Capital', 'Private Equity', 'Capital Markets', 'Private Credit & Infrastructure']
    },
    {
      title: 'Careers',
      items: ['Life At EIH', 'Career Opportunities']
    },
    {
      title: 'News & Insights',
      items: ['Newsroom', 'Reports', 'Blogs']
    }
  ]

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  const coreValues = [
    {
      title: "Integrity",
      description: "We uphold the highest ethical standards in all our dealings, building trust through transparency and honesty.",
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      )
    },
    {
      title: "Excellence",
      description: "We pursue excellence in everything we do, continuously raising the bar and delivering exceptional results.",
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      )
    },
    {
      title: "Innovation",
      description: "We embrace change and foster a culture of innovation, seeking new ways to create value and drive progress.",
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      )
    },
    {
      title: "Partnership",
      description: "We build lasting relationships based on mutual respect, collaboration, and shared success.",
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    }
  ]

  const milestones = [
    { year: "1985", title: "Foundation", description: "EIH was established with a vision to transform regional investments" },
    { year: "1995", title: "Global Expansion", description: "Expanded operations to key international markets" },
    { year: "2005", title: "Diversification", description: "Launched new investment verticals and strategic partnerships" },
    { year: "2015", title: "Digital Era", description: "Embraced technology-driven investment strategies" },
    { year: "2024", title: "Future Forward", description: "Leading sustainable investments across sectors" }
  ]

  return (
    <main data-testid="page-who-we-are" className="bg-[#fffcf8] overflow-x-hidden">
      {/* FULL SCREEN MENU OVERLAY */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#fffcf8] transition-transform duration-500 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="py-6 sm:py-10 px-4 sm:px-8 md:px-16">
          <div className="flex justify-between items-center">
            <Link href="/" className="font-serif text-[18px] sm:text-[20px] md:text-[26px] tracking-[0.15em] text-[#191817]">EIH</Link>
            <button 
              onClick={() => {
                setMenuOpen(false)
                setActiveSubmenu(null)
              }}
              className="p-2 text-[#191817] hover:text-[#b69c6b] transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Content */}
        <div className="h-[calc(100vh-100px)] overflow-y-auto px-4 sm:px-8 md:px-16">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-16 py-8 sm:py-12">
            {/* Left Side - Navigation */}
            <div className="space-y-1">
              {navigation.map((nav, index) => (
                <div key={index} className="border-b border-[#191817]/10">
                  <button
                    onClick={() => setActiveSubmenu(activeSubmenu === nav.title ? null : nav.title)}
                    className="w-full py-4 sm:py-6 flex justify-between items-center group"
                  >
                    <span className="font-serif text-[24px] sm:text-[32px] md:text-[42px] text-[#191817] group-hover:text-[#b69c6b] transition-colors uppercase tracking-[0.05em]">
                      {nav.title}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-[#191817] group-hover:text-[#b69c6b] transition-all duration-300 ${
                        activeSubmenu === nav.title ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  {/* Submenu */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      activeSubmenu === nav.title ? 'max-h-[500px] pb-4' : 'max-h-0'
                    }`}
                  >
                    <div className="pl-4 sm:pl-8 space-y-3">
                      {nav.items.map((item, itemIndex) => (
                        <Link 
                          key={itemIndex}
                          href={item === 'EIH Legacy / Who We Are' ? '/who-we-are' : '#'}
                          onClick={() => setMenuOpen(false)}
                          className="block font-serif text-[16px] sm:text-[18px] md:text-[20px] text-[#191817] hover:text-[#b69c6b] transition-colors"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Contact Us - Direct Link */}
              <div className="border-b border-[#191817]/10">
                <Link
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-4 sm:py-6 flex justify-between items-center group"
                >
                  <span className="font-serif text-[24px] sm:text-[32px] md:text-[42px] text-[#191817] group-hover:text-[#b69c6b] transition-colors uppercase tracking-[0.05em]">
                    Contact Us
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Side - Contact Info */}
            <div className="lg:border-l lg:border-[#191817]/10 lg:pl-16">
              <div className="space-y-8">
                <div>
                  <h3 className="font-serif text-[20px] sm:text-[24px] md:text-[28px] text-[#191817] mb-3">Contact Us</h3>
                  <div className="w-12 h-[2px] bg-[#b69c6b]"></div>
                </div>
                
                <div className="space-y-4">
                  <a href="tel:+97112340000" className="block font-serif text-[16px] sm:text-[18px] text-[#191817] hover:text-[#b69c6b] transition-colors underline">
                    +971 1234 0000
                  </a>
                  <a href="mailto:contact@ethmar.ae" className="block font-serif text-[16px] sm:text-[18px] text-[#191817] hover:text-[#b69c6b] transition-colors underline">
                    contact@ethmar.ae
                  </a>
                </div>

                {/* Social Icons */}
                <div className="flex gap-4 pt-4">
                  <a href="#" className="text-[#191817]/50 hover:text-[#b69c6b] transition-colors" aria-label="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-[#191817]/50 hover:text-[#b69c6b] transition-colors" aria-label="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-[#191817]/50 hover:text-[#b69c6b] transition-colors" aria-label="LinkedIn">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-[#191817]/50 hover:text-[#b69c6b] transition-colors" aria-label="X/Twitter">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-[#191817]/50 hover:text-[#b69c6b] transition-colors" aria-label="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>

                {/* Language Toggle */}
                <div className="pt-8 border-t border-[#191817]/10">
                  <div className="flex gap-4">
                    <button className="font-serif text-[16px] sm:text-[18px] text-[#191817] font-medium">EN</button>
                    <span className="text-[#191817]/30">|</span>
                    <button className="font-serif text-[16px] sm:text-[18px] text-[#191817]/50 hover:text-[#191817] transition-colors">AR</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <header className="relative min-h-[70vh] md:min-h-[80vh] flex flex-col bg-[#0b1320]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/hero.jpg" 
            className="w-full h-full object-cover grayscale brightness-50"
            alt="Who We Are Background"
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-50 py-6 sm:py-10 px-4 sm:px-8 md:px-16">
          {/* Mobile header */}
          <nav className="md:hidden flex items-center justify-between text-white">
            <button 
              className="flex flex-col justify-center items-center gap-1.5 p-2"
              aria-label="menu"
              onClick={() => setMenuOpen(true)}
            >
              <span className="block w-6 h-[2px] bg-white"></span>
              <span className="block w-6 h-[2px] bg-white"></span>
            </button>

            <Link href="/" className="font-serif text-[18px] sm:text-[20px] tracking-[0.15em]">EIH</Link>

            <div>
              <span className="cursor-pointer font-arabic text-[14px] leading-none">ع</span>
            </div>
          </nav>

          {/* Desktop header */}
          <nav className="hidden md:flex justify-between items-center text-white">
            <div className="flex items-center">
               <Link href="/" className="font-serif text-[18px] sm:text-[20px] md:text-[26px] tracking-[0.15em]">EIH</Link>
            </div>
            <div className="hidden md:flex flex-col items-center text-center text-[12px] md:text-[14px] tracking-[0.35em] uppercase opacity-95">
              <span className="mt-1 text-[12px] md:text-[18px]">ETHMAR INTERNATIONAL HOLDING</span>
            </div>
            <div className="flex gap-3 sm:gap-4 items-center text-[12px] md:text-[14px] tracking-[0.3em] font-medium">
              <button 
                className="flex flex-col justify-center items-center gap-1.5 sm:gap-2 p-2" 
                aria-label="menu"
                onClick={() => setMenuOpen(true)}
              >
                 <span className="block w-6 sm:w-8 md:w-9 h-[2px] bg-white"></span>
                 <span className="block w-6 sm:w-8 md:w-9 h-[2px] bg-white"></span>
              </button>
              <span className="cursor-pointer font-arabic text-[14px] md:text-[16px] leading-none">ع</span>
            </div>
          </nav>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center py-16 sm:py-20 md:py-32 px-4 sm:px-8 md:px-16">
          <div className="max-w-[1440px] mx-auto w-full text-center">
            <p className="text-[#b69c6b] font-serif text-[12px] sm:text-[14px] tracking-[0.4em] uppercase mb-4 sm:mb-6">About Us</p>
            <h1 className="text-white font-serif text-[36px] sm:text-[48px] md:text-[72px] lg:text-[82px] leading-[1.1] uppercase tracking-[0.02em] mb-6 sm:mb-8">
              <span className="block">Who We Are</span>
            </h1>
            <p className="text-white/80 font-serif text-[16px] sm:text-[18px] md:text-[22px] max-w-[700px] mx-auto leading-relaxed">
              Building lasting value through strategic investments and visionary partnerships
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-[11px] tracking-[0.2em] uppercase">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent"></div>
          </div>
        </div>
      </header>

      {/* ABOUT INTRO SECTION */}
      <section className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-8 md:px-16 bg-[#fffcf8]" data-scroll-animate>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-[#b69c6b] font-serif text-[11px] sm:text-[12px] tracking-[0.4em] uppercase mb-4 sm:mb-6">Our Story</p>
              <h2 className="text-[#191817] font-serif font-bold text-[28px] sm:text-[36px] md:text-[48px] leading-[1.15] mb-6 sm:mb-8 uppercase tracking-[0.02em]">
                A Legacy of<br />Strategic Growth
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <p className="text-[#191817]/80 font-serif text-[15px] sm:text-[17px] md:text-[18px] leading-[1.8]">
                  Ethmar International Holding represents decades of strategic investment excellence across diverse sectors. Founded with a vision to create lasting value, we have grown from a regional investment firm to a global holding company with interests spanning continents.
                </p>
                <p className="text-[#191817]/80 font-serif text-[15px] sm:text-[17px] md:text-[18px] leading-[1.8]">
                  Our approach combines deep market expertise with a commitment to sustainable growth, ensuring that every investment we make contributes to a better future for our partners, communities, and stakeholders.
                </p>
              </div>
              <Link href="#" className="mt-8 sm:mt-10 inline-flex items-center gap-3 sm:gap-4 text-[#191817] font-serif text-[14px] sm:text-[16px] tracking-[0.15em] group uppercase">
                <span>Our Legacy</span>
                <svg className="w-10 sm:w-12 h-5 sm:h-6 transition-transform group-hover:translate-x-1" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="2" y1="10" x2="35" y2="10" stroke="currentColor" strokeWidth="1"/>
                  <path d="M32 6L38 10L32 14" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="relative h-[350px] sm:h-[450px] md:h-[550px] rounded-none overflow-hidden">
                <Image 
                  src="/assets/horse.jpg" 
                  alt="EIH Legacy" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-24 h-24 sm:w-32 sm:h-32 border border-[#b69c6b]/30 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-16 bg-[#f2efe6]" data-scroll-animate>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            <div className="text-center">
              <p className="text-[#b69c6b] font-serif text-[42px] sm:text-[56px] md:text-[72px] font-light leading-none mb-2 sm:mb-4">40+</p>
              <p className="text-[#191817]/70 font-serif text-[12px] sm:text-[13px] tracking-[0.2em] uppercase">Years of Excellence</p>
            </div>
            <div className="text-center">
              <p className="text-[#b69c6b] font-serif text-[42px] sm:text-[56px] md:text-[72px] font-light leading-none mb-2 sm:mb-4">$25B</p>
              <p className="text-[#191817]/70 font-serif text-[12px] sm:text-[13px] tracking-[0.2em] uppercase">Assets Under Management</p>
            </div>
            <div className="text-center">
              <p className="text-[#b69c6b] font-serif text-[42px] sm:text-[56px] md:text-[72px] font-light leading-none mb-2 sm:mb-4">15</p>
              <p className="text-[#191817]/70 font-serif text-[12px] sm:text-[13px] tracking-[0.2em] uppercase">Countries</p>
            </div>
            <div className="text-center">
              <p className="text-[#b69c6b] font-serif text-[42px] sm:text-[56px] md:text-[72px] font-light leading-none mb-2 sm:mb-4">200+</p>
              <p className="text-[#191817]/70 font-serif text-[12px] sm:text-[13px] tracking-[0.2em] uppercase">Portfolio Companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION SECTION */}
      <section className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-8 md:px-16 bg-[#fffcf8]" data-scroll-animate>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <p className="text-[#b69c6b] font-serif text-[11px] sm:text-[12px] tracking-[0.4em] uppercase mb-4 sm:mb-6">Guiding Principles</p>
            <h2 className="text-[#191817] font-serif font-bold text-[24px] sm:text-[32px] md:text-[42px] uppercase tracking-[0.1em] sm:tracking-[0.15em]">
              Vision & Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
            {/* Vision */}
            <div className="bg-[#0b1320] p-8 sm:p-12 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#b69c6b]/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#b69c6b]/30 flex items-center justify-center mb-6 sm:mb-8">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#b69c6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-[#b69c6b] font-serif text-[11px] sm:text-[12px] tracking-[0.4em] uppercase mb-3 sm:mb-4">Our Vision</h3>
                <p className="text-white font-serif text-[22px] sm:text-[28px] md:text-[32px] leading-[1.3] mb-4 sm:mb-6">
                  To be the most trusted investment partner, shaping the future through strategic capital deployment.
                </p>
                <p className="text-white/60 font-serif text-[14px] sm:text-[16px] leading-[1.7]">
                  We envision a world where strategic investments create sustainable value for generations to come.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-[#f5f1e8] p-8 sm:p-12 md:p-16 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#b69c6b]/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#b69c6b]/30 flex items-center justify-center mb-6 sm:mb-8">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#b69c6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className="text-[#b69c6b] font-serif text-[11px] sm:text-[12px] tracking-[0.4em] uppercase mb-3 sm:mb-4">Our Mission</h3>
                <p className="text-[#191817] font-serif text-[22px] sm:text-[28px] md:text-[32px] leading-[1.3] mb-4 sm:mb-6">
                  To deliver exceptional returns while fostering innovation and sustainable development.
                </p>
                <p className="text-[#191817]/60 font-serif text-[14px] sm:text-[16px] leading-[1.7]">
                  We commit to rigorous due diligence, active partnership, and responsible stewardship of capital.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES SECTION */}
      <section className="pt-16 sm:pt-24 md:pt-32 pb-24 sm:pb-32 md:pb-40 px-4 sm:px-8 md:px-16 bg-[#fffcf8]" data-scroll-animate>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <p className="text-[#b69c6b] font-serif text-[11px] sm:text-[12px] tracking-[0.4em] uppercase mb-4 sm:mb-6">What Drives Us</p>
            <h2 className="text-[#191817] font-serif font-bold text-[24px] sm:text-[32px] md:text-[42px] uppercase tracking-[0.1em] sm:tracking-[0.15em]">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {coreValues.map((value, index) => (
              <div 
                key={index} 
                className="group bg-[#f9f8f6] hover:bg-[#0b1320] p-6 sm:p-8 transition-all duration-500 cursor-default"
              >
                <div className="text-[#b69c6b] group-hover:text-[#b69c6b] mb-4 sm:mb-6 transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-[#191817] group-hover:text-white font-serif text-[18px] sm:text-[20px] md:text-[22px] mb-3 sm:mb-4 transition-colors uppercase tracking-[0.05em]">
                  {value.title}
                </h3>
                <p className="text-[#191817]/70 group-hover:text-white/70 font-serif text-[14px] sm:text-[15px] leading-[1.7] transition-colors">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY TIMELINE SECTION */}
      <section className="py-24 sm:py-32 md:py-40 px-4 sm:px-8 md:px-16 bg-[#f2efe6]" data-scroll-animate>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <p className="text-[#b69c6b] font-serif text-[11px] sm:text-[12px] tracking-[0.4em] uppercase mb-4 sm:mb-6">Through The Years</p>
            <h2 className="text-[#191817] font-serif font-bold text-[24px] sm:text-[32px] md:text-[42px] uppercase tracking-[0.1em] sm:tracking-[0.15em]">
              Our Journey
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#b69c6b]/30 transform -translate-x-1/2"></div>

            <div className="space-y-8 sm:space-y-12 md:space-y-0">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`relative md:flex md:items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:mb-16`}
                >
                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                    <div className="bg-white p-6 sm:p-8 shadow-sm">
                      <p className="text-[#b69c6b] font-serif text-[32px] sm:text-[42px] md:text-[52px] font-light leading-none mb-2 sm:mb-3">{milestone.year}</p>
                      <h3 className="text-[#191817] font-serif text-[18px] sm:text-[20px] md:text-[24px] uppercase tracking-[0.1em] mb-2 sm:mb-3">{milestone.title}</h3>
                      <p className="text-[#191817]/70 font-serif text-[14px] sm:text-[15px] leading-[1.7]">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#b69c6b] rounded-full border-4 border-[#f2efe6]"></div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-16 bg-[#0b1320] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#b69c6b]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-[900px] mx-auto text-center relative z-10">
          <p className="text-[#b69c6b] font-serif text-[11px] sm:text-[12px] tracking-[0.4em] uppercase mb-4 sm:mb-6">Join Us</p>
          <h2 className="text-white font-serif text-[28px] sm:text-[36px] md:text-[48px] leading-[1.2] mb-6 sm:mb-8 uppercase tracking-[0.02em]">
            Ready to Partner<br />With Excellence?
          </h2>
          <p className="text-white/70 font-serif text-[15px] sm:text-[17px] md:text-[18px] leading-[1.8] mb-10 sm:mb-12 max-w-[650px] mx-auto">
            Whether you&apos;re seeking investment opportunities or looking to join our team, we&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link 
              href="#" 
              className="inline-flex items-center justify-center gap-3 bg-[#b69c6b] text-[#0b1320] font-serif text-[14px] sm:text-[16px] tracking-[0.15em] uppercase px-8 py-4 hover:bg-[#a08a5c] transition-colors"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="#" 
              className="inline-flex items-center justify-center gap-3 border border-white/30 text-white font-serif text-[14px] sm:text-[16px] tracking-[0.15em] uppercase px-8 py-4 hover:bg-white/10 transition-colors"
            >
              View Careers
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-[#dfd4bf] pt-16 sm:pt-24 md:pt-40 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-8 md:px-16 relative overflow-hidden" style={{ backgroundImage: "url('/assets/footer-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
        <div className="absolute inset-0 bg-black/40 sm:bg-black/20" />
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16 sm:mb-24 md:mb-32">
             <div className="grid grid-cols-2 gap-6 sm:gap-10 md:grid-cols-4 md:gap-24 w-full max-w-[1200px] text-[14px] sm:text-[17px] md:text-[22px] tracking-[0.1em] sm:tracking-[0.15em] font-serif mb-16 sm:mb-24 md:mb-32">
                <Link href="/who-we-are" className="hover:opacity-80 transition-opacity uppercase py-2">ABOUT US</Link>
                <Link href="#" className="hover:opacity-80 transition-opacity uppercase py-2">INVESTMENTS</Link>
                <Link href="#" className="hover:opacity-80 transition-opacity uppercase py-2">CAREERS</Link>
                <Link href="#" className="hover:opacity-80 transition-opacity uppercase py-2">CONTACT US</Link>
             </div>

             <div className="flex justify-end w-full mb-8 sm:mb-12">
                <div />
             </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8">
             <div className="flex flex-col items-start sm:items-end gap-4 w-full sm:w-auto mt-4 sm:mt-0 md:order-2">
                <Link href="#" className="text-[#b69c6b] hover:text-[#dfd4bf] transition-colors transform sm:-translate-y-3 md:-translate-y-4" aria-label="LinkedIn">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </Link>
                <div className="flex flex-wrap gap-4 sm:gap-6 text-[12px] sm:text-[13px] md:text-[15px] opacity-70 text-left sm:text-right">
                   <Link href="#" className="hover:opacity-100 transition-opacity">Terms of Use</Link>
                   <Link href="#" className="hover:opacity-100 transition-opacity">Regulatory Information</Link>
                   <Link href="#" className="hover:opacity-100 transition-opacity">Privacy</Link>
                   <Link href="#" className="hover:opacity-100 transition-opacity">Phishing</Link>
                </div>
             </div>
             
             <div className="flex flex-col gap-3 md:order-1">
               <p className="text-[12px] sm:text-[14px] md:text-[17px] tracking-[0.03em] sm:tracking-[0.05em] opacity-90 uppercase leading-relaxed">
                 2026 ETHMAR INTERNATIONAL HOLDINGS <span className="hidden sm:inline mx-3 opacity-40">|</span><br className="sm:hidden" /> ALL RIGHTS RESERVED
               </p>
               <p className="text-[12px] sm:text-[13px] md:text-[15px] opacity-60 max-w-[650px] leading-relaxed">
                 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
               </p>
             </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
