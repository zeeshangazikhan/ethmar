export default function Home() {
  return (
    <main data-testid="page-home" className="bg-[#fff]">
      {/* HERO SECTION */}
      <header className="relative min-h-[95vh] flex flex-col bg-[#0b1320]">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/hero.png" 
            className="w-full h-full object-cover grayscale brightness-50"
            alt="Architectural Background"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="absolute top-0 left-0 right-0 z-50 py-10 px-8 md:px-16">
          <nav className="flex justify-between items-start text-[#dfd4bf]">
            <div className="flex gap-4">
               <div className="border border-[#dfd4bf]/40 p-1.5 flex flex-col items-center leading-none">
                  <span className="font-serif text-[18px]">E</span>
                  <span className="font-serif text-[18px] -mt-1">H</span>
               </div>
               <div className="hidden md:flex flex-col text-[11px] tracking-[0.4em] uppercase opacity-90 mt-1">
                 <span className="font-serif font-bold">ETHMAR</span>
                 <span className="mt-1">INTERNATIONAL HOLDING</span>
               </div>
            </div>
            <div className="flex gap-10 items-center text-[11px] tracking-[0.3em] font-medium">
              <span className="cursor-pointer">AR</span>
              <button className="text-2xl leading-none">≡</button>
            </div>
          </nav>
        </div>
        
        <div className="relative z-10 flex-1 flex flex-col justify-end pb-32 px-8 md:px-16">
          <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-end">
            <div>
              <h1 className="text-[#b69c6b] font-serif text-[42px] md:text-[82px] leading-[0.95] uppercase tracking-[0.02em] mb-6">
                INVESTING BEYOND<br />THE OBVIOUS
              </h1>
              <p className="text-[#dfd4bf]/70 uppercase tracking-[0.5em] text-[10px] md:text-[12px]">ETHMAR INTERNATIONAL HOLDING</p>
            </div>
            <div className="flex justify-start md:justify-end mt-12 md:mt-0">
              <a href="#" className="text-[#b69c6b] font-serif text-[18px] md:text-[24px] flex items-center gap-6 group">
                Dive Deepers
                <span className="w-14 h-[1px] bg-gradient-to-r from-transparent to-[#b69c6b] group-hover:w-20 transition-all duration-500"></span>
              </a>
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
            <img src="/assets/horses.png" className="w-full h-auto object-cover rounded-none" alt="Horses" />
          </div>
          <a href="#" className="text-[#191817] font-serif text-[16px] md:text-[18px] flex justify-center items-center gap-4 group uppercase tracking-[0.2em]">
            Learn More
            <span className="w-12 h-[1px] bg-[#191817]/20 group-hover:bg-[#191817] transition-all"></span>
          </a>
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
                <a href="#" className="text-[#191817] font-serif text-[16px] md:text-[18px] flex items-center gap-4 group uppercase tracking-[0.15em]">
                  Read More
                  <span className="w-12 h-[1px] bg-[#191817]/20 group-hover:bg-[#191817] transition-all"></span>
                </a>
             </div>
             <div className="relative">
                <img src="/assets/knight.png" className="w-full h-full object-cover grayscale-[0.2]" alt="Knight" />
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
                <img src="/assets/skyline.png" className="w-full h-full object-cover grayscale brightness-[0.7] group-hover:scale-110 transition-transform duration-1000" alt="Technology" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                <div className="absolute bottom-10 left-0 right-0 text-center px-6">
                  <h3 className="text-white font-serif text-[18px] md:text-[20px] uppercase tracking-[0.3em] leading-tight">TECHNOLOGY & AI</h3>
                </div>
             </div>
             <div className="aspect-[3/4] relative group overflow-hidden">
                <img src="/assets/skyline.png" className="w-full h-full object-cover grayscale brightness-[0.7] group-hover:scale-110 transition-transform duration-1000" alt="Financial" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                <div className="absolute bottom-10 left-0 right-0 text-center px-6">
                  <h3 className="text-white font-serif text-[18px] md:text-[20px] uppercase tracking-[0.3em] leading-tight">FINANCIAL SERVICES & FINTECH</h3>
                </div>
             </div>
             <div className="aspect-[3/4] relative group overflow-hidden">
                <img src="/assets/skyline.png" className="w-full h-full object-cover grayscale brightness-[0.7] group-hover:scale-110 transition-transform duration-1000" alt="Infrastructure" />
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

          <a href="#" className="text-[#191817] font-serif text-[16px] md:text-[18px] flex justify-center items-center gap-4 group uppercase tracking-[0.2em]">
            Reveal more
            <span className="w-12 h-[1px] bg-[#191817]/20 group-hover:bg-[#191817] transition-all"></span>
          </a>
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
          <a href="#" className="inline-block border border-[#191817]/40 px-16 py-5 text-[#191817] uppercase tracking-[0.3em] text-[12px] md:text-[14px] hover:bg-[#191817] hover:text-white transition-all duration-500">
            Get in touch
          </a>
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
                <a href="#" className="hover:text-white transition-colors">ABOUT US</a>
                <a href="#" className="hover:text-white transition-colors">INVESTMENTS</a>
                <a href="#" className="hover:text-white transition-colors">CAREERS</a>
                <a href="#" className="hover:text-white transition-colors">CONTACT US</a>
             </div>
          </div>
          
          <div className="border-t border-[#dfd4bf]/10 pt-16 mt-20">
             <div className="flex flex-wrap gap-8 mb-12 text-[#927e58] font-bold text-[14px] uppercase tracking-[0.1em]">
                <a href="#" className="hover:text-[#dfd4bf] transition-colors">Terms of Use</a>
                <a href="#" className="hover:text-[#dfd4bf] transition-colors">Regulatory Information</a>
                <a href="#" className="hover:text-[#dfd4bf] transition-colors">Privacy</a>
                <a href="#" className="hover:text-[#dfd4bf] transition-colors">Phishing</a>
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
  );
}
