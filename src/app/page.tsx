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

    // Set initial scroll offset to show 2 full + 50% on sides
    const scrollOffset = (window.innerWidth * 16.665) / 100
    if (sectorsEmblaRef.current) {
      sectorsEmblaRef.current.scrollLeft = scrollOffset
    }

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

  return (
    <main data-testid="page-home" className="bg-[#fff] overflow-x-hidden">
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
          <nav className="flex justify-between items-center text-white">
            <div className="flex items-center">
               <span className="font-serif text-[18px] sm:text-[20px] md:text-[26px] tracking-[0.15em]">EIH</span>
            </div>
            <div className="hidden md:flex flex-col items-center text-center text-[12px] md:text-[14px] tracking-[0.35em] uppercase opacity-95">
              
              <span className="mt-1 text-[12px] md:text-[18px]">ETHMAR INTERNATIONAL HOLDING</span>
            </div>
            <div className="flex gap-3 sm:gap-4 items-center text-[12px] md:text-[14px] tracking-[0.3em] font-medium">
              <button className="flex flex-col justify-center items-center gap-1.5 sm:gap-2 p-2" aria-label="menu">
                 <span className="block w-6 sm:w-8 md:w-9 h-[2px] bg-white"></span>
                 <span className="block w-6 sm:w-8 md:w-9 h-[2px] bg-white"></span>
              </button>
              <span className="cursor-pointer font-arabic text-[14px] md:text-[16px] leading-none">ع</span>
            </div>
          </nav>
        </div>
        
        <div className="relative z-10 flex-1 flex flex-col justify-center py-16 sm:py-20 md:py-32 px-4 sm:px-8 md:px-16">
          <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-end">
            <div>
              <h1 className="text-[#b69c6b] font-serif text-[32px] sm:text-[42px] md:text-[82px] leading-[1] sm:leading-[0.95] uppercase tracking-[0.02em] mb-4 sm:mb-6">
                <span className="block">INVESTING BEYOND</span>
                <span className="block">THE OBVIOUS</span>
              </h1>
              <Link href="#" className="mt-4 sm:mt-6 inline-flex items-center gap-3 sm:gap-4 text-white font-serif text-[16px] sm:text-[20px] md:text-[24px] tracking-[0.15em] sm:tracking-[0.2em] group">
                <span className="leading-none">Dive Deeper</span>
                <span className="relative inline-flex items-center w-8 sm:w-10 h-[1px]">
                 
                  <ArrowRight className="relative text-white" size={18} />
                </span>
              </Link>
            </div>
            <div className="flex justify-start md:justify-end mt-12 md:mt-0">
            </div>
          </div>
        </div>
      </header>

      {/* LEGACY SECTION */}
      <section className="pt-24 sm:pt-32 md:pt-[320px] pb-12 sm:pb-16 md:pb-20 px-4 sm:px-8 md:px-16 bg-white">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif font-bold text-[16px] sm:text-[20px] md:text-[30px] uppercase tracking-[0.2em] sm:tracking-[0.4em] md:tracking-[0.6em] mb-10 sm:mb-14 md:mb-20 px-2">
            WHERE LEGACY BECOMES PRESENCE
          </h2>
          <div className="relative mb-8 sm:mb-12">
            <img src="/assets/horse.jpg" className="w-full object-cover rounded-none" alt="Horses" width={1440} height={420} />
          </div>
          <Link href="#" className="text-[#191817] font-serif font-bold text-[14px] sm:text-[16px] md:text-[18px] inline-flex items-center gap-2 sm:gap-3 group uppercase tracking-[0.15em] sm:tracking-[0.2em]">
            <span>Learn More</span>
           
            <ArrowRight className="text-[#191817]" size={16} />
          </Link>
        </div>
      </section>

      {/* GLOBAL PRESENCE SECTION */}
      <section className="pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 px-0 md:px-0 bg-white">
        <div className="w-full">
          <h2 className="text-[#191817] font-serif font-bold text-[14px] sm:text-[18px] md:text-[30px] uppercase tracking-[0.15em] sm:tracking-[0.3em] md:tracking-[0.6em] mb-10 sm:mb-14 md:mb-20 text-center px-4 sm:px-8 md:px-16 leading-relaxed">
            A GLOBAL PRESENCE, QUIETLY POWERFUL
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
          <div className="flex justify-center items-center gap-2 sm:gap-3 mt-8 sm:mt-12 px-4 sm:px-8">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`transition-all duration-300 rounded-sm ${
                  idx === selectedIndex
                    ? 'bg-[#b69c6b] w-6 sm:w-10 h-1'
                    : 'bg-[#191817]/20 w-4 sm:w-6 h-1 hover:bg-[#191817]/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS SECTION */}
      <section className="pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-8 md:px-16 bg-white">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif font-bold text-[14px] sm:text-[18px] md:text-[30px] uppercase tracking-[0.15em] sm:tracking-[0.3em] md:tracking-[0.6em] mb-10 sm:mb-14 md:mb-20 text-center px-2 sm:px-8 md:px-16 leading-relaxed">
            THE SECTORS THAT SHAPE TOMORROW
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 bg-[#f5f1e8] min-h-[500px] sm:min-h-[550px] md:min-h-[600px] rounded-lg sm:rounded-none overflow-hidden">
             <div className="p-6 sm:p-10 md:p-16 lg:p-24 text-left flex flex-col justify-end order-2 md:order-1">
                <h3 className="text-[#191817] font-serif font-normal text-[28px] sm:text-[36px] md:text-[52px] lg:text-[60px] leading-[1.1] mb-6 sm:mb-10 md:mb-12 uppercase">
                  PRIVATE EQUITY &<br />GROWTH
                </h3>
                <Link href="#" className="text-[#191817] font-serif text-[13px] sm:text-[14px] md:text-[16px] flex items-center gap-2 sm:gap-3 group uppercase tracking-[0.1em] sm:tracking-[0.15em]">
                  Read More
                  <ArrowRight className="text-[#191817] transition-transform group-hover:translate-x-1" size={18} />
                </Link>
             </div>
             <div className="relative min-h-[280px] sm:min-h-[400px] md:min-h-[700px] order-1 md:order-2">
                <Image src="/assets/private-equity.png" className="object-contain object-bottom scale-100" alt="Private Equity" fill priority />
             </div>
          </div>
        </div>
      </section>

      {/* SECTORS OF FOCUS */}
      <section className="pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 px-0 md:px-0 bg-white">
        <div className="w-full">
          <h2 className="text-[#191817] font-serif font-bold text-[16px] sm:text-[20px] md:text-[30px] uppercase tracking-[0.2em] sm:tracking-[0.4em] md:tracking-[0.6em] mb-10 sm:mb-14 md:mb-20 text-center px-4 sm:px-8 md:px-16">
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
                <div key={sector.id} className="flex-[0_0_75vw] sm:flex-[0_0_50vw] md:flex-[0_0_33.333vw] min-w-0 px-1.5 sm:px-1">
                  <div className="relative h-[400px] sm:h-[500px] md:h-[750px] group overflow-hidden bg-[#0b1320] rounded-lg sm:rounded-none">
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
          <div className="flex justify-center items-center gap-2 sm:gap-3 mt-8 sm:mt-12 px-4 sm:px-8">
            {[1, 2, 3, 4, 5, 6].map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollSectorsTo(idx)}
                className={`transition-all duration-300 rounded-sm ${
                  idx === sectorsSelectedIndex
                    ? 'bg-[#b69c6b] w-6 sm:w-10 h-1'
                    : 'bg-[#191817]/20 w-4 sm:w-6 h-1 hover:bg-[#191817]/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP SECTION */}
      <section className="pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-8 md:px-16 bg-white">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif font-bold text-[14px] sm:text-[18px] md:text-[30px] uppercase tracking-[0.15em] sm:tracking-[0.3em] md:tracking-[0.6em] mb-10 sm:mb-14 md:mb-20 text-center px-2 sm:px-8 md:px-16 leading-relaxed">
            A DIFFERENT KIND OF PARTNERSHIP
          </h2>
          
          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center items-center gap-4 sm:gap-0 mb-12 sm:mb-16 md:mb-20">
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

          <Link href="#" className="text-[#191817] font-serif text-[14px] sm:text-[16px] md:text-[18px] flex flex-col justify-center items-center gap-2 group uppercase tracking-[0.15em] sm:tracking-[0.2em]">
            <span>Reveal more</span>
            <ChevronDown className="text-[#191817] transition-transform group-hover:translate-y-1" size={18} />
          </Link>
        </div>
      </section>

      {/* PARTNER WITH US */}
      <section className="pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-8 md:px-16 bg-[#f2efe6]">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif font-bold text-[16px] sm:text-[20px] md:text-[30px] uppercase tracking-[0.2em] sm:tracking-[0.4em] md:tracking-[0.6em] mb-10 sm:mb-14 md:mb-20 text-center px-2 sm:px-8 md:px-16">
            PARTNER WITH US
          </h2>
          <p className="text-[#191817] font-serif text-[15px] sm:text-[17px] md:text-[20px] leading-[1.7] sm:leading-[1.8] mb-10 sm:mb-12 md:mb-14 opacity-80 px-2">
            We collaborate with partners who share our commitment to creating long-term value. 
            If you are building something meant to last, we are ready to build with you.
          </p>
          <Link href="#" className="group inline-flex items-center gap-3 sm:gap-4 justify-center text-[#191817] font-serif text-[16px] sm:text-[18px] md:text-[20px] tracking-normal">
            <span>Get in touch</span>
            <ArrowRight className="transition-transform group-hover:translate-x-2" size={18} />
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
                <Link href="#" className="hover:opacity-80 transition-opacity uppercase py-2">ABOUT US</Link>
                <Link href="#" className="hover:opacity-80 transition-opacity uppercase py-2">INVESTMENTS</Link>
                <Link href="#" className="hover:opacity-80 transition-opacity uppercase py-2">CAREERS</Link>
                <Link href="#" className="hover:opacity-80 transition-opacity uppercase py-2">CONTACT US</Link>
             </div>

             <div className="flex justify-end w-full mb-8 sm:mb-12">
                <div />
             </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8">
             <div className="flex flex-col gap-3">
               <p className="text-[12px] sm:text-[14px] md:text-[17px] tracking-[0.03em] sm:tracking-[0.05em] opacity-90 uppercase leading-relaxed">
                 2026 ETHMAR INTERNATIONAL HOLDINGS <span className="hidden sm:inline mx-3 opacity-40">|</span><br className="sm:hidden" /> ALL RIGHTS RESERVED
               </p>
               <p className="text-[12px] sm:text-[13px] md:text-[15px] opacity-60 max-w-[650px] leading-relaxed">
                 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
               </p>
             </div>
             
             <div className="flex flex-col items-start sm:items-end gap-4 w-full sm:w-auto mt-4 sm:mt-0">
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
          </div>
        </div>
      </footer>
    </main>
  )
}
