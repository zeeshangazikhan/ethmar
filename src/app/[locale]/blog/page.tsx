'use client'

import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ArrowRight, Calendar, Clock, User } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { NavLangToggle, SidebarLangToggle } from '@/components/LanguageToggle'
import { useLanguage } from '@/components/LanguageProvider'
import EmblaCarousel from 'embla-carousel'

export default function Blog() {
  const { isArabic, t, locale } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<'all' | 'news' | 'press'>('all')

  // Featured slider
  const featuredEmblaRef = useRef<HTMLDivElement>(null)
  const [featuredEmblaApi, setFeaturedEmblaApi] = useState<ReturnType<typeof EmblaCarousel> | null>(null)
  const [featuredSelectedIndex, setFeaturedSelectedIndex] = useState(0)
  const [isDraggingFeaturedProgress, setIsDraggingFeaturedProgress] = useState(false)

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
    { title: t('nav.aboutUs'), key: 'aboutUs', items: [
      { label: t('navSub.eihLegacy'), href: `/${locale}/who-we-are` },
      { label: t('navSub.visionMission'), href: '#' },
      { label: t('navSub.leadership'), href: '#' },
      { label: t('navSub.sustainability'), href: '#' },
    ]},
    { title: t('nav.investmentSectors'), key: 'investmentSectors', items: [
      { label: t('navSub.growthCapital'), href: '#' },
      { label: t('navSub.privateEquity'), href: '#' },
      { label: t('navSub.capitalMarkets'), href: '#' },
      { label: t('navSub.privateCredit'), href: '#' },
    ]},
    { title: t('nav.careers'), key: 'careers', items: [
      { label: t('navSub.lifeAtEih'), href: '#' },
      { label: t('navSub.careerOpportunities'), href: '#' },
    ]},
    { title: t('nav.newsInsights'), key: 'newsInsights', items: [
      { label: t('navSub.newsroom'), href: '#' },
      { label: t('navSub.reports'), href: '#' },
      { label: t('navSub.blogs'), href: `/${locale}/blog` },
    ]},
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

  // Featured posts data
  const featuredPosts = [
    {
      id: 1,
      slug: 'eih-announces-strategic-partnership-with-global-tech-leaders',
      title: t('blogPosts.post1.title'),
      excerpt: t('blogPosts.post1.excerpt'),
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      category: 'news',
      date: t('blogPosts.post1.date'),
      readTime: t('blogPosts.post1.readTime'),
      author: t('blogPosts.post1.author')
    },
    {
      id: 2,
      slug: 'quarterly-investment-report-q4-2025',
      title: t('blogPosts.post2.title'),
      excerpt: t('blogPosts.post2.excerpt'),
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      category: 'news',
      date: t('blogPosts.post2.date'),
      readTime: t('blogPosts.post2.readTime'),
      author: t('blogPosts.post2.author')
    },
    {
      id: 3,
      slug: 'eih-recognized-for-sustainable-investment-practices',
      title: t('blogPosts.post3.title'),
      excerpt: t('blogPosts.post3.excerpt'),
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      category: 'press',
      date: t('blogPosts.post3.date'),
      readTime: t('blogPosts.post3.readTime'),
      author: t('blogPosts.post3.author')
    },
    {
      id: 4,
      slug: 'expansion-into-emerging-markets',
      title: t('blogPosts.post4.title'),
      excerpt: t('blogPosts.post4.excerpt'),
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80',
      category: 'news',
      date: t('blogPosts.post4.date'),
      readTime: t('blogPosts.post4.readTime'),
      author: t('blogPosts.post4.author')
    },
    {
      id: 5,
      slug: 'annual-sustainability-report-2025',
      title: t('blogPosts.post5.title'),
      excerpt: t('blogPosts.post5.excerpt'),
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      category: 'press',
      date: t('blogPosts.post5.date'),
      readTime: t('blogPosts.post5.readTime'),
      author: t('blogPosts.post5.author')
    }
  ]

  // All blog posts data
  const allPosts = [
    ...featuredPosts,
    {
      id: 6,
      slug: 'digital-transformation-in-financial-services',
      title: t('blogPosts.post6.title'),
      excerpt: t('blogPosts.post6.excerpt'),
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      category: 'news',
      date: t('blogPosts.post6.date'),
      readTime: t('blogPosts.post6.readTime'),
      author: t('blogPosts.post6.author')
    },
    {
      id: 7,
      slug: 'eih-ceo-speaks-at-world-economic-forum',
      title: t('blogPosts.post7.title'),
      excerpt: t('blogPosts.post7.excerpt'),
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
      category: 'press',
      date: t('blogPosts.post7.date'),
      readTime: t('blogPosts.post7.readTime'),
      author: t('blogPosts.post7.author')
    },
    {
      id: 8,
      slug: 'infrastructure-investment-opportunities',
      title: t('blogPosts.post8.title'),
      excerpt: t('blogPosts.post8.excerpt'),
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
      category: 'news',
      date: t('blogPosts.post8.date'),
      readTime: t('blogPosts.post8.readTime'),
      author: t('blogPosts.post8.author')
    },
    {
      id: 9,
      slug: 'new-partnership-announcement-healthcare',
      title: t('blogPosts.post9.title'),
      excerpt: t('blogPosts.post9.excerpt'),
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
      category: 'press',
      date: t('blogPosts.post9.date'),
      readTime: t('blogPosts.post9.readTime'),
      author: t('blogPosts.post9.author')
    },
    {
      id: 10,
      slug: 'market-insights-technology-sector',
      title: t('blogPosts.post10.title'),
      excerpt: t('blogPosts.post10.excerpt'),
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      category: 'news',
      date: t('blogPosts.post10.date'),
      readTime: t('blogPosts.post10.readTime'),
      author: t('blogPosts.post10.author')
    },
    {
      id: 11,
      slug: 'eih-receives-excellence-award',
      title: t('blogPosts.post11.title'),
      excerpt: t('blogPosts.post11.excerpt'),
      image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80',
      category: 'press',
      date: t('blogPosts.post11.date'),
      readTime: t('blogPosts.post11.readTime'),
      author: t('blogPosts.post11.author')
    },
    {
      id: 12,
      slug: 'renewable-energy-investment-strategy',
      title: t('blogPosts.post12.title'),
      excerpt: t('blogPosts.post12.excerpt'),
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
      category: 'news',
      date: t('blogPosts.post12.date'),
      readTime: t('blogPosts.post12.readTime'),
      author: t('blogPosts.post12.author')
    }
  ]

  // Filter posts based on category
  const filteredPosts = activeCategory === 'all' 
    ? allPosts 
    : allPosts.filter(post => post.category === activeCategory)

  // Featured carousel setup
  useEffect(() => {
    if (!featuredEmblaRef.current) return

    const embla = EmblaCarousel(featuredEmblaRef.current, {
      loop: true,
      align: 'center',
      skipSnaps: false,
      containScroll: false,
      direction: isArabic ? 'rtl' : 'ltr'
    })

    setFeaturedEmblaApi(embla)

    const onSelect = () => {
      setFeaturedSelectedIndex(embla.selectedScrollSnap())
    }

    embla.on('select', onSelect)
    onSelect()

    return () => {
      embla.destroy()
    }
  }, [isArabic])

  const scrollFeaturedTo = useCallback(
    (index: number) => {
      if (featuredEmblaApi) featuredEmblaApi.scrollTo(index)
    },
    [featuredEmblaApi]
  )

  // Handle progress bar click for featured carousel
  const handleFeaturedProgressBarClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!featuredEmblaApi) return
      const progressBar = e.currentTarget
      const rect = progressBar.getBoundingClientRect()
      const clickX = isArabic ? rect.right - e.clientX : e.clientX - rect.left
      const percentage = clickX / rect.width
      const targetIndex = Math.round(percentage * (featuredPosts.length - 1))
      scrollFeaturedTo(targetIndex)
    },
    [featuredEmblaApi, scrollFeaturedTo, featuredPosts.length, isArabic]
  )

  // Handle progress bar mouse down for featured carousel drag
  const handleFeaturedProgressBarMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDraggingFeaturedProgress(true)
      if (!featuredEmblaApi) return
      const progressBar = e.currentTarget
      const rect = progressBar.getBoundingClientRect()
      const clickX = isArabic ? rect.right - e.clientX : e.clientX - rect.left
      const percentage = Math.max(0, Math.min(1, clickX / rect.width))
      const targetIndex = Math.round(percentage * (featuredPosts.length - 1))
      scrollFeaturedTo(targetIndex)
    },
    [featuredEmblaApi, scrollFeaturedTo, featuredPosts.length, isArabic]
  )

  // Handle mouse move for featured carousel drag
  const handleFeaturedProgressBarMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDraggingFeaturedProgress || !featuredEmblaApi) return
      const progressBar = e.currentTarget
      const rect = progressBar.getBoundingClientRect()
      const clickX = isArabic ? rect.right - e.clientX : e.clientX - rect.left
      const percentage = Math.max(0, Math.min(1, clickX / rect.width))
      const targetIndex = Math.round(percentage * (featuredPosts.length - 1))
      scrollFeaturedTo(targetIndex)
    },
    [isDraggingFeaturedProgress, featuredEmblaApi, scrollFeaturedTo, featuredPosts.length, isArabic]
  )

  // Handle mouse up to stop dragging
  useEffect(() => {
    const handleMouseUp = () => {
      setIsDraggingFeaturedProgress(false)
    }
    window.addEventListener('mouseup', handleMouseUp)
    return () => window.removeEventListener('mouseup', handleMouseUp)
  }, [])

  return (
    <main data-testid="page-blog" className="bg-[#fffcf8] overflow-x-hidden">
      {/* FULL SCREEN MENU OVERLAY */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#fffcf8] transition-transform duration-500 ease-in-out ${
          menuOpen ? 'translate-x-0' : (isArabic ? '-translate-x-full' : 'translate-x-full')
        }`}
      >
        {/* Menu Header */}
        <div className="py-6 sm:py-10 px-4 sm:px-8 md:px-16">
          <div className="flex justify-between items-center">
            <Link href="/" className="font-serif text-[18px] sm:text-[20px] md:text-[26px] tracking-[0.15em] text-[#191817]">{t('common.brand')}</Link>
            <button 
              onClick={() => {
                setMenuOpen(false)
                setActiveSubmenu(null)
              }}
              className="p-2 text-[#191817] hover:text-[#b69c6b] transition-colors"
              aria-label={t('common.closeMenu')}
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
                    onClick={() => setActiveSubmenu(activeSubmenu === nav.key ? null : nav.key)}
                    className="w-full py-4 sm:py-6 flex justify-between items-center group"
                  >
                    <span className={`font-serif text-[24px] sm:text-[32px] md:text-[42px] group-hover:text-[#b69c6b] transition-colors uppercase tracking-[0.05em] ${nav.key === 'newsInsights' ? 'text-[#b69c6b]' : 'text-[#191817]'}`}>
                      {nav.title}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-[#191817] group-hover:text-[#b69c6b] transition-all duration-300 ${
                        activeSubmenu === nav.key ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  {/* Submenu */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      activeSubmenu === nav.key ? 'max-h-[500px] pb-4' : 'max-h-0'
                    }`}
                  >
                    <div className={`${isArabic ? 'pr-4 sm:pr-8' : 'pl-4 sm:pl-8'} space-y-3`}>
                      {nav.items.map((item, itemIndex) => (
                        <Link 
                          key={itemIndex}
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className={`block font-serif text-[16px] sm:text-[18px] md:text-[20px] hover:text-[#b69c6b] transition-colors ${item.href === `/${locale}/blog` ? 'text-[#b69c6b]' : 'text-[#191817]'}`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Contact Us - Direct Link */}
              <div className="border-b border-[#191817]/10">
                <Link
                  href={`/${locale}/contact-us`}
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-4 sm:py-6 flex justify-between items-center group"
                >
                  <span className="font-serif text-[24px] sm:text-[32px] md:text-[42px] text-[#191817] group-hover:text-[#b69c6b] transition-colors uppercase tracking-[0.05em]">
                    {t('nav.contactUs')}
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Side - Contact Info */}
            <div className={`lg:border-${isArabic ? 'r' : 'l'} lg:border-[#191817]/10 ${isArabic ? 'lg:pr-16' : 'lg:pl-16'}`}>
              <div className="space-y-8">
                <div>
                  <h3 className="font-serif text-[20px] sm:text-[24px] md:text-[28px] text-[#191817] mb-3">{t('nav.contactUs')}</h3>
                  <div className="w-12 h-[2px] bg-[#b69c6b]"></div>
                </div>
                
                <div className="space-y-4">
                  <a href="tel:+97112340000" className="block font-serif text-[16px] sm:text-[18px] text-[#191817] hover:text-[#b69c6b] transition-colors underline">
                    {t('contact.phone')}
                  </a>
                  <a href="mailto:contact@ethmar.ae" className="block font-serif text-[16px] sm:text-[18px] text-[#191817] hover:text-[#b69c6b] transition-colors underline">
                    {t('contact.email')}
                  </a>
                </div>

                {/* Social Icons */}
                <div className="flex gap-4 pt-4">
                  <a href="#" className="text-[#191817]/50 hover:text-[#b69c6b] transition-colors" aria-label={t('social.facebook')}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-[#191817]/50 hover:text-[#b69c6b] transition-colors" aria-label={t('social.instagram')}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-[#191817]/50 hover:text-[#b69c6b] transition-colors" aria-label={t('social.linkedin')}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-[#191817]/50 hover:text-[#b69c6b] transition-colors" aria-label={t('social.twitter')}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-[#191817]/50 hover:text-[#b69c6b] transition-colors" aria-label={t('social.youtube')}>
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
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80" 
            className="w-full h-full object-cover grayscale brightness-[0.4]"
            alt={t('blog.heroAlt')}
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-[#0b1320]"></div>
        </div>

        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-50 py-6 sm:py-10 px-4 sm:px-8 md:px-16">
          {/* Mobile header */}
          <nav className="md:hidden flex items-center justify-between text-white">
            <button 
              className="flex flex-col justify-center items-center gap-1.5 p-2"
              aria-label={t('common.menu')}
              onClick={() => setMenuOpen(true)}
            >
              <span className="block w-6 h-[2px] bg-white"></span>
              <span className="block w-6 h-[2px] bg-white"></span>
            </button>

            <Link href="/" className="font-serif text-[18px] sm:text-[20px] tracking-[0.15em]">{t('common.brand')}</Link>

            <NavLangToggle className="text-[14px]" />
          </nav>

          {/* Desktop header */}
          <nav className="hidden md:flex justify-between items-center text-white">
            <div className="flex items-center">
               <Link href="/" className="font-serif text-[18px] sm:text-[20px] md:text-[26px] tracking-[0.15em]">{t('common.brand')}</Link>
            </div>
            <div className="hidden md:flex flex-col items-center text-center text-[12px] md:text-[14px] tracking-[0.35em] uppercase opacity-95">
              <span className="mt-1 text-[12px] md:text-[18px]">{t('common.brandFull')}</span>
            </div>
            <div className="flex gap-3 sm:gap-4 items-center text-[12px] md:text-[14px] tracking-[0.3em] font-medium">
              <button 
                className="flex flex-col justify-center items-center gap-1.5 sm:gap-2 p-2" 
                aria-label={t('common.menu')}
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
            <p className="text-[#b69c6b] font-serif text-[11px] sm:text-[13px] tracking-[0.5em] uppercase mb-6 sm:mb-8">{t('blog.heroKicker')}</p>
            <h1 className="text-white font-serif text-[40px] sm:text-[56px] md:text-[80px] lg:text-[100px] leading-[0.95] uppercase tracking-[0.04em] mb-8 sm:mb-10">
              <span className="block">{t('blog.heroTitle')}</span>
            </h1>
            <p className="text-white/70 font-serif text-[16px] sm:text-[19px] md:text-[24px] max-w-[800px] mx-auto leading-[1.6] italic">
              {t('blog.heroDescription')}
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

      {/* FEATURED POSTS SECTION */}
      <section className="pt-24 sm:pt-32 md:pt-[320px] pb-12 sm:pb-16 md:pb-20 px-4 sm:px-8 md:px-16 bg-[#fffcf8]" data-scroll-animate>
        <div className="w-full">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-8 md:px-16">
            {/* <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
              <div className="w-10 sm:w-14 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#b69c6b]/40"></div>
              <div className="w-2 h-2 bg-[#b69c6b] rotate-45"></div>
              <div className="w-10 sm:w-14 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#b69c6b]/40"></div>
            </div> */}
            <h2 className="text-[#191817] font-serif font-bold text-[14px] sm:text-[18px] md:text-[30px] uppercase tracking-[0.3em] leading-none md:leading-relaxed">
              {t('blog.featuredStories')}
            </h2>
          </div>

          {/* Featured Carousel Container - Full Width */}
          <div className="overflow-hidden w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] cursor-grab active:cursor-grabbing" ref={featuredEmblaRef}>
            <div className="flex">
              {featuredPosts.map((post) => (
                <div key={post.id} className="flex-[0_0_92vw] sm:flex-[0_0_85vw] md:flex-[0_0_70vw] min-w-0 px-2 sm:px-4">
                  <Link href={`/${locale}/blog/${post.slug}`} className="block">
                    <div className="grid grid-cols-1 md:grid-cols-[520px_1fr] lg:grid-cols-[640px_1fr] items-stretch min-h-[450px] sm:min-h-[500px] md:min-h-[550px] group">
                      <div className="bg-[#0b1320] flex items-stretch justify-center text-center relative overflow-hidden min-h-[200px] sm:min-h-[250px] md:min-h-0">
                        <Image src={post.image} alt={post.title} fill className="object-cover object-center transform scale-110 sm:scale-110 group-hover:scale-125 transition-transform duration-700" priority />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                          <span className={`px-3 py-1.5 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-serif ${post.category === 'news' ? 'bg-[#b69c6b] text-white' : 'bg-white text-[#191817]'}`}>
                            {post.category === 'news' ? t('blog.categoryNews') : t('blog.categoryPress')}
                          </span>
                        </div>
                      </div>
                      <div className="bg-[#f2efe6] px-4 sm:px-8 md:px-16 py-8 sm:py-10 md:py-12 flex flex-col justify-center items-start border-black/5">
                        <div className="max-w-[520px]">
                          {/* Meta info */}
                          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6 text-[#191817]/50">
                            <span className="flex items-center gap-1.5 font-serif text-[11px] sm:text-[12px] tracking-wide">
                              <Calendar className="w-3.5 h-3.5" />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1.5 font-serif text-[11px] sm:text-[12px] tracking-wide">
                              <Clock className="w-3.5 h-3.5" />
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="text-[#191817] font-serif font-medium text-[20px] sm:text-[24px] md:text-[32px] tracking-[0.02em] mb-4 sm:mb-6 leading-[1.2] group-hover:text-[#b69c6b] transition-colors">{post.title}</h3>
                          <p className="text-[#191817]/70 font-serif text-[14px] sm:text-[16px] md:text-[18px] leading-[1.6] mb-6 sm:mb-8">
                            {post.excerpt}
                          </p>
                          <span className="inline-flex items-center gap-3 text-[#191817] group-hover:text-[#b69c6b] font-serif text-[13px] sm:text-[14px] tracking-[0.15em] uppercase group-hover:gap-4 transition-all">
                            {t('common.readArticle')}
                            <svg className={`w-10 sm:w-10 h-5 sm:h-6 transition-transform ${isArabic ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                              <line x1="2" y1="10" x2="35" y2="10" stroke="currentColor" strokeWidth="1" />
                              <path d="M32 6L38 10L32 14" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center items-center mt-8 sm:mt-12 px-4 sm:px-8 md:px-16">
            <div className="w-full max-w-[1440px]">
              <div 
                className="w-full h-[2px] bg-[#e7e3d6] rounded-full relative cursor-pointer hover:h-[4px] transition-all select-none"
                onClick={handleFeaturedProgressBarClick}
                onMouseDown={handleFeaturedProgressBarMouseDown}
                onMouseMove={handleFeaturedProgressBarMouseMove}
              >
                <div
                  className="absolute h-[8px] bg-[#e7e3d6] rounded-full transition-all duration-300 -top-[3px]"
                  style={{
                    width: `${(1 / featuredPosts.length) * 100}%`,
                    ...(isArabic
                      ? { right: `${(featuredSelectedIndex / featuredPosts.length) * 100}%`, left: 'auto' }
                      : { left: `${(featuredSelectedIndex / featuredPosts.length) * 100}%` }),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER & BLOG GRID */}
      <section className="pt-24 sm:pt-32 md:pt-[320px] pb-12 sm:pb-16 md:pb-20 px-4 sm:px-8 md:px-16 bg-[#f2efe6] relative overflow-hidden" data-scroll-animate>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#b69c6b]/[0.04] rounded-full blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#b69c6b]/[0.03] rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

        <div className="max-w-[1440px] mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14 md:mb-16">
            <h2 className="text-[#191817] font-serif font-bold text-[14px] sm:text-[18px] md:text-[30px] uppercase tracking-[0.3em] mb-4 sm:mb-6 leading-none md:leading-relaxed">
              {t('blog.allArticles')}
            </h2>
            <p className="text-[#191817] font-serif text-[15px] sm:text-[17px] md:text-[20px] leading-[1.7] sm:leading-[1.8] mb-10 sm:mb-12 md:mb-14 opacity-80 px-2 ">
              {t('blog.allArticlesDescription')}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex bg-white border border-[#191817]/10 p-1.5 sm:p-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 sm:px-8 py-2.5 sm:py-3 font-serif text-[12px] sm:text-[14px] tracking-[0.15em] uppercase transition-all ${
                  activeCategory === 'all' 
                    ? 'bg-[#0b1320] text-white' 
                    : 'text-[#191817]/60 hover:text-[#191817]'
                }`}
              >
                {t('blog.filterAll')}
              </button>
              <button
                onClick={() => setActiveCategory('news')}
                className={`px-4 sm:px-8 py-2.5 sm:py-3 font-serif text-[12px] sm:text-[14px] tracking-[0.15em] uppercase transition-all ${
                  activeCategory === 'news' 
                    ? 'bg-[#0b1320] text-white' 
                    : 'text-[#191817]/60 hover:text-[#191817]'
                }`}
              >
                {t('blog.filterNews')}
              </button>
              <button
                onClick={() => setActiveCategory('press')}
                className={`px-4 sm:px-8 py-2.5 sm:py-3 font-serif text-[12px] sm:text-[14px] tracking-[0.15em] uppercase transition-all ${
                  activeCategory === 'press' 
                    ? 'bg-[#0b1320] text-white' 
                    : 'text-[#191817]/60 hover:text-[#191817]'
                }`}
              >
                {t('blog.filterPress')}
              </button>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/${locale}/blog/${post.slug}`} className="group">
                <article className="bg-white border border-[#191817]/[0.06] overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden">
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase font-serif ${post.category === 'news' ? 'bg-[#b69c6b] text-white' : 'bg-white text-[#191817]'}`}>
                        {post.category === 'news' ? t('blog.categoryNews') : t('blog.categoryPress')}
                      </span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6 sm:p-8 flex flex-col flex-1">
                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-4 text-[#191817]/40">
                      <span className="flex items-center gap-1.5 font-serif text-[11px] tracking-wide">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="w-1 h-1 bg-[#191817]/20 rounded-full"></span>
                      <span className="flex items-center gap-1.5 font-serif text-[11px] tracking-wide">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    {/* Title */}
                    <h3 className="text-[#191817] font-serif text-[18px] sm:text-[20px] leading-[1.3] mb-3 group-hover:text-[#b69c6b] transition-colors">
                      {post.title}
                    </h3>
                    {/* Excerpt */}
                    <p className="text-[#191817]/60 font-serif text-[14px] leading-[1.6] mb-6 flex-1">
                      {post.excerpt}
                    </p>
                    {/* Read More */}
                    <span className="inline-flex items-center gap-2 text-[#191817] group-hover:text-[#b69c6b] font-serif text-[12px] tracking-[0.15em] uppercase group-hover:gap-3 transition-all">
                      {t('common.readMore')}
                      <svg className={`w-10 sm:w-8 h-5 sm:h-6 transition-transform ${isArabic ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <line x1="2" y1="10" x2="35" y2="10" stroke="currentColor" strokeWidth="1" />
                        <path d="M32 6L38 10L32 14" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mt-12 sm:mt-16 md:mt-20">
            <button className="group inline-flex items-center gap-3 px-8 sm:px-12 py-4 bg-[#0b1320] text-white font-serif text-[12px] sm:text-[13px] tracking-[0.2em] uppercase hover:bg-[#191817] transition-colors">
              {t('common.loadMore')}
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
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
                <Link href={`/${locale}/who-we-are`} className="hover:opacity-80 transition-opacity uppercase py-2">{t('footer.aboutUs')}</Link>
                <Link href="#" className="hover:opacity-80 transition-opacity uppercase py-2">{t('footer.investments')}</Link>
                <Link href="#" className="hover:opacity-80 transition-opacity uppercase py-2">{t('footer.careers')}</Link>
                <Link href={`/${locale}/contact-us`} className="hover:opacity-80 transition-opacity uppercase py-2">{t('footer.contactUs')}</Link>
             </div>

             <div className="flex justify-end w-full mb-8 sm:mb-12">
                <div />
             </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8">
             <div className="flex flex-col items-start sm:items-end gap-4 w-full sm:w-auto mt-4 sm:mt-0 md:order-2">
                <Link href="#" className="text-[#b69c6b] hover:text-[#dfd4bf] transition-colors transform sm:-translate-y-3 md:-translate-y-4" aria-label={t('social.linkedin')}>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </Link>
                <div className="flex flex-wrap gap-4 sm:gap-6 text-[12px] sm:text-[13px] md:text-[15px] opacity-70 text-left sm:text-right">
                   <Link href="#" className="hover:opacity-100 transition-opacity">{t('footer.termsOfUse')}</Link>
                   <Link href="#" className="hover:opacity-100 transition-opacity">{t('footer.regulatoryInfo')}</Link>
                   <Link href="#" className="hover:opacity-100 transition-opacity">{t('footer.privacy')}</Link>
                   <Link href="#" className="hover:opacity-100 transition-opacity">{t('footer.phishing')}</Link>
                </div>
             </div>
             
             <div className="flex flex-col gap-3 md:order-1">
               <p className="text-[12px] sm:text-[14px] md:text-[17px] tracking-[0.03em] sm:tracking-[0.05em] opacity-90 uppercase leading-relaxed">
                 {t('footer.copyright')} <span className="hidden sm:inline mx-3 opacity-40">|</span><br className="sm:hidden" /> {t('footer.allRights')}
               </p>
               <p className="text-[12px] sm:text-[13px] md:text-[15px] opacity-60 max-w-[650px] leading-relaxed">
                 {t('footer.disclaimer')}
               </p>
             </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
