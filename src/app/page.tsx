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

        <div className="absolute top-0 left-0 right-0 z-50 py-10 px-8 md:px-16">
          <nav className="flex justify-between items-center text-white">
            <div className="flex items-center">
               <span className="font-serif text-[20px] md:text-[26px] tracking-[0.15em]">EIH</span>
            </div>
            <div className="hidden md:flex flex-col items-center text-center text-[12px] md:text-[14px] tracking-[0.35em] uppercase opacity-95">
              
              <span className="mt-1 text-[12px] md:text-[18px]">ETHMAR INTERNATIONAL HOLDING</span>
            </div>
            <div className="flex gap-4 items-center text-[12px] md:text-[14px] tracking-[0.3em] font-medium">
              <button className="flex flex-col justify-center items-center gap-2 md:gap-2 p-2" aria-label="menu">
                 <span className="block w-8 md:w-9 h-[2px] bg-white"></span>
                 <span className="block w-8 md:w-9 h-[2px] bg-white"></span>
              </button>
              <span className="cursor-pointer font-arabic text-[14px] md:text-[16px] leading-none">ع</span>
            </div>
          </nav>
        </div>
        
        <div className="relative z-10 flex-1 flex flex-col justify-center py-20 md:py-32 px-8 md:px-16">
          <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-end">
            <div>
              <h1 className="text-[#b69c6b] font-serif text-[42px] md:text-[82px] leading-[0.95] uppercase tracking-[0.02em] mb-6">
                <span className="block whitespace-nowrap">INVESTING BEYOND</span>
                <span className="block whitespace-nowrap">THE OBVIOUS</span>
              </h1>
              <Link href="#" className="mt-6 inline-flex items-center gap-4 text-white font-serif text-[24px] md:text-[24px] tracking-[0.2em] group">
                <span className="leading-none">Dive Deeper</span>
                <span className="relative inline-flex items-center w-10 h-[1px]">
                 
                  <ArrowRight className="relative text-white" size={20} />
                </span>
              </Link>
            </div>
            <div className="flex justify-start md:justify-end mt-12 md:mt-0">
            </div>
          </div>
        </div>
      </header>

      {/* LEGACY SECTION */}
      <section className="pt-[320px] pb-20 px-8 md:px-16 bg-white">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif font-bold text-[24px] md:text-[30px] uppercase tracking-[0.6em] tracking-[6px] mb-20">
            WHERE LEGACY BECOMES PRESENCE
          </h2>
          <div className="relative mb-12">
            <img src="/assets/horse.jpg" className="w-full object-cover rounded-none" alt="Horses" width={1440} height={420} />
          </div>
          <Link href="#" className="text-[#191817] font-serif font-bold text-[16px] md:text-[18px] inline-flex items-center gap-3 group uppercase tracking-[0.2em]">
            <span>Learn More</span>
           
            <ArrowRight className="text-[#191817]" size={16} />
          </Link>
        </div>
      </section>

      {/* GLOBAL PRESENCE SECTION */}
      <section className="pt-20 pb-20 px-0 md:px-0 bg-white">
        <div className="w-full">
          <h2 className="text-[#191817] font-serif font-bold text-[24px] md:text-[30px] uppercase tracking-[0.6em] tracking-[6px] mb-20 text-center px-8 md:px-16">
            A GLOBAL PRESENCE, QUIETLY POWERFUL
          </h2>

          {/* Carousel Container - Full Width */}
          <div className="overflow-hidden w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex">
              {slides.map((slide) => (
                <div key={slide.id} className="flex-[0_0_70vw] min-w-0 px-4">
                  <div className="grid grid-cols-1 md:grid-cols-[390px_1fr] items-stretch min-h-[550px]">
                    <div className="bg-[#0b1320] flex items-stretch justify-center text-center relative overflow-hidden">
                      <Image src={slide.img} alt={slide.title} fill className="object-cover object-center transform scale-125 md:scale-150" priority />
                      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]"></div>
                    </div>
                    <div className="bg-[#f2efe6] px-8 md:px-16 py-12 flex flex-col justify-center items-center border-black/5">
                       <div className="max-w-[520px] text-center">
                         <h3 className="text-[#191817] font-serif font-medium text-[24px] md:text-[32px] tracking-[0.05em] mb-6 uppercase">{slide.title}</h3>
                         <p className="text-[#191817] font-serif text-[16px] md:text-[18px] opacity-80 leading-[1.4]">
                           Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                           <br />
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
          <div className="flex justify-center items-center gap-3 mt-12 px-8">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`transition-all duration-300 rounded-sm ${
                  idx === selectedIndex
                    ? 'bg-[#b69c6b] w-10 h-1'
                    : 'bg-[#191817]/20 w-6 h-1 hover:bg-[#191817]/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS SECTION */}
      <section className="pt-20 pb-20 px-8 md:px-16 bg-white">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif font-bold text-[24px] md:text-[30px] uppercase tracking-[0.6em] tracking-[6px] mb-20 text-center px-8 md:px-16">
            THE SECTORS THAT SHAPE TOMORROW
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 bg-[#f5f1e8] min-h-[600px]">
             <div className="p-12 md:p-16 lg:p-24 text-left flex flex-col justify-end">
                <h3 className="text-[#191817] font-serif font-normal text-[40px] md:text-[52px] lg:text-[60px] leading-[1.1] mb-12 uppercase">
                  PRIVATE EQUITY &<br />GROWTH
                </h3>
                <Link href="#" className="text-[#191817] font-serif text-[14px] md:text-[16px] flex items-center gap-3 group uppercase tracking-[0.15em]">
                  Read More
                  <ArrowRight className="text-[#191817] transition-transform group-hover:translate-x-1" size={20} />
                </Link>
             </div>
             <div className="relative min-h-[500px] md:min-h-[700px]">
                <Image src="/assets/private-equity.png" className="object-contain object-bottom scale-100" alt="Private Equity" fill priority />
             </div>
          </div>
        </div>
      </section>

      {/* SECTORS OF FOCUS */}
      <section className="pt-20 pb-20 px-0 md:px-0 bg-white">
        <div className="w-full">
          <h2 className="text-[#191817] font-serif font-bold text-[24px] md:text-[30px] uppercase tracking-[0.6em] tracking-[6px] mb-20 text-center px-8 md:px-16">
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
                <div key={sector.id} className="flex-[0_0_33.333vw] min-w-0 px-1">
                  <div className="relative h-[600px] md:h-[750px] group overflow-hidden bg-[#0b1320]">
                    <Image src={sector.img} alt={sector.title} fill className="object-cover grayscale brightness-[0.7] group-hover:scale-110 transition-transform duration-1000" priority />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                  </div>
                  <div className="mt-6 px-4">
                    <h3 className="text-[#191817] font-serif text-[16px] md:text-[18px] uppercase tracking-[0.2em] text-left">{sector.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center items-center gap-3 mt-12 px-8">
            {[1, 2, 3, 4, 5, 6].map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollSectorsTo(idx)}
                className={`transition-all duration-300 rounded-sm ${
                  idx === sectorsSelectedIndex
                    ? 'bg-[#b69c6b] w-10 h-1'
                    : 'bg-[#191817]/20 w-6 h-1 hover:bg-[#191817]/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP SECTION */}
      <section className="pt-20 pb-20 px-8 md:px-16 bg-white">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif font-bold text-[24px] md:text-[30px] uppercase tracking-[0.6em] tracking-[6px] mb-20 text-center px-8 md:px-16">
            A DIFFERENT KIND OF PARTNERSHIP
          </h2>
          
          <div className="flex flex-wrap justify-center items-center gap-0 md:gap-0 mb-20">
             <div className="flex-1 flex justify-center items-center py-12 border-r border-[#191817]/20">
                <div className="relative w-56 h-20">
                   <Image src="/assets/gh-logo.png" alt="Guggenheim" fill className="object-contain" />
                </div>
             </div>
             <div className="flex-1 flex justify-center items-center py-12 border-r border-[#191817]/20">
                <div className="relative w-56 h-20">
                   <Image src="/assets/spacex-logo.png" alt="SpaceX" fill className="object-contain" />
                </div>
             </div>
             <div className="flex-1 flex justify-center items-center py-12 border-r border-[#191817]/20">
                <div className="relative w-56 h-20">
                   <Image src="/assets/openai-logo.png" alt="OpenAI" fill className="object-contain" />
                </div>
             </div>
             <div className="flex-1 flex justify-center items-center py-12">
                <div className="relative w-56 h-20">
                   <Image src="/assets/lambda-logo.png" alt="Lambda" fill className="object-contain" />
                </div>
             </div>
          </div>

          <Link href="#" className="text-[#191817] font-serif text-[16px] md:text-[18px] flex flex-col justify-center items-center gap-2 group uppercase tracking-[0.2em]">
            <span>Reveal more</span>
            <ChevronDown className="text-[#191817] transition-transform group-hover:translate-y-1" size={20} />
          </Link>
        </div>
      </section>

      {/* PARTNER WITH US */}
      <section className="pt-20 pb-20 px-8 md:px-16 bg-[#f2efe6]">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif font-bold text-[24px] md:text-[30px] uppercase tracking-[0.6em] tracking-[6px] mb-20 text-center px-8 md:px-16">
            PARTNER WITH US
          </h2>
          <p className="text-[#191817] font-serif text-[18px] md:text-[20px] leading-[1.8] mb-14 opacity-80">
            We collaborate with partners who share our commitment to creating long-term value. 
            If you are building something meant to last, we are ready to build with you.
          </p>
          <Link href="#" className="group inline-flex items-center gap-4 justify-center text-[#191817] font-serif text-[18px] md:text-[20px] tracking-normal">
            <span>Get in touch</span>
            <ArrowRight className="transition-transform group-hover:translate-x-2" size={20} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-[#dfd4bf] pt-40 pb-20 px-8 md:px-16 relative overflow-hidden" style={{ backgroundImage: "url('/assets/footer-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-32">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-24 w-full max-w-[1200px] text-[17px] md:text-[22px] tracking-[0.15em] font-serif mb-32">
                <Link href="#" className="hover:opacity-80 transition-opacity uppercase">ABOUT US</Link>
                <Link href="#" className="hover:opacity-80 transition-opacity uppercase">INVESTMENTS</Link>
                <Link href="#" className="hover:opacity-80 transition-opacity uppercase">CAREERS</Link>
                <Link href="#" className="hover:opacity-80 transition-opacity uppercase">CONTACT US</Link>
             </div>

             <div className="flex justify-end w-full mb-12">
                <div />
             </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
             <div className="flex flex-col gap-3">
               <p className="text-[15px] md:text-[17px] tracking-[0.05em] opacity-90 uppercase">
                 2026 ETHMAR INTERNATIONAL HOLDINGS <span className="mx-3 opacity-40">|</span> ALL RIGHTS RESERVED
               </p>
               <p className="text-[14px] md:text-[15px] opacity-60 max-w-[650px] leading-relaxed">
                 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
               </p>
             </div>
             
             <div className="flex flex-col items-end gap-4">
                <Link href="#" className="text-[#b69c6b] hover:text-[#dfd4bf] transition-colors transform -translate-y-3 md:-translate-y-4" aria-label="LinkedIn">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </Link>
                <div className="flex flex-wrap gap-6 text-[14px] md:text-[15px] opacity-70 text-right">
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
