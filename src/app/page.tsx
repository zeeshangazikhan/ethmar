import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main data-testid="page-home" className="bg-[#fff]">
      {/* HERO SECTION */}
      <header className="relative min-h-[95vh] flex flex-col bg-[#0b1320]">
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
          <nav className="flex justify-between items-center text-[#dfd4bf]">
            <div className="flex items-center">
               <span className="font-serif text-[20px] md:text-[26px] tracking-[0.15em]">EIH</span>
            </div>
            <div className="hidden md:flex flex-col items-center text-center text-[12px] md:text-[14px] tracking-[0.35em] uppercase opacity-95">
              
              <span className="mt-1 text-[12px] md:text-[18px]">ETHMAR INTERNATIONAL HOLDING</span>
            </div>
            <div className="flex gap-4 items-center text-[12px] md:text-[14px] tracking-[0.3em] font-medium">
              <button className="flex flex-col justify-center items-center gap-2 md:gap-2 p-2" aria-label="menu">
                <span className="block w-8 md:w-9 h-[2px] bg-[#dfd4bf]"></span>
                <span className="block w-8 md:w-9 h-[2px] bg-[#dfd4bf]"></span>
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
      <section className="py-32 px-8 md:px-16 bg-white">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif text-[24px] md:text-[30px] uppercase tracking-[0.6em] mb-20">
            WHERE LEGACY BECOMES PRESENCE
          </h2>
          <div className="relative mb-12">
            <Image src="/assets/horses.png" className="w-full h-auto object-cover rounded-none" alt="Horses" width={1440} height={600} />
          </div>
          <Link href="#" className="text-[#191817] font-serif text-[16px] md:text-[18px] flex justify-center items-center gap-4 group uppercase tracking-[0.2em]">
            Learn More
            <span className="w-12 h-[1px] bg-[#191817]/20 group-hover:bg-[#191817] transition-all"></span>
          </Link>
        </div>
      </section>

      {/* GLOBAL PRESENCE SECTION */}
      <section className="py-32 px-8 md:px-16 bg-[#fbf8f2]">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif text-[24px] md:text-[30px] uppercase tracking-[0.6em] mb-20">
            A GLOBAL PRESENCE, QUIETLY POWERFUL
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_280px] items-stretch min-h-[320px]">
            <div className="bg-[#0b1320] p-16 flex flex-col justify-center text-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]"></div>
               <span className="text-[#b69c6b] font-serif text-[60px] md:text-[80px] leading-none relative z-10">45%</span>
            </div>
            <div className="bg-[#f2efe6] px-16 py-12 text-left flex flex-col justify-center border-x border-black/5">
               <h3 className="text-[#191817] font-serif text-[28px] md:text-[35px] tracking-[0.05em] mb-6 uppercase">UNITED STATES OF AMERICA</h3>
               <p className="text-[#191817] font-serif text-[18px] md:text-[20px] opacity-80 leading-[1.6]">
                 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.
               </p>
            </div>
            <div className="bg-[#0b1320] p-16 flex flex-col justify-center text-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]"></div>
               <span className="text-[#b69c6b] font-serif text-[60px] md:text-[80px] leading-none relative z-10">20</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTORS SECTION */}
      <section className="py-32 px-8 md:px-16 bg-white">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif text-[24px] md:text-[30px] uppercase tracking-[0.6em] mb-20">
            THE SECTORS THAT SHAPE TOMORROW
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 bg-[#f2efe6] min-h-[500px]">
             <div className="p-12 md:p-24 text-left flex flex-col justify-center">
                <h3 className="text-[#191817] font-serif text-[42px] md:text-[56px] leading-[1] mb-12 uppercase">
                  PRIVATE EQUITY &<br />GROWTH
                </h3>
                <Link href="#" className="text-[#191817] font-serif text-[16px] md:text-[18px] flex items-center gap-4 group uppercase tracking-[0.15em]">
                  Read More
                  <span className="w-12 h-[1px] bg-[#191817]/20 group-hover:bg-[#191817] transition-all"></span>
                </Link>
             </div>
             <div className="relative min-h-[300px]">
                <Image src="/assets/knight.png" className="object-cover grayscale-[0.2]" alt="Knight" fill />
             </div>
          </div>
        </div>
      </section>

      {/* SECTORS OF FOCUS */}
      <section className="py-32 px-8 md:px-16 bg-white border-t border-black/5">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif text-[24px] md:text-[30px] uppercase tracking-[0.6em] mb-20">
            SECTORS OF FOCUS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
             <div className="aspect-[3/4] relative group overflow-hidden">
                <Image src="/assets/skyline.png" className="object-cover grayscale brightness-[0.7] group-hover:scale-110 transition-transform duration-1000" alt="Technology" fill />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                <div className="absolute bottom-10 left-0 right-0 text-center px-6">
                  <h3 className="text-white font-serif text-[18px] md:text-[20px] uppercase tracking-[0.3em] leading-tight">TECHNOLOGY & AI</h3>
                </div>
             </div>
             <div className="aspect-[3/4] relative group overflow-hidden">
                <Image src="/assets/skyline.png" className="object-cover grayscale brightness-[0.7] group-hover:scale-110 transition-transform duration-1000" alt="Financial" fill />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                <div className="absolute bottom-10 left-0 right-0 text-center px-6">
                  <h3 className="text-white font-serif text-[18px] md:text-[20px] uppercase tracking-[0.3em] leading-tight">FINANCIAL SERVICES & FINTECH</h3>
                </div>
             </div>
             <div className="aspect-[3/4] relative group overflow-hidden">
                <Image src="/assets/skyline.png" className="object-cover grayscale brightness-[0.7] group-hover:scale-110 transition-transform duration-1000" alt="Infrastructure" fill />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                <div className="absolute bottom-10 left-0 right-0 text-center px-6">
                  <h3 className="text-white font-serif text-[18px] md:text-[20px] uppercase tracking-[0.3em] leading-tight">INFRASTRUCTURE</h3>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP SECTION */}
      <section className="py-32 px-8 md:px-16 bg-white">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif text-[24px] md:text-[30px] uppercase tracking-[0.6em] mb-20">
            A DIFFERENT KIND OF PARTNERSHIP
          </h2>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-80 grayscale hover:grayscale-0 transition-all mb-20">
             <span className="font-serif text-[24px] md:text-[28px] tracking-tight">GUGGENHEIM</span>
             <span className="font-serif text-[24px] md:text-[28px] tracking-tighter">SPACEX</span>
             <span className="font-serif text-[24px] md:text-[28px] font-bold">OpenAI</span>
             <span className="font-serif text-[24px] md:text-[28px] font-bold">λ Lambda</span>
          </div>

          <Link href="#" className="text-[#191817] font-serif text-[16px] md:text-[18px] flex justify-center items-center gap-4 group uppercase tracking-[0.2em]">
            Reveal more
            <span className="w-12 h-[1px] bg-[#191817]/20 group-hover:bg-[#191817] transition-all"></span>
          </Link>
        </div>
      </section>

      {/* PARTNER WITH US */}
      <section className="py-32 px-8 md:px-16 bg-[#f2efe6]">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif text-[24px] md:text-[30px] uppercase tracking-[0.6em] mb-10">
            PARTNER WITH US
          </h2>
          <p className="text-[#191817] font-serif text-[18px] md:text-[20px] leading-[1.8] mb-14 opacity-80">
            We collaborate with partners who share our commitment to creating long-term value. 
            If you are building something meant to last, we are ready to build with you.
          </p>
          <Link href="#" className="inline-block border border-[#191817]/40 px-16 py-5 text-[#191817] uppercase tracking-[0.3em] text-[12px] md:text-[14px] hover:bg-[#191817] hover:text-white transition-all duration-500">
            Get in touch
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0b1320] text-[#dfd4bf] pt-40 pb-20 px-8 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-24">
             <div className="border border-[#dfd4bf]/20 px-6 py-4 mb-16 inline-block">
                <div className="flex flex-col items-center leading-tight">
                  <span className="font-serif text-[32px] tracking-[0.2em]">E</span>
                  <span className="font-serif text-[32px] tracking-[0.2em] -mt-2">H</span>
                </div>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-[1000px] text-[18px] md:text-[25px] tracking-[0.1em] font-serif opacity-80">
                <Link href="#" className="hover:text-white transition-colors">ABOUT US</Link>
                <Link href="#" className="hover:text-white transition-colors">INVESTMENTS</Link>
                <Link href="#" className="hover:text-white transition-colors">CAREERS</Link>
                <Link href="#" className="hover:text-white transition-colors">CONTACT US</Link>
             </div>
          </div>
          
          <div className="border-t border-[#dfd4bf]/10 pt-16 mt-20">
             <div className="flex flex-wrap gap-8 mb-12 text-[#927e58] font-bold text-[14px] uppercase tracking-[0.1em]">
                <Link href="#" className="hover:text-[#dfd4bf] transition-colors">Terms of Use</Link>
                <Link href="#" className="hover:text-[#dfd4bf] transition-colors">Regulatory Information</Link>
                <Link href="#" className="hover:text-[#dfd4bf] transition-colors">Privacy</Link>
                <Link href="#" className="hover:text-[#dfd4bf] transition-colors">Phishing</Link>
             </div>
             
             <div className="flex flex-col gap-6">
               <p className="text-[16px] md:text-[18px] tracking-[0.1em] font-bold opacity-90 uppercase">
                 2025 ETHMAR INTERNATIONAL HOLDINGS <span className="mx-4 opacity-40">|</span> ALL RIGHTS RESERVED
               </p>
               <p className="text-[16px] md:text-[18px] opacity-60 max-w-[900px] leading-relaxed font-serif italic">
                 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo.
               </p>
             </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
