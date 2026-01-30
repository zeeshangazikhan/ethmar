export default function Home() {
  return (
    <main data-testid="page-home">
      <header className="ethmar-hero">
        <div className="ethmar-topbar">
          <div className="ethmar-container">
            <nav className="ethmar-nav" aria-label="Primary">
              <a
                href="#"
                className="ethmar-brand"
                data-testid="link-brand"
                aria-label="Ethmar"
              >
                <strong>ETHMAR</strong>
                <span>INTERNATIONAL HOLDING</span>
              </a>
              <button
                type="button"
                className="opacity-80 hover:opacity-100 transition"
                data-testid="button-menu"
                aria-label="Open menu"
              >
                ≡
              </button>
            </nav>
          </div>
        </div>

        <div className="ethmar-hero-content ethmar-container ethmar-fade-in">
          <div className="ethmar-hero-grid">
            <div>
              <p className="ethmar-hero-subtle" data-testid="text-hero-kicker">
                ETHMAR INTERNATIONAL HOLDING
              </p>
              <h1 className="ethmar-h1" data-testid="text-hero-title">
                INVESTING BEYOND
                <br />
                THE OBVIOUS
              </h1>
            </div>

            <div className="ethmar-hero-cta-wrap">
              <a
                href="#presence"
                className="ethmar-cta"
                data-testid="link-dive-deeper"
              >
                Dive Deeper
                <span className="ethmar-cta-line" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="ethmar-section ethmar-media" id="presence">
        <div className="ethmar-container">
          <p className="ethmar-kicker text-center" data-testid="text-kicker-legacy">
            WHERE LEGACY BECOMES PRESENCE
          </p>
          <div className="ethmar-divider" aria-hidden="true" />

          <div className="mt-10 ethmar-media-frame">
            <img
              src="/assets/horses.jpg"
              alt="A group of horses"
              data-testid="img-legacy"
            />
          </div>

          <div className="mt-6 text-center">
            <a
              href="#global"
              className="ethmar-link"
              data-testid="link-learn-more"
            >
              Learn More <span className="line" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="ethmar-section" id="global">
        <div className="ethmar-container">
          <p className="ethmar-kicker text-center" data-testid="text-kicker-global">
            A GLOBAL PRESENCE, QUIETLY POWERFUL
          </p>
          <div className="ethmar-divider" aria-hidden="true" />

          <div className="mt-12 ethmar-stat-grid">
            <div className="ethmar-stat" data-testid="card-stat-left">
              <div className="ethmar-stat-number" data-testid="text-stat-45">
                45%
              </div>
              <div className="ethmar-stat-label" data-testid="text-stat-label-left">
                Lorem ipsum
              </div>
            </div>

            <div className="ethmar-stat-center" data-testid="card-stat-center">
              <h3 data-testid="text-country-usa">UNITED STATES OF AMERICA</h3>
              <p data-testid="text-country-desc">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                nonummy nibh euismod tincidunt ut laoreet.
              </p>
            </div>

            <div className="ethmar-stat" data-testid="card-stat-right">
              <div className="ethmar-stat-number" data-testid="text-stat-20">
                20
              </div>
              <div className="ethmar-stat-label" data-testid="text-stat-label-right">
                Lorem ipsum
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ethmar-section" id="sectors">
        <div className="ethmar-container">
          <p className="ethmar-kicker text-center" data-testid="text-kicker-sectors">
            THE SECTORS THAT SHAPE TOMORROW
          </p>
          <div className="ethmar-divider" aria-hidden="true" />

          <div className="mt-12 ethmar-sector-grid">
            <div className="ethmar-sector-visual">
              <img
                src="/assets/knight.jpg"
                alt="A chess knight piece"
                data-testid="img-sector-hero"
              />
            </div>

            <div>
              <h2 className="ethmar-sector-title" data-testid="text-sector-title">
                PRIVATE EQUITY &
                <br />
                GROWTH
              </h2>
              <div className="mt-6">
                <a
                  href="#focus"
                  className="ethmar-link"
                  data-testid="link-read-more"
                >
                  Read More <span className="line" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ethmar-section ethmar-history" id="focus">
        <div className="ethmar-container">
          <p className="ethmar-kicker text-center" data-testid="text-kicker-focus">
            SECTORS OF FOCUS
          </p>
          <div className="ethmar-divider" aria-hidden="true" />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center" data-testid="card-focus-technology">
              <h3 className="ethmar-title text-[20px] tracking-[0.22em] uppercase" data-testid="text-focus-technology">
                TECHNOLOGY & AI
              </h3>
            </div>
            <div className="text-center" data-testid="card-focus-fintech">
              <h3 className="ethmar-title text-[20px] tracking-[0.22em] uppercase" data-testid="text-focus-fintech">
                FINANCIAL SERVICES & FINTECH
              </h3>
            </div>
            <div className="text-center" data-testid="card-focus-infra">
              <h3 className="ethmar-title text-[20px] tracking-[0.22em] uppercase" data-testid="text-focus-infra">
                INFRASTRUCTURE
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="ethmar-section" id="partnership">
        <div className="ethmar-container">
          <p className="ethmar-kicker text-center" data-testid="text-kicker-partnership">
            A DIFFERENT KIND OF PARTNERSHIP
          </p>
          <div className="ethmar-divider" aria-hidden="true" />

          <div className="mt-10 text-center">
            <a
              href="#partner"
              className="ethmar-link"
              data-testid="link-reveal-more"
            >
              Reveal more <span className="line" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="ethmar-section" id="partner">
        <div className="ethmar-container">
          <p className="ethmar-kicker text-center" data-testid="text-kicker-partner">
            PARTNER WITH US
          </p>
          <div className="ethmar-divider" aria-hidden="true" />

          <div className="mt-10 text-center max-w-[900px] mx-auto">
            <p
              className="ethmar-title text-[20px] leading-relaxed opacity-90"
              data-testid="text-partner-desc"
            >
              We collaborate with partners who share our commitment to creating
              long-term value. If you are building something meant to last, we
              are ready to build with you.
            </p>

            <div className="mt-8">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-[rgba(25,24,23,0.25)] hover:bg-[rgba(25,24,23,0.06)] transition font-[var(--font-display)] tracking-[0.16em] uppercase text-[14px]"
                data-testid="link-get-in-touch"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="ethmar-footer" id="contact">
        <div className="ethmar-container">
          <div className="ethmar-footer-top">
            <div className="ethmar-logo-mark" data-testid="img-footer-mark" aria-hidden="true">
              EH
            </div>
          </div>

          <div className="ethmar-footer-bottom">
            <div className="ethmar-footer-nav" data-testid="nav-footer">
              <a href="#" data-testid="link-footer-about">
                ABOUT US
              </a>
              <a href="#" data-testid="link-footer-investments">
                INVESTMENTS
              </a>
              <a href="#" data-testid="link-footer-careers">
                CAREERS
              </a>
              <a href="#" data-testid="link-footer-contact">
                CONTACT US
              </a>
            </div>

            <div className="ethmar-footer-legal" data-testid="nav-footer-legal">
              <a href="#" data-testid="link-terms">
                Terms of Use
              </a>
              <a href="#" data-testid="link-regulatory">
                Regulatory Information
              </a>
              <a href="#" data-testid="link-privacy">
                Privacy
              </a>
              <a href="#" data-testid="link-phishing">
                Phishing
              </a>
            </div>

            <div className="ethmar-footer-copy" data-testid="text-footer-copy">
              2025 ETHMAR INTERNATIONAL HOLDINGS &nbsp;&nbsp; ALL RIGHTS RESERVED
            </div>

            <div className="ethmar-footer-small" data-testid="text-footer-desc">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
              volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
