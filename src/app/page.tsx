'use client'

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import EmblaCarousel from 'embla-carousel'

export default function Home() {
  const emblaRef = useRef<HTMLDivElement>(null)
  const sectorsEmblaRef = useRef<HTMLDivElement>(null)
  const [emblaApi, setEmblaApi] = useState<ReturnType<typeof EmblaCarousel> | null>(null)
  const [sectorsEmblaApi, setSectorsEmblaApi] = useState<ReturnType<typeof EmblaCarousel> | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [sectorsSelectedIndex, setSectorsSelectedIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [isDraggingProgress, setIsDraggingProgress] = useState(false)
  const [isDraggingSectorsProgress, setIsDraggingSectorsProgress] = useState(false)

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

    // Observe all sections
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

  const slides = [
    { id: 1, img: '/assets/45.jpg', title: 'UNITED STATES OF AMERICA' },
    { id: 2, img: '/assets/20.jpg', title: 'ANOTHER REGION' },
    { id: 3, img: '/assets/20.jpg', title: 'ANOTHER REGION 2' },
    { id: 4, img: '/assets/20.jpg', title: 'ANOTHER REGION 3' },
    { id: 5, img: '/assets/20.jpg', title: 'ANOTHER REGION 4' },
    { id: 6, img: '/assets/20.jpg', title: 'ANOTHER REGION 5' },
    { id: 7, img: '/assets/20.jpg', title: 'ANOTHER REGION 6' },
  ]

  useEffect(() => {
    if (!emblaRef.current) return

    const embla = EmblaCarousel(emblaRef.current, { 
      loop: true, 
      align: 'center',
      skipSnaps: false,
      containScroll: false
    })
    
    setEmblaApi(embla)

    const onSelect = () => {
      setSelectedIndex(embla.selectedScrollSnap())
    }

    embla.on('select', onSelect)
    onSelect()

    return () => {
      embla.destroy()
    }
  }, [])

  useEffect(() => {
    if (!sectorsEmblaRef.current) return

    const embla = EmblaCarousel(sectorsEmblaRef.current, { 
      loop: true, 
      align: 'center',
      skipSnaps: false,
      containScroll: false
    })
    
    setSectorsEmblaApi(embla)
    const onSelect = () => {
      setSectorsSelectedIndex(embla.selectedScrollSnap())
    }

    embla.on('select', onSelect)
    onSelect()

    return () => {
      embla.destroy()
    }
  }, [])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const scrollSectorsTo = useCallback(
    (index: number) => {
      if (sectorsEmblaApi) sectorsEmblaApi.scrollTo(index)
    },
    [sectorsEmblaApi]
  )

  // Handle progress bar click for main carousel
  const handleProgressBarClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!emblaApi) return
      const progressBar = e.currentTarget
      const rect = progressBar.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = clickX / rect.width
      const targetIndex = Math.round(percentage * (slides.length - 1))
      scrollTo(targetIndex)
    },
    [emblaApi, scrollTo, slides.length]
  )

  // Handle progress bar mouse down for main carousel drag
  const handleProgressBarMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDraggingProgress(true)
      if (!emblaApi) return
      const progressBar = e.currentTarget
      const rect = progressBar.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(1, clickX / rect.width))
      const targetIndex = Math.round(percentage * (slides.length - 1))
      scrollTo(targetIndex)
    },
    [emblaApi, scrollTo, slides.length]
  )

  // Handle mouse move for main carousel drag
  const handleProgressBarMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDraggingProgress || !emblaApi) return
      const progressBar = e.currentTarget
      const rect = progressBar.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(1, clickX / rect.width))
      const targetIndex = Math.round(percentage * (slides.length - 1))
      scrollTo(targetIndex)
    },
    [isDraggingProgress, emblaApi, scrollTo, slides.length]
  )

  // Handle sectors progress bar click
  const handleSectorsProgressBarClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!sectorsEmblaApi) return
      const progressBar = e.currentTarget
      const rect = progressBar.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = clickX / rect.width
      const targetIndex = Math.round(percentage * (6 - 1))
      scrollSectorsTo(targetIndex)
    },
    [sectorsEmblaApi, scrollSectorsTo]
  )

  // Handle sectors progress bar mouse down for drag
  const handleSectorsProgressBarMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDraggingSectorsProgress(true)
      if (!sectorsEmblaApi) return
      const progressBar = e.currentTarget
      const rect = progressBar.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(1, clickX / rect.width))
      const targetIndex = Math.round(percentage * (6 - 1))
      scrollSectorsTo(targetIndex)
    },
    [sectorsEmblaApi, scrollSectorsTo]
  )

  // Handle mouse move for sectors drag
  const handleSectorsProgressBarMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDraggingSectorsProgress || !sectorsEmblaApi) return
      const progressBar = e.currentTarget
      const rect = progressBar.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(1, clickX / rect.width))
      const targetIndex = Math.round(percentage * (6 - 1))
      scrollSectorsTo(targetIndex)
    },
    [isDraggingSectorsProgress, sectorsEmblaApi, scrollSectorsTo]
  )

  // Handle mouse up to stop dragging
  useEffect(() => {
    const handleMouseUp = () => {
      setIsDraggingProgress(false)
      setIsDraggingSectorsProgress(false)
    }
    window.addEventListener('mouseup', handleMouseUp)
    return () => window.removeEventListener('mouseup', handleMouseUp)
  }, [])

  return (
    <main data-testid="page-home" className="bg-[#fffcf8] overflow-x-hidden">
      {/* FULL SCREEN MENU OVERLAY */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#fffcf8] transition-transform duration-500 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="py-6 sm:py-10 px-4 sm:px-8 md:px-16">
          <div className="flex justify-between items-center">
            <span className="font-serif text-[18px] sm:text-[20px] md:text-[26px] tracking-[0.15em] text-[#191817]">EIH</span>
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
      <header className="relative h-screen flex flex-col bg-[#0b1320]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/hero.jpg" 
            className="w-full h-full object-cover grayscale brightness-50"
            alt="Architectural Background"
            fill
            priority
            style={{ transform: 'scaleX(-1)' }}
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="absolute top-0 left-0 right-0 z-50 py-6 sm:py-10 px-4 sm:px-8 md:px-16">
          {/* Mobile header: hamburger left, EIH center, Arabic right */}
          <nav className="md:hidden flex items-center justify-between text-white">
            <button 
              className="flex flex-col justify-center items-center gap-1.5 p-2"
              aria-label="menu"
              onClick={() => setMenuOpen(true)}
            >
              <span className="block w-6 h-[2px] bg-white"></span>
              <span className="block w-6 h-[2px] bg-white"></span>
            </button>

            <div className="font-serif text-[18px] sm:text-[20px] tracking-[0.15em]">EIH</div>

            <div>
              <span className="cursor-pointer font-arabic text-[14px] leading-none">ع</span>
            </div>
          </nav>

          {/* Desktop header (keeps original layout) */}
          <nav className="hidden md:flex justify-between items-center text-white">
            <div className="flex items-center">
               <span className="font-serif text-[18px] sm:text-[20px] md:text-[26px] tracking-[0.15em]">EIH</span>
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
        
        <div className="relative z-10 flex-1 flex flex-col justify-end md:justify-center py-16 sm:py-20 md:py-32 px-4 sm:px-8 md:px-16">
          <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-end">
            <div>
              <h1 className="text-[#b69c6b] font-serif text-[44px] sm:text-[56px] md:text-[82px] leading-[0.88] sm:leading-[0.94] md:leading-[1] uppercase tracking-[0.02em] mb-4 sm:mb-6 text-left">
                <span className="block lg:whitespace-nowrap">
                  <strong className="font-bold">INVESTING</strong>
                  <span className="hidden lg:inline"> BEYOND</span>
                  <br className="lg:hidden" />
                  <span className="lg:hidden">BEYOND</span>
                </span>
                <span className="block">THE OBVIOUS</span>
              </h1>
              <Link href="#" className="mt-4 sm:mt-6 inline-flex items-center gap-3 sm:gap-4 text-white font-serif text-[16px] sm:text-[20px] md:text-[24px] tracking-[0.15em] sm:tracking-[0.2em] group">
                <span className="leading-none">Dive Deeper</span>
                <svg className="w-10 sm:w-12 h-5 sm:h-6 transition-transform group-hover:translate-x-1" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="2" y1="10" x2="35" y2="10" stroke="white" strokeWidth="1"/>
                  <path d="M32 6L38 10L32 14" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
            <div className="flex justify-start md:justify-end mt-12 md:mt-0">
            </div>
          </div>
        </div>
      </header>

      {/* LEGACY SECTION */}
      <section className="pt-24 sm:pt-32 md:pt-[320px] pb-12 sm:pb-16 md:pb-0 px-4 sm:px-8 md:px-16 bg-[#fffcf8]">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif font-bold text-[16px] sm:text-[20px] md:text-[30px] uppercase tracking-[0.3em] mb-10 sm:mb-14 md:mb-20 px-2 leading-none md:leading-relaxed">
            <span className="block md:inline">WHERE LEGACY</span>
            <br className="md:hidden" />
            <span className="block md:inline">BECOMES PRESENCE</span>
          </h2>
          <div className="relative mb-8 sm:mb-12">
            <img src="/assets/horse.jpg" className="w-full object-cover rounded-none h-[420px] sm:h-[560px] md:h-[700px]" alt="Horses" width={1440} height={700} />
          </div>
          <Link href="#" className="text-[#191817] font-serif font-bold text-[14px] sm:text-[16px] md:text-[18px] inline-flex items-center gap-2 sm:gap-3 group normal-case tracking-[0.15em] sm:tracking-[0.2em]">
            <span>Learn More</span>

            <svg className="w-10 sm:w-12 h-5 sm:h-6 text-[#191817] transition-transform group-hover:translate-x-1" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <line x1="2" y1="10" x2="35" y2="10" stroke="currentColor" strokeWidth="1"/>
              <path d="M32 6L38 10L32 14" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* GLOBAL PRESENCE SECTION */}
      <section className="pt-24 sm:pt-32 md:pt-[320px] pb-12 sm:pb-16 md:pb-0 px-0 md:px-0 bg-[#fffcf8]">
        <div className="w-full">
          <h2 className="text-[#191817] font-serif font-bold text-[14px] sm:text-[18px] md:text-[30px] uppercase tracking-[0.3em] mb-10 sm:mb-14 md:mb-20 text-center px-4 sm:px-8 md:px-16 leading-none md:leading-relaxed">
            <span className="block md:inline">A GLOBAL PRESENCE</span>
            <br className="md:hidden" />
            <span className="block md:inline">QUIETLY POWERFUL</span>
          </h2>

          {/* Carousel Container - Full Width */}
          <div className="overflow-hidden w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex">
              {slides.map((slide) => (
                <div key={slide.id} className="flex-[0_0_92vw] sm:flex-[0_0_85vw] md:flex-[0_0_70vw] min-w-0 px-2 sm:px-4">
                  <div className="grid grid-cols-1 md:grid-cols-[390px_1fr] items-stretch min-h-[450px] sm:min-h-[500px] md:min-h-[550px]">
                    <div className="bg-[#0b1320] flex items-stretch justify-center text-center relative overflow-hidden min-h-[200px] sm:min-h-[250px] md:min-h-0">
                      <Image src={slide.img} alt={slide.title} fill className="object-cover object-center transform scale-110 sm:scale-125 md:scale-150" priority />
                      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]"></div>
                    </div>
                    <div className="bg-[#f2efe6] px-4 sm:px-8 md:px-16 py-8 sm:py-10 md:py-12 flex flex-col justify-center items-center border-black/5">
                       <div className="max-w-[520px] text-center">
                         <h3 className="text-[#191817] font-serif font-medium text-[18px] sm:text-[22px] md:text-[32px] tracking-[0.05em] mb-4 sm:mb-6 uppercase">{slide.title}</h3>
                         <p className="text-[#191817] font-serif text-[14px] sm:text-[16px] md:text-[18px] opacity-80 leading-[1.5] sm:leading-[1.4]">
                           Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                           <br className="hidden sm:block" />
                           sed diam nonummy nibh euismod tincidunt ut laoreet.
                         </p>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center items-center mt-8 sm:mt-12 px-4 sm:px-8 md:px-16">
            <div className="w-full max-w-[1440px]">
              <div 
                className="w-full h-[2px] bg-[#e7e3d6] rounded-full relative cursor-pointer hover:h-[4px] transition-all select-none"
                onClick={handleProgressBarClick}
                onMouseDown={handleProgressBarMouseDown}
                onMouseMove={handleProgressBarMouseMove}
              >
                <div
                  className="absolute h-[8px] bg-[#e7e3d6] rounded-full transition-all duration-300 -top-[3px]"
                  style={{
                    width: `${(1 / slides.length) * 100}%`,
                    left: `${(selectedIndex / slides.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTORS SECTION */}
            <section className="pt-24 sm:pt-32 md:pt-[320px] pb-12 sm:pb-16 md:pb-0 px-0 md:px-0 bg-[#fffcf8]">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif font-bold text-[14px] sm:text-[18px] md:text-[30px] uppercase tracking-[0.3em] mb-10 sm:mb-14 md:mb-20 text-center px-2 sm:px-8 md:px-16 leading-none md:leading-relaxed">
            <span className="block md:inline">THE SECTORS THAT</span>
            <br className="md:hidden" />
            <span className="block md:inline">SHAPE TOMORROW</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 bg-[#f5f1e8] min-h-[650px] sm:min-h-[700px] md:min-h-[800px] rounded-none md:rounded-lg overflow-hidden">
             <div className="p-6 sm:p-10 md:p-16 lg:p-24 text-left flex flex-col justify-end order-1 md:order-1">
                <h3 className="text-[#191817] font-serif font-normal text-[28px] sm:text-[36px] md:text-[52px] lg:text-[60px] leading-[1.1] mb-6 sm:mb-10 md:mb-12 uppercase">
                  PRIVATE EQUITY &<br />GROWTH
                </h3>
                <Link href="#" className="text-[#191817] font-serif text-[13px] sm:text-[14px] md:text-[16px] flex items-center gap-2 sm:gap-3 group uppercase tracking-[0.1em] sm:tracking-[0.15em]">
                  Read More
                  <svg className="w-10 sm:w-12 h-5 sm:h-6 text-[#191817] transition-transform group-hover:translate-x-1" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <line x1="2" y1="10" x2="35" y2="10" stroke="currentColor" strokeWidth="1"/>
                    <path d="M32 6L38 10L32 14" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
             </div>
             <div className="relative min-h-[280px] sm:min-h-[400px] md:min-h-[700px] order-2 md:order-2 mt-6 md:mt-0">
                <Image src="/assets/private-equity.png" className="object-contain object-bottom scale-100" alt="Private Equity" fill priority />
             </div>
          </div>
        </div>
      </section>

      {/* SECTORS OF FOCUS */}
            <section className="pt-24 sm:pt-32 md:pt-[320px] pb-12 sm:pb-16 md:pb-0 px-0 md:px-0 bg-[#fffcf8]">
        <div className="w-full">
          <h2 className="text-[#191817] font-serif font-bold text-[16px] sm:text-[20px] md:text-[30px] uppercase tracking-[0.3em] mb-10 sm:mb-14 md:mb-20 text-center px-4 sm:px-8 md:px-16">
            SECTORS OF FOCUS
          </h2>

          {/* Carousel Container - Full Width */}
          <div className="overflow-hidden w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] cursor-grab active:cursor-grabbing" ref={sectorsEmblaRef}>
            <div className="flex">
              {[
                { id: 1, img: '/assets/skyline.png', title: 'TECHNOLOGY & AI' },
                { id: 2, img: '/assets/skyline.png', title: 'FINANCIAL SERVICES & FINTECH' },
                { id: 3, img: '/assets/skyline.png', title: 'INFRASTRUCTURE' },
                { id: 4, img: '/assets/skyline.png', title: 'HEALTHCARE & BIOTECH' },
                { id: 5, img: '/assets/skyline.png', title: 'ENERGY & SUSTAINABILITY' },
                { id: 6, img: '/assets/skyline.png', title: 'REAL ESTATE & LOGISTICS' },
              ].map((sector) => (
                <div key={sector.id} className="flex-[0_0_78vw] sm:flex-[0_0_60vw] md:flex-[0_0_33.333vw] min-w-0 px-1 sm:px-1">
                  <div className="relative h-[520px] sm:h-[500px] md:h-[750px] group overflow-hidden bg-[#0b1320] rounded-none md:rounded-lg">
                    <Image src={sector.img} alt={sector.title} fill className="object-cover grayscale brightness-[0.7] group-hover:scale-110 transition-transform duration-1000" priority />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                  </div>
                  <div className="mt-4 sm:mt-6 px-2 sm:px-4">
                    <h3 className="text-[#191817] font-serif text-[13px] sm:text-[15px] md:text-[18px] uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] text-left leading-relaxed">{sector.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center items-center mt-8 sm:mt-12 px-4 sm:px-8 md:px-16">
            <div className="w-full max-w-[1440px]">
              <div 
                className="w-full h-[2px] bg-[#e7e3d6] relative cursor-pointer hover:h-[4px] transition-all select-none"
                onClick={handleSectorsProgressBarClick}
                onMouseDown={handleSectorsProgressBarMouseDown}
                onMouseMove={handleSectorsProgressBarMouseMove}
              >
                <div
                  className="absolute h-[8px] bg-[#e7e3d6] transition-all duration-300 -top-[3px]"
                  style={{
                    width: `${(1 / 6) * 100}%`,
                    left: `${(sectorsSelectedIndex / 6) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP SECTION */}
            <section className="pt-24 sm:pt-32 md:pt-[320px] pb-12 sm:pb-16 md:pb-20 px-0 md:px-0 bg-[#fffcf8]">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif font-bold text-[14px] sm:text-[18px] md:text-[30px] uppercase tracking-[0.3em] mb-10 sm:mb-14 md:mb-20 text-center px-2 sm:px-8 md:px-16 leading-relaxed">
            A DIFFERENT KIND OF PARTNERSHIP
          </h2>
          
          <div className="grid grid-cols-1 md:flex md:flex-wrap justify-center items-center gap-4 sm:gap-0 mb-12 sm:mb-16 md:mb-20">
             <div className="flex justify-center items-center py-6 sm:py-10 md:py-12 md:flex-1 md:border-r md:border-[#191817]/20 bg-[#f9f8f6] sm:bg-transparent rounded-lg sm:rounded-none">
                <div className="relative w-28 sm:w-40 md:w-56 h-12 sm:h-16 md:h-20">
                   <Image src="/assets/gh-logo.png" alt="Guggenheim" fill className="object-contain" />
                </div>
             </div>
             <div className="flex justify-center items-center py-6 sm:py-10 md:py-12 md:flex-1 md:border-r md:border-[#191817]/20 bg-[#f9f8f6] sm:bg-transparent rounded-lg sm:rounded-none">
                <div className="relative w-28 sm:w-40 md:w-56 h-12 sm:h-16 md:h-20">
                   <Image src="/assets/spacex-logo.png" alt="SpaceX" fill className="object-contain" />
                </div>
             </div>
             <div className="flex justify-center items-center py-6 sm:py-10 md:py-12 md:flex-1 md:border-r md:border-[#191817]/20 bg-[#f9f8f6] sm:bg-transparent rounded-lg sm:rounded-none">
                <div className="relative w-28 sm:w-40 md:w-56 h-12 sm:h-16 md:h-20">
                   <Image src="/assets/openai-logo.png" alt="OpenAI" fill className="object-contain" />
                </div>
             </div>
             <div className="flex justify-center items-center py-6 sm:py-10 md:py-12 md:flex-1 bg-[#f9f8f6] sm:bg-transparent rounded-lg sm:rounded-none">
                <div className="relative w-28 sm:w-40 md:w-56 h-12 sm:h-16 md:h-20">
                   <Image src="/assets/lambda-logo.png" alt="Lambda" fill className="object-contain" />
                </div>
             </div>
          </div>

          <Link href="#" className="text-[#191817] font-serif text-[14px] sm:text-[16px] md:text-[18px] flex flex-col justify-center items-center gap-2 group normal-case tracking-[0.15em] sm:tracking-[0.2em]">
            <span>Reveal More</span>
            <ChevronDown className="text-[#191817] transition-transform group-hover:translate-y-1" size={18} />
          </Link>
        </div>
      </section>

      {/* PARTNER WITH US */}
      <section className="pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-8 md:px-16 bg-[#f2efe6]">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif font-bold text-[16px] sm:text-[20px] md:text-[30px] uppercase tracking-[0.3em] mb-10 sm:mb-14 md:mb-20 text-center px-2 sm:px-8 md:px-16">
            PARTNER WITH US
          </h2>
          <p className="text-[#191817] font-serif text-[15px] sm:text-[17px] md:text-[20px] leading-[1.7] sm:leading-[1.8] mb-10 sm:mb-12 md:mb-14 opacity-80 px-2">
            We collaborate with partners who share our commitment to creating long-term value. 
            If you are building something meant to last, we are ready to build with you.
          </p>
          <Link href="#" className="group inline-flex items-center gap-3 sm:gap-4 justify-center text-[#191817] font-serif text-[16px] sm:text-[18px] md:text-[20px] tracking-normal">
            <span>Get in touch</span>
            <svg className="w-10 sm:w-12 h-5 sm:h-6 text-[#191817] transition-transform group-hover:translate-x-2" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <line x1="2" y1="10" x2="35" y2="10" stroke="currentColor" strokeWidth="1"/>
              <path d="M32 6L38 10L32 14" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
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
