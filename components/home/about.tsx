import { SectionHeading } from './section-heading'

export function About() {

  return (

    <section id="about" className="bg-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Text */}
        <div className="w-full">
          <SectionHeading className="mb-6 text-4xl leading-tight text-white md:text-5xl font-[family-name:var(--font-playfair)]"><span className="text-white">Thoughtful spaces.</span><br />Lasting value.</SectionHeading>
          <p className="max-w-lg text-sm leading-7 text-white/75 md:text-base">We bring design and construction together to create homes and commercial spaces that feel right, work beautifully, and stand the test of time.</p>
          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {[
              ['Designed for life', 'Spaces shaped around the way you live and work.'],
              ['Built with care', 'Precision, material quality, and thoughtful execution.'],
              ['Rooted in trust', 'Clear communication from the first idea to the final detail.'],
            ].map(([title, description]) => (
              <div key={title} className="py-4">
                <div>
                  <h3 className="text-sm font-medium text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-white/60">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand video */}
        <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b] shadow-[0_20px_60px_-30px_rgba(253,182,20,0.18)]">
          <video
            src="/about.mp4"
            poster="/about.jpg"
            aria-label="About Space-D Infra Developers"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="block h-auto w-full rounded-3xl"
          />
        </div>
      </div>
    </section>
  )
}
