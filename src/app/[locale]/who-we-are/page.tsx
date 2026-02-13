'use client'

import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ArrowRight } from "lucide-react"
import { useCallback, useEffect, useState, useRef } from "react"
import { NavLangToggle, SidebarLangToggle } from '@/components/LanguageToggle'
import { useLanguage } from '@/components/LanguageProvider'

export default function WhoWeAre() {
  const { isArabic, t, locale } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState(0)
  const [sliderComplete, setSliderComplete] = useState(false)
  const prevActiveRef = useRef(0)
  
  // SCROLL-POSITION BASED SLIDER
  // Scroll directly controls slide position - like a normal scrollbar
  // No snapping, smooth progressive movement
  const scrollProgressRef = useRef(0) // 0 = first slide, 1 = second slide, etc.
  const normalContentRef = useRef<HTMLDivElement>(null)
  const sliderCompleteRef = useRef(false)
  
  // Keep ref in sync with state
  useEffect(() => {
    sliderCompleteRef.current = sliderComplete
  }, [sliderComplete])
  
  const containerRef = useCallback((node: HTMLElement | null) => {
    if (node) {
      const sections = node.querySelectorAll('.scroll-snap-section')
      const OFFSET = 35 // Match the animation offset
      sections.forEach((section, index) => {
        const el = section as HTMLElement
        el.style.zIndex = String(sections.length - index + 2) // First slide on top initially
        if (index === 0) {
          el.style.transform = 'translate(0, 0)'
        } else {
          // Park off-screen with reduced offset: odd → bottom-right, even → bottom-left
          const dirX = index % 2 === 1 ? 1 : -1
          el.style.transform = `translate(${dirX * 100}%, ${OFFSET}%)`
        }
      })
    }
  }, [])

  // SCROLL-POSITION BASED DIAGONAL ZIGZAG SLIDER
  // Smooth 60fps animation with lerp for butter-smooth movement
  // Pause at each slide center before allowing next
  useEffect(() => {
    const container = document.querySelector('.scroll-snap-container') as HTMLElement
    if (!container) return

    const sections = container.querySelectorAll('.scroll-snap-section')
    const numSections = sections.length
    if (numSections === 0) return

    // Animation state
    let targetProgress = scrollProgressRef.current // Where we want to animate to
    let currentProgress = scrollProgressRef.current // Current animated position
    let animationId: number | null = null
    
    // Dwell state - pause at each slide center
    let currentDwellSlide = -1 // Which slide we're dwelling on (-1 = none)
    let dwellTimeStart = 0 // When we started dwelling
    let dwellCompleted = false // If dwell time has passed for current slide
    
    const SCROLL_SENSITIVITY = 0.001 // Scroll sensitivity (slower)
    const LERP_FACTOR = 0.2 // Smooth factor (higher = smoother response)
    const DWELL_TIME = 400 // ms to pause at each slide center
    const maxProgress = numSections - 1

    // Get the X direction for a section based on its index
    // even(0,2,4) = left(-1), odd(1,3,5) = right(+1)
    const getSectionXDir = (idx: number) => idx % 2 === 0 ? -1 : 1

    // Apply transforms based on current scroll progress
    // Using smaller offsets (35%) so both slides are visible during transition
    const applyTransforms = (progress: number) => {
      const currentSlideIndex = Math.floor(progress)
      const slideProgress = progress - currentSlideIndex // 0-1 within current transition

      for (let i = 0; i < numSections; i++) {
        const el = sections[i] as HTMLElement
        const xDir = getSectionXDir(i)

        let x = 0
        let y = 0
        let zIndex = numSections - i

        // Reduced offset for tighter overlap (35% instead of 100%)
        const OFFSET = 35

        if (i < currentSlideIndex) {
          // Passed slides - parked at exit position (top-side)
          x = xDir * 100
          y = -OFFSET
          zIndex = i
        } else if (i === currentSlideIndex) {
          // Current slide - exiting based on progress
          // Moves from center (0,0) to exit position
          x = slideProgress * xDir * 100
          y = slideProgress * -OFFSET
          zIndex = numSections + 2 // Current slide on top
        } else if (i === currentSlideIndex + 1) {
          // Next slide - entering based on progress
          // Moves from entry position to center (0,0)
          x = (1 - slideProgress) * xDir * 100
          y = (1 - slideProgress) * OFFSET
          zIndex = numSections + 1 // Next slide just below current
        } else {
          // Future slides - parked at entry position (bottom-side)
          x = xDir * 100
          y = OFFSET
          zIndex = numSections - i
        }

        el.style.transform = `translate(${x}%, ${y}%)`
        el.style.zIndex = String(zIndex)
      }

      // Update active section indicator
      const newActiveSection = Math.round(progress)
      if (newActiveSection !== prevActiveRef.current && newActiveSection < numSections) {
        prevActiveRef.current = newActiveSection
        setActiveSection(newActiveSection)
      }
    }

    // 60fps animation loop for smooth interpolation
    const animate = () => {
      // Lerp towards target
      const diff = targetProgress - currentProgress
      
      if (Math.abs(diff) > 0.0001) {
        currentProgress += diff * LERP_FACTOR
        scrollProgressRef.current = currentProgress
        applyTransforms(currentProgress)
      } else {
        // Snap to target when close enough
        currentProgress = targetProgress
        scrollProgressRef.current = currentProgress
        applyTransforms(currentProgress)
      }
      
      // Check if we've reached a slide center (progress is near an integer >= 1)
      // Slide 1 center = progress 1, Slide 2 center = progress 2, etc.
      for (let slideIdx = 1; slideIdx <= maxProgress; slideIdx++) {
        if (currentProgress >= slideIdx - 0.01 && currentProgress <= slideIdx + 0.01) {
          if (currentDwellSlide !== slideIdx) {
            // Just arrived at this slide center - start dwell
            currentDwellSlide = slideIdx
            dwellTimeStart = performance.now()
            dwellCompleted = false
            // Snap target to exact center
            targetProgress = slideIdx
          }
          // Check if dwell time has passed
          if (!dwellCompleted && performance.now() - dwellTimeStart >= DWELL_TIME) {
            dwellCompleted = true
          }
          break
        }
      }
      
      animationId = requestAnimationFrame(animate)
    }

    // Start animation loop
    animationId = requestAnimationFrame(animate)

    // Initialize transforms
    applyTransforms(currentProgress)

    // Handle wheel event
    const handleWheel = (e: WheelEvent) => {
      // If slider is complete, don't intercept
      if (sliderCompleteRef.current) return

      // Check if we're at the last slide and trying to exit
      if (currentDwellSlide === maxProgress && dwellCompleted && e.deltaY > 0) {
        // Allow exit to normal content
        targetProgress = maxProgress
        currentProgress = maxProgress
        scrollProgressRef.current = maxProgress
        applyTransforms(maxProgress)
        setSliderComplete(true)
        return
      }
      
      // Check if we're dwelling at a slide center and trying to move forward
      if (currentDwellSlide >= 1 && !dwellCompleted && e.deltaY > 0) {
        // Block forward scrolling until dwell completes
        e.preventDefault()
        return
      }
      
      // Reset dwell state if going backwards past the dwell slide
      if (e.deltaY < 0 && currentDwellSlide >= 1) {
        const currentSlideCenter = currentDwellSlide
        // If we're moving backwards, allow it and reset dwell
        if (targetProgress <= currentSlideCenter) {
          currentDwellSlide = -1
          dwellCompleted = false
          dwellTimeStart = 0
        }
      }

      e.preventDefault()

      // Update target progress based on scroll
      const delta = e.deltaY * SCROLL_SENSITIVITY
      let newTarget = targetProgress + delta
      
      // If dwelling and not completed, cap at the dwell slide
      if (currentDwellSlide >= 1 && !dwellCompleted && delta > 0) {
        newTarget = Math.min(newTarget, currentDwellSlide)
      }
      
      targetProgress = Math.max(0, Math.min(maxProgress, newTarget))
    }

    // Handle touch events for mobile
    let lastTouchY = 0

    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (sliderCompleteRef.current) return

      const touchY = e.touches[0].clientY
      const deltaY = lastTouchY - touchY // Inverted for natural scroll feel
      lastTouchY = touchY

      // Check if we're at the last slide and trying to exit
      if (currentDwellSlide === maxProgress && dwellCompleted && deltaY > 0) {
        targetProgress = maxProgress
        currentProgress = maxProgress
        scrollProgressRef.current = maxProgress
        applyTransforms(maxProgress)
        setSliderComplete(true)
        return
      }
      
      // Check if we're dwelling at a slide center and trying to move forward
      if (currentDwellSlide >= 1 && !dwellCompleted && deltaY > 0) {
        e.preventDefault()
        return
      }
      
      // Reset dwell state if going backwards
      if (deltaY < 0 && currentDwellSlide >= 1) {
        const currentSlideCenter = currentDwellSlide
        if (targetProgress <= currentSlideCenter) {
          currentDwellSlide = -1
          dwellCompleted = false
          dwellTimeStart = 0
        }
      }

      e.preventDefault()

      // Update target progress based on touch
      const delta = deltaY * 0.003 // Touch sensitivity (slower)
      let newTarget = targetProgress + delta
      
      // If dwelling and not completed, cap at the dwell slide
      if (currentDwellSlide >= 1 && !dwellCompleted && delta > 0) {
        newTarget = Math.min(newTarget, currentDwellSlide)
      }
      
      targetProgress = Math.max(0, Math.min(maxProgress, newTarget))
    }

    // Add event listeners
    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  // Handle re-entry to slider when scrolling up at the top of normal content
  useEffect(() => {
    if (!sliderComplete) return

    const handleWindowWheel = (e: WheelEvent) => {
      const normalContent = normalContentRef.current
      if (!normalContent) return
      
      const scrollTop = window.scrollY
      
      // If at the very top and scrolling up, re-enter slider
      if (scrollTop <= 5 && e.deltaY < 0) {
        e.preventDefault()
        setSliderComplete(false)
        window.scrollTo(0, 0)
      }
    }

    window.addEventListener('wheel', handleWindowWheel, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWindowWheel)
    }
  }, [sliderComplete])

  // Navigate to a specific slide (for nav dots)
  const navigateToSlide = useCallback((targetIndex: number) => {
    if (targetIndex < 0 || targetIndex > 2) return
    
    // If slider is complete, re-enter it first
    if (sliderComplete) {
      setSliderComplete(false)
      window.scrollTo(0, 0)
    }
    
    // Update refs to trigger animation to target
    const container = document.querySelector('.scroll-snap-container') as HTMLElement
    if (!container) return
    
    const sections = container.querySelectorAll('.scroll-snap-section')
    if (sections.length === 0) return
    
    const numSections = sections.length
    
    // Snap directly to the target section (35% offset to match animation)
    const OFFSET = 35
    for (let i = 0; i < numSections; i++) {
      const el = sections[i] as HTMLElement
      const xDir = i % 2 === 0 ? -1 : 1

      if (i < targetIndex) {
        el.style.transform = `translate(${xDir * 100}%, -${OFFSET}%)`
        el.style.zIndex = String(i)
      } else if (i === targetIndex) {
        el.style.transform = 'translate(0, 0)'
        el.style.zIndex = String(numSections + 2)
      } else {
        el.style.transform = `translate(${xDir * 100}%, ${OFFSET}%)`
        el.style.zIndex = String(numSections - i)
      }
    }
    
    scrollProgressRef.current = targetIndex
    setActiveSection(targetIndex)
  }, [sliderComplete])

  // Section names for navigation dots (only first 3 animated sections)
  const sectionNames = ['About', 'Purpose', 'Promise']

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

  const coreValues = [
    {
      title: t('whoWeAre.valueIntegrity'),
      description: t('whoWeAre.valueIntegrityDesc'),
      icon: (
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#b69c6b]/10 group-hover:bg-[#b69c6b]/20 flex items-center justify-center transition-colors">
          <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
      )
    },
    {
      title: t('whoWeAre.valueExcellence'),
      description: t('whoWeAre.valueExcellenceDesc'),
      icon: (
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#b69c6b]/10 group-hover:bg-[#b69c6b]/20 flex items-center justify-center transition-colors">
          <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
        </div>
      )
    },
    {
      title: t('whoWeAre.valueInnovation'),
      description: t('whoWeAre.valueInnovationDesc'),
      icon: (
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#b69c6b]/10 group-hover:bg-[#b69c6b]/20 flex items-center justify-center transition-colors">
          <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
        </div>
      )
    },
    {
      title: t('whoWeAre.valuePartnership'),
      description: t('whoWeAre.valuePartnershipDesc'),
      icon: (
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#b69c6b]/10 group-hover:bg-[#b69c6b]/20 flex items-center justify-center transition-colors">
          <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
        </div>
      )
    }
  ]

  const milestones = [
    { year: t('whoWeAre.year1985'), title: t('whoWeAre.year1985Title'), description: t('whoWeAre.year1985Desc') },
    { year: t('whoWeAre.year1995'), title: t('whoWeAre.year1995Title'), description: t('whoWeAre.year1995Desc') },
    { year: t('whoWeAre.year2005'), title: t('whoWeAre.year2005Title'), description: t('whoWeAre.year2005Desc') },
    { year: t('whoWeAre.year2015'), title: t('whoWeAre.year2015Title'), description: t('whoWeAre.year2015Desc') },
    { year: t('whoWeAre.year2024'), title: t('whoWeAre.year2024Title'), description: t('whoWeAre.year2024Desc') }
  ]

  // Split the "WE BELIEVE IN" heading into two lines (all but last word, and last word)
  const _believeHeadingParts = t('whoWeAre.believeHeading').split(' ')
  const believeHeadingLast = _believeHeadingParts.length ? _believeHeadingParts[_believeHeadingParts.length - 1] : ''
  const believeHeadingFirst = _believeHeadingParts.length > 1 ? _believeHeadingParts.slice(0, -1).join(' ') : t('whoWeAre.believeHeading')

  // Split the alignment title into two lines
  const _alignmentParts = t('whoWeAre.alignmentTitle').split(' ')
  const alignmentLast = _alignmentParts.length ? _alignmentParts[_alignmentParts.length - 1] : ''
  const alignmentFirst = _alignmentParts.length > 1 ? _alignmentParts.slice(0, -1).join(' ') : t('whoWeAre.alignmentTitle')

  // Split the conviction title into two lines
  const _convictionParts = t('whoWeAre.convictionTitle').split(' ')
  const convictionLast = _convictionParts.length ? _convictionParts[_convictionParts.length - 1] : ''
  const convictionFirst = _convictionParts.length > 1 ? _convictionParts.slice(0, -1).join(' ') : t('whoWeAre.convictionTitle')

  // Split the "WE BELIEVE IN" title into words for mobile stacking
  const _believeTitleParts = t('whoWeAre.believeTitle').split(' ')
  const believeTitleWords = _believeTitleParts.length ? _believeTitleParts : [t('whoWeAre.believeTitle')]

  return (
    <>
      {/* Side Navigation Dots - Desktop: vertical right side, Mobile: horizontal bottom */}
      {!sliderComplete && (
        <>
          {/* Desktop - vertical on right */}
          <nav className="scroll-nav-dots hidden md:flex">
            {sectionNames.map((name, index) => (
              <div key={name} className="flex flex-col items-center">
                <button
                  onClick={() => navigateToSlide(index)}
                  className={`scroll-nav-dot ${activeSection === index ? 'active' : ''}`}
                  aria-label={`Go to ${name} section`}
                />
                {index < sectionNames.length - 1 && <div className="scroll-nav-line" />}
              </div>
            ))}
          </nav>
          
          {/* Mobile - horizontal at bottom */}
          <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#191817]/80 backdrop-blur-sm px-4 py-2 rounded-full">
            {sectionNames.map((name, index) => (
              <div key={name} className="flex items-center">
                <button
                  onClick={() => navigateToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                    activeSection === index 
                      ? 'bg-[#b69c6b] border-[#b69c6b] scale-125' 
                      : 'bg-transparent border-[#b69c6b]/50 hover:border-[#b69c6b]'
                  }`}
                  aria-label={`Go to ${name} section`}
                />
                {index < sectionNames.length - 1 && (
                  <div className="w-4 h-[1px] bg-[#b69c6b]/30 ml-3" />
                )}
              </div>
            ))}
          </nav>
        </>
      )}

      <main data-testid="page-who-we-are" className="bg-[#f1ebe1]">
      {/* ANIMATED SLIDER CONTAINER - Fixed, stays visible until scrolled over */}
      <div 
        className={`scroll-snap-container ${
          sliderComplete ? 'pointer-events-none' : ''
        }`} 
        ref={containerRef}
      >
      
      {/* FULL SCREEN MENU OVERLAY */}
      <div 
        className={`fixed inset-0 z-50 bg-[#fffcf8] transition-transform duration-500 ease-in-out ${
          menuOpen ? 'translate-x-0' : (isArabic ? '-translate-x-full' : 'translate-x-full')
        } ${menuOpen ? '' : 'pointer-events-none'}`}
      >
        {/* Menu Header */}
        <div className="py-6 sm:py-10 px-4 sm:px-8 md:px-16">
          <div className="flex justify-between items-center">
            <Link href={`/${locale}`} className="font-serif text-[18px] sm:text-[20px] md:text-[26px] tracking-[0.15em] text-[#191817]">{t('common.brand')}</Link>
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
                    <span className="font-serif text-[24px] sm:text-[32px] md:text-[42px] text-[#191817] group-hover:text-[#b69c6b] transition-colors uppercase tracking-[0.05em]">
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
                    <div className="pl-4 sm:pl-8 space-y-3">
                      {nav.items.map((item, itemIndex) => (
                        <Link 
                          key={itemIndex}
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className={`block font-serif text-[16px] sm:text-[18px] md:text-[20px] hover:text-[#b69c6b] transition-colors ${item.href === `/${locale}/who-we-are` ? 'text-[#b69c6b]' : 'text-[#191817]'}`}
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
            <div className="lg:border-l lg:border-[#191817]/10 lg:pl-16">
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

      {/* TOP NAV (hero removed) - hidden when menu open */}
      <header className={`fixed top-0 left-0 right-0 z-40 bg-[#191817] border-b border-[#ffffff]/10 transition-opacity duration-300 ${
        menuOpen ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}>
        <div className="py-6 sm:py-10 px-4 sm:px-8 md:px-16">
          {/* Mobile header */}
          <nav className="md:hidden flex items-center justify-between">
            <button 
              className="flex flex-col justify-center items-center gap-1.5 p-2"
              aria-label={t('common.menu')}
              onClick={() => setMenuOpen(true)}
            >
              <span className="block w-6 h-[2px] bg-white"></span>
              <span className="block w-6 h-[2px] bg-white"></span>
            </button>

            <Link href={`/${locale}`} className="font-serif text-[18px] sm:text-[20px] tracking-[0.15em] text-white">{t('common.brand')}</Link>

            <NavLangToggle className="text-[14px]" />
          </nav>

          {/* Desktop header */}
          <nav className="hidden md:flex justify-between items-center">
            <div className="flex items-center">
               <Link href={`/${locale}`} className="font-serif text-[18px] sm:text-[20px] md:text-[26px] tracking-[0.15em] text-white">{t('common.brand')}</Link>
            </div>
            <div className="hidden md:flex flex-col items-center text-center text-[12px] md:text-[14px] tracking-[0.35em] uppercase opacity-95">
              <span className="mt-1 text-[12px] md:text-[18px] text-white">{t('common.brandFull')}</span>
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
      </header>

      {/* WHO WE ARE INTRO SECTION */}
      <section className="scroll-snap-section flex items-center justify-center h-screen px-4 sm:px-6 md:px-12 lg:px-16 pt-20 md:pt-28 bg-[#f1ebe1]">
        <div className="max-w-[1400px] mx-auto">
          {/* Section kicker */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8 justify-center">
            <p className="text-[#b69c6b] font-serif text-[14px] sm:text-[16px] tracking-[0.4em] uppercase">{t('whoWeAre.introKicker')}</p>
          </div>

          {/* Main heading */}
          <h2 className="text-center text-[#191817] font-serif font-bold text-[15px] sm:text-[18px] md:text-[24px] lg:text-[32px] mb-6 sm:mb-8 uppercase tracking-[0.2em]">
            {t('whoWeAre.introTitle')}
          </h2>

          {/* Content paragraphs */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <p className="text-center text-[#191817]/85 font-serif text-[15px] sm:text-[17px] md:text-[19px] lg:text-[22px] leading-[1.6] md:leading-[1.7] lg:leading-[1.8] max-w-[1100px] mx-auto">
              {t('whoWeAre.introP1')}
            </p>
            <p className="text-center text-[#191817]/85 font-serif text-[15px] sm:text-[17px] md:text-[19px] lg:text-[22px] leading-[1.6] md:leading-[1.7] lg:leading-[1.8] max-w-[1100px] mx-auto">
              {t('whoWeAre.introP2')}
            </p>
              <p className="text-center text-[#191817]/85 font-serif text-[15px] sm:text-[17px] md:text-[19px] lg:text-[22px] leading-[1.6] md:leading-[1.7] lg:leading-[1.8] max-w-[1100px] mx-auto">
                {t('whoWeAre.introP3')}
              </p>
          </div>
        </div>
      </section>

      {/* PURPOSE SECTION */}
      <section className="scroll-snap-section flex items-center justify-center h-screen px-4 sm:px-6 md:px-12 lg:px-16 pt-20 md:pt-28 bg-[#f1ebe1]">
        <div className="w-full max-w-[1400px] mx-auto">
          {/* Decorative icon (from assets) */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <Image src="/assets/purpose.svg" alt={t('whoWeAre.purposeTitle')} width={40} height={40} className="object-contain" />
          </div>

          {/* Title */}
          <h2 className="text-center text-[#191817] font-serif font-bold text-[14px] sm:text-[17px] md:text-[23px] lg:text-[30px] mb-6 sm:mb-8 uppercase tracking-[0.2em]">
            {t('whoWeAre.purposeTitle')}
          </h2>

          {/* Paragraphs */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <p className="text-center text-[#191817]/85 font-serif text-[15px] sm:text-[17px] md:text-[19px] lg:text-[22px] leading-[1.6] md:leading-[1.7] lg:leading-[1.8] max-w-[1100px] mx-auto">
              {t('whoWeAre.purposeP1')}
            </p>
            <p className="text-center text-[#191817]/85 font-serif text-[15px] sm:text-[17px] md:text-[19px] lg:text-[22px] leading-[1.6] md:leading-[1.7] lg:leading-[1.8] max-w-[1100px] mx-auto">
              {t('whoWeAre.purposeP2')}
            </p>
          </div>
        </div>
      </section>

      {/* PROMISE SECTION */}
      <section className="scroll-snap-section flex items-center justify-center h-screen px-4 sm:px-6 md:px-12 lg:px-16 pt-20 md:pt-28 bg-[#f1ebe1]">
        <div className="w-full max-w-[1400px] mx-auto">
          {/* Top icon */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <Image src="/assets/promise.svg" alt="Promise" width={40} height={40} className="object-contain" />
          </div>

          {/* Kicker */}
          <h3 className="text-center text-[#191817] font-serif font-bold text-[14px] sm:text-[17px] md:text-[23px] lg:text-[30px] mb-6 sm:mb-8 uppercase tracking-[0.2em]">
            {t('whoWeAre.promiseKicker')}
          </h3>

          {/* Vertical line divider */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-[1px] h-16 sm:h-20 bg-[#191817]/40"></div>
          </div>

          {/* Bottom icon (chess pieces) */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <Image src="/assets/we-stand.svg" alt="We Stand" width={120} height={72} className="object-contain" />
          </div>

          {/* Main title */}
          <h2 className="text-center text-[#191817] font-serif font-bold text-[14px] sm:text-[17px] md:text-[23px] lg:text-[30px] mb-6 sm:mb-8 uppercase tracking-[0.2em]">
            {t('whoWeAre.promiseTitle')}
          </h2>

          {/* Description */}
          <p className="text-center text-[#191817]/85 font-serif text-[15px] sm:text-[17px] md:text-[19px] lg:text-[22px] leading-[1.6] md:leading-[1.7] lg:leading-[1.8] max-w-[1100px] mx-auto">
            {t('whoWeAre.promiseDescription')}
          </p>
        </div>
      </section>
      
      </div>{/* End of scroll-snap-container */}

      {/* Normal flow sections - scrolls over the fixed slider */}
      <div 
        ref={normalContentRef} 
        className="bg-[#fffcf8] relative z-50"
        style={{ marginTop: '100vh' }}
      >

      {/* WE BELIEVE IN SECTION - Normal flow, no animation */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-[#fffcf8]">
        {/* Left side - Text */}
        <div className="bg-[#efe6d8] flex items-center justify-center px-4 sm:px-8 md:px-16 py-20 sm:py-28 md:py-36">
          <div className="max-w-[500px]">
            <h2 className="text-[#191817] font-serif text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] leading-[0.95] font-light tracking-[0.02em]">
              {/* Mobile: stack each word on its own line. Desktop: show full title. */}
              <span className="block sm:hidden text-[48px] sm:text-inherit">{believeTitleWords[0] ?? ''}</span>
              {believeTitleWords.slice(1).map((w, i) => (
                <span key={i} className="block sm:hidden text-[48px] sm:text-inherit">{w}</span>
              ))}
              <span className="hidden sm:block">{t('whoWeAre.believeTitle')}</span>
            </h2>
          </div>
        </div>
        
        {/* Right side - Content with background image */}
        <div 
          className="bg-[#1e3a5f] relative overflow-hidden flex flex-col justify-end px-4 sm:px-8 md:px-16 py-20 sm:py-28 md:py-40 min-h-[760px]"
          style={{
            backgroundImage: "url('/assets/time-strategy.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#1e3a5f]/40"></div>
          
          {/* Content */}
          <div className="max-w-[500px] relative z-10 text-left pb-2 sm:pb-4 md:pb-6 lg:pb-8">
            <h3 className="text-white font-serif font-bold text-[20px] sm:text-[28px] md:text-[40px] lg:text-[48px] mb-6 sm:mb-8 uppercase tracking-[0.03em] leading-[1.05]">
              <span className="block whitespace-nowrap">{believeHeadingFirst}</span>
              <span className="block">{believeHeadingLast}</span>
            </h3>
            <p className="text-white/70 font-serif text-[18px] sm:text-[20px] md:text-[22px] leading-[1.9]">
              {t('whoWeAre.believeDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* ALIGNMENT AND CONVICTION SECTION - Normal flow, no animation */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-[#fffcf8]">
        {/* Left side - Alignment */}
        <div 
          className="relative overflow-hidden flex flex-col items-start justify-end px-4 sm:px-8 md:px-16 py-20 sm:py-28 md:py-36 min-h-[500px] lg:min-h-[700px]"
          style={{
            backgroundImage: "url('/assets/alignment.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Content */}
          <div className="max-w-[400px] text-left relative z-10">
            <h3 className="text-[#41392B] font-serif font-bold text-[20px] sm:text-[28px] md:text-[40px] lg:text-[48px] uppercase tracking-[0.03em] leading-[1.05]">
              <span className="block whitespace-nowrap">{alignmentFirst}</span>
              <span className="block">{alignmentLast}</span>
            </h3>
          </div>
        </div>
        
        {/* Right side - Conviction */}
        <div 
          className="relative overflow-hidden flex flex-col items-start justify-end px-4 sm:px-8 md:px-16 py-20 sm:py-28 md:py-36 min-h-[500px] lg:min-h-[700px]"
          style={{
            backgroundImage: "url('/assets/conviction.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Content */}
          <div className="max-w-[400px] text-left relative z-10">
            <h3 className="text-[#41392B] font-serif font-bold text-[20px] sm:text-[28px] md:text-[40px] lg:text-[48px] uppercase tracking-[0.03em] leading-[1.05]">
              <span className="block whitespace-nowrap">{convictionFirst}</span>
              <span className="block">{convictionLast}</span>
            </h3>
          </div>
        </div>
      </section>





      {/* H.H STATEMENT SECTION - Normal flow, no animation */}
      <section className="grid grid-cols-1 lg:grid-cols-3 bg-[#fffcf8]">
        {/* Left side - Horse image (1 col) */}
        <div className="relative overflow-hidden min-h-[400px] lg:min-h-[700px]">
          <Image
            src="/assets/horse.jpg"
            alt="H.H Statement"
            fill
            className="object-cover object-center"
          />
        </div>
        
        {/* Right side - Statement content (2 cols) */}
        <div className="flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 py-20 sm:py-28 md:py-36 min-h-[400px] lg:min-h-[700px] lg:col-span-2">
          <div className="max-w-[700px] w-full">
            {/* Kicker */}
            <h3 className="text-[#b69c6b] font-serif font-bold text-[14px] sm:text-[18px] md:text-[20px] mb-8 sm:mb-12 uppercase tracking-[0.3em]">
              {t('whoWeAre.statementKicker')}
            </h3>
            
            {/* Description */}
            <p className="text-[#191817]/80 font-serif text-[18px] sm:text-[20px] md:text-[22px] leading-[1.9] mb-16 sm:mb-24 md:mb-32">
              {t('whoWeAre.statementDescription')}
            </p>
            
            {/* Signature */}
            <p className="text-[#191817] font-serif text-[64px] sm:text-[80px] md:text-[100px] font-light leading-none uppercase tracking-[0.02em] text-right">
              {t('whoWeAre.statementSignature')}
            </p>
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
      </div>{/* End normal flow wrapper */}
    </main>
    </>
  )
}
