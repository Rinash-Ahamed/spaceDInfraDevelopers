import Image from 'next/image'

const navigation = [
  ['About us', '#about'],
  ['Our projects', '#projects'],
  ['Our founder', '#founder'],
  ['FAQs', '#faq'],
] as const

const socialLinks = [
  ['Instagram', 'https://www.instagram.com/space_d_infra_developers/', '/icons/instagram.png'],
  ['Facebook', 'https://facebook.com/share/1CnyrXX1GK/', '/icons/facebook.png'],
  ['WhatsApp', 'https://wa.me/919995060708', '/icons/whatsapp.png'],
] as const

const linkStyle = 'transition-colors hover:text-[#FDB614] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FDB614]'

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-[#FDB614]/25 bg-[#090909] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(#FDB614 1px, transparent 1px), linear-gradient(90deg, #FDB614 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'linear-gradient(to bottom, black, transparent)',
        }}
      />
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative flex flex-col gap-8 border-b border-white/10 py-14 md:flex-row md:items-end md:justify-between md:py-20">
          <div>
            <h2 className="max-w-2xl font-[family-name:var(--font-playfair)] text-4xl leading-[1.15] sm:text-5xl md:text-6xl">
              Every great space<br />
              starts with <span className="italic text-[#FDB614]">a conversation.</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="group inline-flex w-fit shrink-0 items-center gap-6 rounded-full border border-[#FDB614]/60 px-7 py-4 text-xs tracking-widest text-[#FDB614] transition-colors hover:bg-[#FDB614] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FDB614]"
          >
            LET’S BUILD TOGETHER
            <span aria-hidden="true" className="text-xl transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none">↗</span>
          </a>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_1.2fr_0.7fr] lg:gap-12 lg:py-16">
          <div>
            <a href="#home" aria-label="Space-D Infra Developers — back to home" className={`inline-flex items-center gap-3 ${linkStyle}`}>
              <Image src="/justlogo.png" alt="" width={48} height={48} />
              <span>
                <span className="block text-xl tracking-[0.2em]">SPACE-D</span>
                <span className="mt-1 block text-[9px] tracking-[0.22em] text-white/50">INFRA DEVELOPERS</span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/55">
              Thoughtful design. Honest craftsmanship. Spaces built for the way you live.
            </p>
            <p className="mt-6 text-[10px] tracking-[0.22em] text-[#FDB614]/80">INNOVATE. DESIGN. SHAPE.</p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="mb-5 text-[10px] tracking-[0.25em] text-white/40">EXPLORE</h3>
            <ul className="space-y-3 text-sm text-white/75">
              {navigation.map(([label, href]) => (
                <li key={href}><a href={href} className={linkStyle}>{label}</a></li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-5 text-[10px] tracking-[0.25em] text-white/40">FIND US</h3>
            <address className="space-y-4 text-sm not-italic leading-6 text-white/75">
              <p>5/1957, Kuzhalmannam Koduvayur Rd<br />Koduvayur, Kerala 678501</p>
              <a href="tel:+919995060708" className={`block w-fit ${linkStyle}`}>+91 99950 60708</a>
              <a href="mailto:info.spacedinfra@gmail.com" className={`block w-fit break-all ${linkStyle}`}>info.spacedinfra@gmail.com</a>
            </address>
          </div>

          <div>
            <h3 className="mb-5 text-[10px] tracking-[0.25em] text-white/40">STAY CONNECTED</h3>
            <ul className="space-y-3 text-sm text-white/75">
              {socialLinks.map(([label, href, icon]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-3 ${linkStyle}`}>
                    <Image src={icon} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
                    {label}<span aria-hidden="true" className="text-[#FDB614]/70">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/10 py-6 text-[11px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Space-D Infra Developers. All rights reserved.</p>
          <a href="#home" className={`inline-flex w-fit items-center gap-3 text-[10px] tracking-[0.2em] ${linkStyle}`}>
            BACK TO TOP <span aria-hidden="true" className="text-base text-[#FDB614]">↑</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
