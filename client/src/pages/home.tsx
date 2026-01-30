export default function Home() {
  return (
    <main data-testid="page-home" className="bg-[#fbf8f2]">
      {/* HERO SECTION */}
      <header className="relative min-h-screen flex flex-col">
        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-50 py-8 px-6 md:px-12">
          <nav className="flex justify-between items-center text-[#dfd4bf] uppercase tracking-[0.2em] text-[10px] md:text-[12px]">
            <div className="flex items-center gap-4">
               <div className="border border-[#dfd4bf]/30 p-2 rounded-sm">
                  <span className="font-serif text-lg">EH</span>
               </div>
               <div className="hidden md:block">
                 <span className="font-serif tracking-[0.3em]">ETHMAR</span>
                 <span className="ml-4 opacity-60">INTERNATIONAL HOLDING</span>
               </div>
            </div>
            <div className="flex gap-6 items-center">
              <span className="cursor-pointer hover:text-white transition">AR</span>
              <button className="text-xl">≡</button>
            </div>
          </nav>
        </div>

        {/* Hero Background & Content */}
        <div className="relative flex-1 flex items-center pt-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/assets/hero.png" 
              className="w-full h-full object-cover grayscale brightness-50"
              alt="Architectural Background"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 items-end pb-24">
            <div>
              <h1 className="text-[#b69c6b] font-serif text-[48px] md:text-[82px] leading-[0.9] uppercase tracking-wider mb-4">
                INVESTING BEYOND<br />THE OBVIOUS
              </h1>
              <p className="text-[#dfd4bf]/60 uppercase tracking-[0.4em] text-[10px]">ETHMAR INTERNATIONAL HOLDING</p>
            </div>
            <div className="flex justify-start md:justify-end mt-12 md:mt-0">
              <a href="#" className="text-[#b69c6b] font-serif text-[20px] md:text-[24px] flex items-center gap-4 group">
                Dive Deeper 
                <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#b69c6b] group-hover:w-16 transition-all"></span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* LEGACY SECTION */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif text-[24px] md:text-[30px] uppercase tracking-[0.4em] mb-12">
            WHERE LEGACY BECOMES PRESENCE
          </h2>
          <div className="relative aspect-[21/9] overflow-hidden rounded-sm shadow-2xl mb-8">
            <img src="/assets/horses.png" className="w-full h-full object-cover" alt="Horses" />
          </div>
          <a href="#" className="text-[#191817] font-serif text-[18px] flex justify-center items-center gap-4 group">
            Learn More
            <span className="w-10 h-[1px] bg-[#191817]/30 group-hover:bg-[#191817] transition-colors"></span>
          </a>
        </div>
      </section>

      {/* GLOBAL PRESENCE SECTION */}
      <section className="py-24 px-6 md:px-12 bg-[#fbf8f2]">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif text-[24px] md:text-[30px] uppercase tracking-[0.4em] mb-16">
            A GLOBAL PRESENCE, QUIETLY POWERFUL
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 items-stretch">
            <div className="bg-[#191817] p-12 flex flex-col justify-center text-left">
               <span className="text-[#b69c6b] font-serif text-[60px] md:text-[80px] leading-none">45%</span>
            </div>
            <div className="bg-[#f2efe6] p-12 text-left flex flex-col justify-center border-x border-black/5">
               <h3 className="text-[#191817] font-serif text-[24px] tracking-wider mb-4">UNITED STATES OF AMERICA</h3>
               <p className="text-[#191817] font-serif text-[18px] opacity-80 leading-relaxed">
                 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.
               </p>
            </div>
            <div className="bg-[#191817] p-12 flex flex-col justify-center text-left">
               <span className="text-[#b69c6b] font-serif text-[60px] md:text-[80px] leading-none">20</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTORS SECTION */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif text-[24px] md:text-[30px] uppercase tracking-[0.4em] mb-16">
            THE SECTORS THAT SHAPE TOMORROW
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 bg-[#f2efe6] overflow-hidden rounded-sm">
             <div className="p-12 md:p-20 text-left flex flex-col justify-center order-2 md:order-1">
                <h3 className="text-[#191817] font-serif text-[36px] md:text-[56px] leading-[1.1] mb-8">
                  PRIVATE EQUITY &<br />GROWTH
                </h3>
                <a href="#" className="text-[#191817] font-serif text-[18px] flex items-center gap-4 group">
                  Read More
                  <span className="w-10 h-[1px] bg-[#191817]/30 group-hover:bg-[#191817] transition-colors"></span>
                </a>
             </div>
             <div className="relative h-[400px] md:h-auto order-1 md:order-2">
                <img src="/assets/knight.png" className="w-full h-full object-cover" alt="Knight" />
             </div>
          </div>
        </div>
      </section>

      {/* SECTORS OF FOCUS */}
      <section className="py-24 px-6 md:px-12 bg-white border-t border-black/5">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif text-[24px] md:text-[30px] uppercase tracking-[0.4em] mb-16">
            SECTORS OF FOCUS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="aspect-square relative group overflow-hidden border border-black/5">
                <img src="/assets/hero.png" className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-700" alt="Technology" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-left bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-serif text-[20px] uppercase tracking-widest">TECHNOLOGY & AI</h3>
                </div>
             </div>
             <div className="aspect-square relative group overflow-hidden border border-black/5">
                <img src="/assets/hero.png" className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-700" alt="Financial" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-left bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-serif text-[20px] uppercase tracking-widest">FINANCIAL SERVICES & FINTECH</h3>
                </div>
             </div>
             <div className="aspect-square relative group overflow-hidden border border-black/5">
                <img src="/assets/hero.png" className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-700" alt="Infrastructure" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-left bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-serif text-[20px] uppercase tracking-widest">INFRASTRUCTURE</h3>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP SECTION */}
      <section className="py-24 px-6 md:px-12 bg-[#fbf8f2]">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif text-[24px] md:text-[30px] uppercase tracking-[0.4em] mb-12">
            A DIFFERENT KIND OF PARTNERSHIP
          </h2>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all py-12">
             <span className="font-serif text-2xl">GUGGENHEIM</span>
             <span className="font-serif text-2xl">SPACEX</span>
             <span className="font-serif text-2xl">OpenAI</span>
             <span className="font-serif text-2xl">Lambda</span>
          </div>

          <a href="#" className="text-[#191817] font-serif text-[18px] flex justify-center items-center gap-4 group mt-12">
            Reveal more
            <span className="w-10 h-[1px] bg-[#191817]/30 group-hover:bg-[#191817] transition-colors"></span>
          </a>
        </div>
      </section>

      {/* PARTNER WITH US */}
      <section className="py-24 px-6 md:px-12 bg-[#f2efe6]">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-[#191817] font-serif text-[24px] md:text-[30px] uppercase tracking-[0.4em] mb-8">
            PARTNER WITH US
          </h2>
          <p className="text-[#191817] font-serif text-[20px] leading-relaxed mb-12 opacity-80">
            We collaborate with partners who share our commitment to creating long-term value. 
            If you are building something meant to last, we are ready to build with you.
          </p>
          <a href="#" className="inline-block border border-[#191817] px-12 py-4 text-[#191817] uppercase tracking-widest text-sm hover:bg-[#191817] hover:text-white transition-all">
            Get in touch
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0b1320] text-[#dfd4bf] py-24 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
             <div className="border border-[#dfd4bf]/20 p-6 rounded-sm mb-12">
                <span className="font-serif text-4xl tracking-widest">ETH</span>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-[800px] text-lg tracking-widest">
                <a href="#" className="hover:text-white">ABOUT US</a>
                <a href="#" className="hover:text-white">INVESTMENTS</a>
                <a href="#" className="hover:text-white">CAREERS</a>
                <a href="#" className="hover:text-white">CONTACT US</a>
             </div>
          </div>
          
          <div className="border-t border-[#dfd4bf]/10 pt-12">
             <div className="flex flex-wrap gap-6 mb-8 text-[#927e58] font-bold text-sm uppercase">
                <a href="#">Terms of Use</a>
                <a href="#">Regulatory Information</a>
                <a href="#">Privacy</a>
                <a href="#">Phishing</a>
             </div>
             <p className="text-lg tracking-widest mb-4">2025 ETHMAR INTERNATIONAL HOLDINGS &nbsp;&nbsp; ALL RIGHTS RESERVED</p>
             <p className="text-sm opacity-50 max-w-[800px] leading-relaxed">
               Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo.
             </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
