'use client'

import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ArrowRight, Phone, Mail, MapPin, Clock } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { NavLangToggle, SidebarLangToggle } from '@/components/LanguageToggle'
import { useLanguage } from '@/components/LanguageProvider'
import EmblaCarousel from 'embla-carousel'

export default function ContactUs() {
  const { isArabic } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  // Office slider
  const officeEmblaRef = useRef<HTMLDivElement>(null)
  const [officeEmblaApi, setOfficeEmblaApi] = useState<ReturnType<typeof EmblaCarousel> | null>(null)
  const [officeSelectedIndex, setOfficeSelectedIndex] = useState(0)
  const [isDraggingOfficeProgress, setIsDraggingOfficeProgress] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    inquiry: '',
    communicationConsent: false,
    privacyPolicy: false,
    preferredContact: 'callback' as 'callback' | 'email'
  })

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

  // Offices data
  const offices = [
    {
      id: 1,
      name: 'Main Branch — Marina Mall',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      hours: 'Mon – Sat: 9:00 AM – 6:00 PM',
      phone: '+971 2 681 8444',
      address: 'Marina Mall, Corniche Road, Abu Dhabi, UAE',
      mapLink: '#'
    },
    {
      id: 2,
      name: 'Al Dafrah Branch',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      hours: 'Mon – Sat: 9:00 AM – 5:00 PM',
      phone: '+971 2 882 5500',
      address: 'Al Dafrah, Western Region, Abu Dhabi, UAE',
      mapLink: '#'
    },
    {
      id: 3,
      name: 'Sharjah Branch',
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80',
      hours: 'Mon – Sat: 9:00 AM – 6:00 PM',
      phone: '+971 6 574 3200',
      address: 'Al Majaz, Sharjah, UAE',
      mapLink: '#'
    },
    {
      id: 4,
      name: 'Al Ain Branch',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80',
      hours: 'Mon – Sat: 9:00 AM – 5:30 PM',
      phone: '+971 3 764 1100',
      address: 'Al Jimi, Al Ain, Abu Dhabi, UAE',
      mapLink: '#'
    },
    {
      id: 5,
      name: 'Dalma Mall Branch',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      hours: 'Mon – Sat: 10:00 AM – 10:00 PM',
      phone: '+971 2 550 8800',
      address: 'Dalma Mall, Mussafah, Abu Dhabi, UAE',
      mapLink: '#'
    }
  ]

  // FAQs data
  const faqs = [
    {
      question: 'How can I get in touch with Ethmar International Holding?',
      answer: 'You can reach us through our contact form above, by calling our toll-free number 600 52 3321, or by visiting any of our office locations across the UAE. Our team is available during business hours to assist you with any inquiries.'
    },
    {
      question: 'What are your general business hours?',
      answer: 'Our offices are generally open Monday through Saturday from 9:00 AM to 6:00 PM. However, hours may vary by branch location. Please check the specific office details in our offices section above for accurate timing.'
    },
    {
      question: 'How long does it typically take to receive a response?',
      answer: 'We aim to respond to all inquiries within 1–2 business days. For urgent matters, we recommend calling our toll-free number 600 52 3321 for immediate assistance during business hours.'
    },
    {
      question: 'Can I schedule an in-person meeting at one of your offices?',
      answer: 'Yes, absolutely. You can request an in-person meeting by filling out the contact form and mentioning your preferred date and time, or by calling the specific branch you would like to visit. We will confirm the meeting at the earliest convenience.'
    },
    {
      question: 'What types of inquiries can I submit through the contact form?',
      answer: 'Our contact form is designed to handle all types of inquiries including investment opportunities, partnership proposals, career questions, general information requests, and media inquiries. Please provide as much detail as possible so we can direct your query to the right team.'
    }
  ]

  // Office carousel setup
  useEffect(() => {
    if (!officeEmblaRef.current) return

    const embla = EmblaCarousel(officeEmblaRef.current, {
      loop: true,
      align: 'center',
      skipSnaps: false,
      containScroll: false,
      direction: isArabic ? 'rtl' : 'ltr'
    })

    setOfficeEmblaApi(embla)

    const onSelect = () => {
      setOfficeSelectedIndex(embla.selectedScrollSnap())
    }

    embla.on('select', onSelect)
    onSelect()

    return () => {
      embla.destroy()
    }
  }, [isArabic])

  const scrollOfficeTo = useCallback(
    (index: number) => {
      if (officeEmblaApi) officeEmblaApi.scrollTo(index)
    },
    [officeEmblaApi]
  )

  // Handle progress bar click for office carousel
  const handleOfficeProgressBarClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!officeEmblaApi) return
      const progressBar = e.currentTarget
      const rect = progressBar.getBoundingClientRect()
      const clickX = isArabic ? rect.right - e.clientX : e.clientX - rect.left
      const percentage = clickX / rect.width
      const targetIndex = Math.round(percentage * (offices.length - 1))
      scrollOfficeTo(targetIndex)
    },
    [officeEmblaApi, scrollOfficeTo, offices.length, isArabic]
  )

  // Handle progress bar mouse down for office carousel drag
  const handleOfficeProgressBarMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDraggingOfficeProgress(true)
      if (!officeEmblaApi) return
      const progressBar = e.currentTarget
      const rect = progressBar.getBoundingClientRect()
      const clickX = isArabic ? rect.right - e.clientX : e.clientX - rect.left
      const percentage = Math.max(0, Math.min(1, clickX / rect.width))
      const targetIndex = Math.round(percentage * (offices.length - 1))
      scrollOfficeTo(targetIndex)
    },
    [officeEmblaApi, scrollOfficeTo, offices.length, isArabic]
  )

  // Handle mouse move for office carousel drag
  const handleOfficeProgressBarMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDraggingOfficeProgress || !officeEmblaApi) return
      const progressBar = e.currentTarget
      const rect = progressBar.getBoundingClientRect()
      const clickX = isArabic ? rect.right - e.clientX : e.clientX - rect.left
      const percentage = Math.max(0, Math.min(1, clickX / rect.width))
      const targetIndex = Math.round(percentage * (offices.length - 1))
      scrollOfficeTo(targetIndex)
    },
    [isDraggingOfficeProgress, officeEmblaApi, scrollOfficeTo, offices.length, isArabic]
  )

  // Handle mouse up to stop dragging
  useEffect(() => {
    const handleMouseUp = () => {
      setIsDraggingOfficeProgress(false)
    }
    window.addEventListener('mouseup', handleMouseUp)
    return () => window.removeEventListener('mouseup', handleMouseUp)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic
    console.log('Form submitted:', formData)
  }

  return (
    <main data-testid="page-contact-us" className="bg-[#fffcf8] overflow-x-hidden">
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
                          href={item === 'EIH Legacy / Who We Are' ? '/who-we-are' : item === 'Blogs' ? '/blog' : '#'}
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
                  href="/contact-us"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-4 sm:py-6 flex justify-between items-center group"
                >
                  <span className="font-serif text-[24px] sm:text-[32px] md:text-[42px] text-[#b69c6b] group-hover:text-[#b69c6b] transition-colors uppercase tracking-[0.05em]">
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
                <SidebarLangToggle />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <header className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col bg-[#0b1320]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/hero.jpg" 
            className="w-full h-full object-cover grayscale brightness-[0.25] contrast-[1.1]"
            alt="Contact Us Background"
            fill
            priority
            style={{ transform: 'scaleX(-1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1320]/80 via-black/30 to-[#0b1320]"></div>
          <div className="absolute inset-0 bg-[#0b1320]/15"></div>
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

            <NavLangToggle className="text-[14px]" />
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
              <NavLangToggle className="text-[14px] md:text-[16px]" />
            </div>
          </nav>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-16">
          <div className="max-w-[1440px] mx-auto w-full text-center">
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
              <div className="w-12 sm:w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent to-[#b69c6b]/60"></div>
              <div className="w-2 h-2 bg-[#b69c6b] rotate-45"></div>
              <div className="w-12 sm:w-16 md:w-24 h-[1px] bg-gradient-to-l from-transparent to-[#b69c6b]/60"></div>
            </div>
            <p className="text-[#b69c6b] font-serif text-[11px] sm:text-[13px] tracking-[0.5em] uppercase mb-6 sm:mb-8">Get In Touch</p>
            <h1 className="text-white font-serif text-[40px] sm:text-[56px] md:text-[80px] lg:text-[100px] leading-[0.95] uppercase tracking-[0.04em] mb-8 sm:mb-10">
              <span className="block">Contact Us</span>
            </h1>
            <p className="text-white/70 font-serif text-[16px] sm:text-[19px] md:text-[24px] max-w-[800px] mx-auto leading-[1.6] italic">
              We would love to hear from you. Reach out to discuss opportunities, partnerships, or any inquiries.
            </p>
            {/* Bottom decorative element */}
            <div className="mt-10 sm:mt-14 flex justify-center">
              <div className="w-[1px] h-16 sm:h-20 bg-gradient-to-b from-[#b69c6b]/60 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-3 text-white/50 animate-bounce">
            <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-light">Explore</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </header>

      {/* CONTACT DETAILS SECTION */}
      <section className="pt-24 sm:pt-32 md:pt-[320px] pb-12 sm:pb-16 md:pb-20 px-4 sm:px-8 md:px-16 bg-[#f2efe6] relative overflow-hidden" data-scroll-animate>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#b69c6b]/[0.04] rounded-full blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#b69c6b]/[0.03] rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
              <div className="w-10 sm:w-14 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#b69c6b]/40"></div>
              <div className="w-2 h-2 bg-[#b69c6b] rotate-45"></div>
              <div className="w-10 sm:w-14 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#b69c6b]/40"></div>
            </div>
            <h2 className="text-[#191817] font-serif font-bold text-[18px] sm:text-[24px] md:text-[36px] uppercase tracking-[0.3em] mb-4 sm:mb-6 leading-none md:leading-relaxed">
              HOW TO REACH US
            </h2>
            <p className="text-[#191817]/70 font-serif text-[16px] sm:text-[18px] md:text-[20px] max-w-[600px] mx-auto italic">
              Multiple ways to connect with our team across the UAE
            </p>
          </div>

          {/* Contact Cards — 3 column */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Phone Card */}
            <div className="bg-[#0b1320] p-8 sm:p-10 md:p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#b69c6b]/[0.04] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              {/* Gold corner accents */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#b69c6b]/25"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#b69c6b]/25"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#b69c6b]/[0.1] flex items-center justify-center mb-7">
                  <Phone className="w-5 h-5 text-[#b69c6b]" />
                </div>
                <p className="text-white/80 font-serif font-semibold text-[13px] sm:text-[14px] tracking-[0.35em] uppercase mb-3">Toll Free</p>
                <a href="tel:6005233210" className="text-white font-serif text-[28px] sm:text-[32px] md:text-[36px] tracking-[0.04em] hover:text-[#b69c6b] transition-colors block leading-tight mb-4">
                  600 52 3321
                </a>
                <div className="w-10 h-[1px] bg-[#b69c6b]/20 mb-4"></div>
                <p className="text-white/50 font-serif text-[14px] sm:text-[15px] leading-relaxed">
                  Mon – Sat, 9:00 AM – 6:00 PM (GST)
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white p-8 sm:p-10 md:p-12 relative overflow-hidden group border border-[#191817]/[0.06]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#b69c6b]/[0.03] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#b69c6b]/[0.08] flex items-center justify-center mb-7">
                  <Mail className="w-5 h-5 text-[#b69c6b]" />
                </div>
                <p className="text-[#191817]/75 font-serif font-semibold text-[13px] sm:text-[14px] tracking-[0.35em] uppercase mb-3">Email Us</p>
                <a href="mailto:contact@ethmar.ae" className="text-[#191817] font-serif text-[19px] sm:text-[21px] md:text-[24px] hover:text-[#b69c6b] transition-colors block tracking-[0.01em] mb-2">
                  contact@ethmar.ae
                </a>
                <a href="mailto:invest@ethmar.ae" className="text-[#191817]/65 font-serif text-[17px] sm:text-[18px] md:text-[20px] hover:text-[#b69c6b] transition-colors block tracking-[0.01em] mb-4">
                  invest@ethmar.ae
                </a>
                <div className="w-10 h-[1px] bg-[#b69c6b]/20 mb-4"></div>
                <p className="text-[#191817]/50 font-serif text-[14px] sm:text-[15px] leading-relaxed">
                  Response within 1–2 business days
                </p>
              </div>
            </div>

            {/* Head Office Card */}
            <div className="bg-white p-8 sm:p-10 md:p-12 relative overflow-hidden group border border-[#191817]/[0.06]">
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#b69c6b]/[0.03] rounded-full translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#b69c6b]/[0.08] flex items-center justify-center mb-7">
                  <MapPin className="w-5 h-5 text-[#b69c6b]" />
                </div>
                <p className="text-[#191817]/75 font-serif font-semibold text-[13px] sm:text-[14px] tracking-[0.35em] uppercase mb-3">Head Office</p>
                <p className="text-[#191817] font-serif text-[19px] sm:text-[21px] md:text-[24px] tracking-[0.01em] leading-[1.5] mb-2">
                  Marina Mall, Corniche Road
                </p>
                <p className="text-[#191817]/65 font-serif text-[16px] sm:text-[17px] leading-relaxed mb-4">
                  Abu Dhabi, United Arab Emirates
                </p>
                <div className="w-10 h-[1px] bg-[#b69c6b]/20 mb-4"></div>
                <a href="#" className="inline-flex items-center gap-3 text-[#b69c6b] font-serif text-[11px] sm:text-[12px] tracking-[0.2em] uppercase hover:text-[#191817] transition-colors group/link">
                  <span>Get Directions</span>
                  <svg className={`transform w-8 h-3 transition-transform ${isArabic ? 'rotate-180 group-hover/link:-translate-x-1' : 'group-hover/link:translate-x-1'}`} viewBox="0 0 32 12" fill="none">
                    <line x1="0" y1="6" x2="25" y2="6" stroke="currentColor" strokeWidth="1"/>
                    <path d="M22 3L28 6L22 9" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className="pt-24 sm:pt-32 md:pt-[320px] pb-12 sm:pb-16 md:pb-20 px-4 sm:px-8 md:px-16 bg-[#fffcf8] relative" data-scroll-animate>
        <div className="absolute top-20 right-0 w-72 h-72 bg-[#b69c6b]/[0.03] rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#b69c6b]/[0.02] rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[860px] mx-auto relative">
          {/* Section Header */}
          <div className="text-center mb-14 sm:mb-18 md:mb-20">
            <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
              <div className="w-10 sm:w-14 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#b69c6b]/40"></div>
              <div className="w-2 h-2 bg-[#b69c6b] rotate-45"></div>
              <div className="w-10 sm:w-14 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#b69c6b]/40"></div>
            </div>
            <h2 className="text-[#191817] font-serif font-bold text-[18px] sm:text-[24px] md:text-[36px] uppercase tracking-[0.3em] mb-4 sm:mb-6 leading-none md:leading-relaxed">
              SEND US A MESSAGE
            </h2>
            <p className="text-[#191817]/70 font-serif text-[16px] sm:text-[18px] md:text-[20px] max-w-[550px] mx-auto italic">
              Fill in your details and our team will respond within 1–2 business days
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block font-serif text-[12px] sm:text-[13px] tracking-[0.25em] uppercase text-[#191817]/60 mb-3">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-[#191817]/25 focus:border-[#b69c6b] py-3.5 font-serif text-[16px] sm:text-[18px] text-[#191817] outline-none transition-colors placeholder:text-[#191817]/40"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block font-serif text-[12px] sm:text-[13px] tracking-[0.25em] uppercase text-[#191817]/60 mb-3">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-[#191817]/25 focus:border-[#b69c6b] py-3.5 font-serif text-[16px] sm:text-[18px] text-[#191817] outline-none transition-colors placeholder:text-[#191817]/40"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block font-serif text-[12px] sm:text-[13px] tracking-[0.25em] uppercase text-[#191817]/60 mb-3">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-[#191817]/25 focus:border-[#b69c6b] py-3.5 font-serif text-[16px] sm:text-[18px] text-[#191817] outline-none transition-colors placeholder:text-[#191817]/40"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block font-serif text-[12px] sm:text-[13px] tracking-[0.25em] uppercase text-[#191817]/60 mb-3">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b-2 border-[#191817]/25 focus:border-[#b69c6b] py-3.5 font-serif text-[16px] sm:text-[18px] text-[#191817] outline-none transition-colors placeholder:text-[#191817]/40"
                  placeholder="+971 XX XXX XXXX"
                />
              </div>
            </div>

            <div>
              <label className="block font-serif text-[12px] sm:text-[13px] tracking-[0.25em] uppercase text-[#191817]/60 mb-3">Inquiry Details *</label>
              <textarea
                name="inquiry"
                value={formData.inquiry}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full bg-[#fdfbf8] border-2 border-[#191817]/15 focus:border-[#b69c6b] p-5 font-serif text-[16px] sm:text-[18px] text-[#191817] outline-none transition-colors resize-none placeholder:text-[#191817]/40"
                placeholder="Tell us about your inquiry..."
              />
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className="block font-serif text-[12px] sm:text-[13px] tracking-[0.25em] uppercase text-[#191817]/60 mb-5">Preferred Contact Method</label>
              <div className="flex gap-8 sm:gap-10">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input type="radio" name="preferredContact" value="callback" checked={formData.preferredContact === 'callback'} onChange={handleInputChange} className="sr-only" />
                    <div className={`w-[18px] h-[18px] rounded-full border-[1.5px] transition-colors flex items-center justify-center ${formData.preferredContact === 'callback' ? 'border-[#b69c6b]' : 'border-[#191817]/25 group-hover:border-[#b69c6b]/40'}`}>
                      {formData.preferredContact === 'callback' && <div className="w-2 h-2 rounded-full bg-[#b69c6b]"></div>}
                    </div>
                  </div>
                  <span className="font-serif text-[15px] sm:text-[16px] text-[#191817]">Request a Callback</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input type="radio" name="preferredContact" value="email" checked={formData.preferredContact === 'email'} onChange={handleInputChange} className="sr-only" />
                    <div className={`w-[18px] h-[18px] rounded-full border-[1.5px] transition-colors flex items-center justify-center ${formData.preferredContact === 'email' ? 'border-[#b69c6b]' : 'border-[#191817]/25 group-hover:border-[#b69c6b]/40'}`}>
                      {formData.preferredContact === 'email' && <div className="w-2 h-2 rounded-full bg-[#b69c6b]"></div>}
                    </div>
                  </div>
                  <span className="font-serif text-[15px] sm:text-[16px] text-[#191817]">Email Response</span>
                </label>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-5">
              <label className="flex items-start gap-3.5 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input type="checkbox" name="communicationConsent" checked={formData.communicationConsent} onChange={handleCheckboxChange} className="sr-only" />
                  <div className={`w-[18px] h-[18px] rounded-[2px] border-[1.5px] transition-all flex items-center justify-center ${formData.communicationConsent ? 'border-[#b69c6b] bg-[#b69c6b]' : 'border-[#191817]/25 group-hover:border-[#b69c6b]/40'}`}>
                    {formData.communicationConsent && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="font-serif text-[14px] sm:text-[15px] text-[#191817]/70 leading-relaxed">
                  I consent to receiving communications from Ethmar International Holding regarding my inquiry and related services.
                </span>
              </label>
              <label className="flex items-start gap-3.5 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input type="checkbox" name="privacyPolicy" checked={formData.privacyPolicy} onChange={handleCheckboxChange} required className="sr-only" />
                  <div className={`w-[18px] h-[18px] rounded-[2px] border-[1.5px] transition-all flex items-center justify-center ${formData.privacyPolicy ? 'border-[#b69c6b] bg-[#b69c6b]' : 'border-[#191817]/25 group-hover:border-[#b69c6b]/40'}`}>
                    {formData.privacyPolicy && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="font-serif text-[14px] sm:text-[15px] text-[#191817]/70 leading-relaxed">
                  I have read and agree to the <Link href="#" className="text-[#b69c6b] hover:text-[#191817] transition-colors">Privacy Policy</Link> *
                </span>
              </label>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-[#191817]/[0.06]"></div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="group relative inline-flex items-center gap-4 bg-[#0b1320] hover:bg-[#b69c6b] text-white font-serif text-[13px] sm:text-[14px] tracking-[0.25em] uppercase px-12 sm:px-16 py-4.5 sm:py-5 transition-all duration-500"
              >
                <span className="relative z-10">Submit Inquiry</span>
                <ArrowRight className={`w-4 h-4 relative z-10 transition-transform ${isArabic ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* OFFICES SLIDER SECTION */}
      <section className="pt-24 sm:pt-32 md:pt-[320px] pb-12 sm:pb-16 md:pb-20 px-4 sm:px-8 md:px-16 bg-[#0b1320] relative overflow-hidden" data-scroll-animate>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#b69c6b]/[0.03] rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#b69c6b]/[0.02] rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          {/* Section Header */}
          <div className="text-center px-4 sm:px-8 md:px-16 mb-12 sm:mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
              <div className="w-10 sm:w-14 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#b69c6b]/40"></div>
              <div className="w-2 h-2 bg-[#b69c6b] rotate-45"></div>
              <div className="w-10 sm:w-14 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#b69c6b]/40"></div>
            </div>
            <h2 className="text-white font-serif font-bold text-[14px] sm:text-[18px] md:text-[30px] uppercase tracking-[0.3em] mb-4 sm:mb-6 leading-none md:leading-relaxed">
              OUR OFFICES
            </h2>
            <p className="text-white/40 font-serif text-[14px] sm:text-[16px] md:text-[18px] max-w-[700px] mx-auto italic leading-relaxed">
              Experience our presence across the United Arab Emirates — visit any of our strategically located offices
            </p>
          </div>

          {/* Carousel Container - Full Width */}
          <div className="overflow-hidden w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] cursor-grab active:cursor-grabbing" ref={officeEmblaRef}>
            <div className="flex">
              {offices.map((office) => (
                <div key={office.id} className="flex-[0_0_92vw] sm:flex-[0_0_85vw] md:flex-[0_0_70vw] min-w-0 px-2 sm:px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[480px] sm:min-h-[520px] md:min-h-[580px] group/card">
                    {/* Office Image */}
                    <div className="relative overflow-hidden min-h-[240px] sm:min-h-[280px] md:min-h-0 bg-[#0b1320]">
                      <img src={office.image} alt={office.name} className="absolute inset-0 w-full h-full object-cover grayscale-[30%] brightness-[0.55] group-hover/card:brightness-[0.65] group-hover/card:scale-105 transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10"></div>
                      {/* Gold corner accents */}
                      <div className="absolute top-5 left-5 sm:top-7 sm:left-7 w-8 sm:w-12 h-8 sm:h-12 border-t border-l border-[#b69c6b]/40"></div>
                      <div className="absolute bottom-16 right-5 sm:bottom-20 sm:right-7 w-8 sm:w-12 h-8 sm:h-12 border-b border-r border-[#b69c6b]/40"></div>
                      {/* Branch number + name overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                        <p className="text-[#b69c6b] font-serif text-[10px] sm:text-[11px] tracking-[0.4em] uppercase mb-2">Branch {String(office.id).padStart(2, '0')}</p>
                        <p className="text-white font-serif text-[16px] sm:text-[20px] md:text-[24px] tracking-[0.04em] leading-tight">{office.name}</p>
                      </div>
                    </div>
                    {/* Office Details */}
                    <div className="bg-[#f9f7f2] border-t md:border-t-0 md:border-l border-[#b69c6b]/15 px-7 sm:px-10 md:px-14 py-8 sm:py-10 md:py-14 flex flex-col justify-center relative">
                      <div className="absolute top-0 left-7 sm:left-10 md:left-14 w-10 h-[2px] bg-[#b69c6b]/25 md:hidden"></div>
                      <div className="hidden md:block absolute top-14 left-0 h-10 w-[2px] bg-[#b69c6b]/25"></div>
                      <div className="max-w-[480px]">
                        <div className="space-y-6 sm:space-y-7">
                          <div className="flex items-start gap-5">
                            <div className="w-10 h-10 rounded-full bg-[#b69c6b]/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Clock className="w-[18px] h-[18px] text-[#b69c6b]" />
                            </div>
                            <div>
                              <p className="text-[#191817]/40 font-serif text-[10px] sm:text-[11px] tracking-[0.25em] uppercase mb-1.5">Working Hours</p>
                              <p className="text-[#191817] font-serif text-[14px] sm:text-[16px] md:text-[17px] font-medium">{office.hours}</p>
                            </div>
                          </div>
                          <div className="w-full h-[1px] bg-[#191817]/[0.06]"></div>
                          <div className="flex items-start gap-5">
                            <div className="w-10 h-10 rounded-full bg-[#b69c6b]/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Phone className="w-[18px] h-[18px] text-[#b69c6b]" />
                            </div>
                            <div>
                              <p className="text-[#191817]/40 font-serif text-[10px] sm:text-[11px] tracking-[0.25em] uppercase mb-1.5">Telephone</p>
                              <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-[#191817] font-serif text-[14px] sm:text-[16px] md:text-[17px] font-medium hover:text-[#b69c6b] transition-colors">
                                {office.phone}
                              </a>
                            </div>
                          </div>
                          <div className="w-full h-[1px] bg-[#191817]/[0.06]"></div>
                          <div className="flex items-start gap-5">
                            <div className="w-10 h-10 rounded-full bg-[#b69c6b]/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <MapPin className="w-[18px] h-[18px] text-[#b69c6b]" />
                            </div>
                            <div>
                              <p className="text-[#191817]/40 font-serif text-[10px] sm:text-[11px] tracking-[0.25em] uppercase mb-1.5">Location</p>
                              <p className="text-[#191817] font-serif text-[14px] sm:text-[16px] md:text-[17px] font-medium leading-relaxed">{office.address}</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#191817]/[0.06]">
                          <a href={office.mapLink} className="inline-flex items-center gap-3 text-[#b69c6b] font-serif text-[12px] sm:text-[13px] tracking-[0.2em] uppercase hover:text-[#191817] transition-colors group/dir">
                            <span>Get Directions</span>
                            <svg className={`w-10 sm:w-12 h-4 transition-transform ${isArabic ? 'rotate-180 group-hover/dir:-translate-x-1' : 'group-hover/dir:translate-x-1'}`} viewBox="0 0 40 16" fill="none">
                              <line x1="0" y1="8" x2="32" y2="8" stroke="currentColor" strokeWidth="1"/>
                              <path d="M29 4L35 8L29 12" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </a>
                        </div>
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
                className="w-full h-[2px] bg-white/[0.12] rounded-full relative cursor-pointer hover:h-[4px] transition-all select-none"
                onClick={handleOfficeProgressBarClick}
                onMouseDown={handleOfficeProgressBarMouseDown}
                onMouseMove={handleOfficeProgressBarMouseMove}
              >
                <div
                  className="absolute h-[8px] bg-white/25 rounded-full transition-all duration-300 -top-[3px]"
                  style={{
                    width: `${(1 / offices.length) * 100}%`,
                    ...(isArabic
                      ? { right: `${(officeSelectedIndex / offices.length) * 100}%`, left: 'auto' }
                      : { left: `${(officeSelectedIndex / offices.length) * 100}%` }),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="pt-24 sm:pt-32 md:pt-[320px] pb-12 sm:pb-16 md:pb-20 px-4 sm:px-8 md:px-16 bg-[#fffcf8] relative" data-scroll-animate>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#b69c6b]/[0.02] rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-[900px] mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
              <div className="w-10 sm:w-14 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#b69c6b]/40"></div>
              <div className="w-2 h-2 bg-[#b69c6b] rotate-45"></div>
              <div className="w-10 sm:w-14 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#b69c6b]/40"></div>
            </div>
            <h2 className="text-[#191817] font-serif font-bold text-[14px] sm:text-[18px] md:text-[30px] uppercase tracking-[0.3em] mb-4 sm:mb-6 leading-none md:leading-relaxed">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-[#191817]/60 font-serif text-[14px] sm:text-[16px] md:text-[18px] max-w-[600px] mx-auto">
              Find answers to common questions about reaching out to us
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-[#191817]/10">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full py-6 sm:py-8 flex justify-between items-start gap-4 text-left group"
                >
                  <div className="flex items-start gap-4 sm:gap-6 pr-4">
                    <span className="font-serif text-[13px] sm:text-[14px] text-[#b69c6b]/50 tracking-[0.1em] mt-0.5 sm:mt-1 flex-shrink-0 font-medium">{String(index + 1).padStart(2, '0')}</span>
                    <span className="font-serif text-[15px] sm:text-[17px] md:text-[20px] text-[#191817] group-hover:text-[#b69c6b] transition-colors leading-relaxed">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#191817]/15 flex items-center justify-center transition-all duration-300 ${
                    activeFaq === index ? 'bg-[#b69c6b] border-[#b69c6b] rotate-180' : 'group-hover:border-[#b69c6b]'
                  }`}>
                    <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                      activeFaq === index ? 'text-white' : 'text-[#191817]/50 group-hover:text-[#b69c6b]'
                    }`} />
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    activeFaq === index ? 'max-h-[400px] pb-6 sm:pb-8' : 'max-h-0'
                  }`}
                >
                  <p className="font-serif text-[14px] sm:text-[15px] md:text-[17px] text-[#191817]/65 leading-[1.8] pr-12 sm:pr-16">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-8 md:px-16 bg-[#f2efe6] relative overflow-hidden" data-scroll-animate>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
        <div className="max-w-[900px] mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
            <div className="w-10 sm:w-14 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#b69c6b]/40"></div>
            <div className="w-2 h-2 bg-[#b69c6b] rotate-45"></div>
            <div className="w-10 sm:w-14 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#b69c6b]/40"></div>
          </div>
          <h2 className="text-[#191817] font-serif font-bold text-[16px] sm:text-[20px] md:text-[30px] uppercase tracking-[0.3em] mb-6 sm:mb-8">
            PARTNER WITH US
          </h2>
          <p className="text-[#191817] font-serif text-[15px] sm:text-[17px] md:text-[20px] leading-[1.7] sm:leading-[1.8] mb-10 sm:mb-12 md:mb-14 opacity-70 px-2">
            We collaborate with partners who share our commitment to creating long-term value. 
            If you are building something meant to last, we are ready to build with you.
          </p>
          <Link href="/who-we-are" className="group inline-flex items-center gap-3 sm:gap-4 justify-center text-[#191817] font-serif text-[16px] sm:text-[18px] md:text-[20px] tracking-normal">
            <span>Learn About Us</span>
            <svg className={`w-10 sm:w-12 h-5 sm:h-6 text-[#191817] transition-transform ${isArabic ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
                <Link href="/contact-us" className="hover:opacity-80 transition-opacity uppercase py-2">CONTACT US</Link>
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
