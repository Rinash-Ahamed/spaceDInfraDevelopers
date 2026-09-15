'use client'

import { motion } from 'framer-motion'
import { AnimatedCounter } from './animated-counter'

export function Achievements() {

  return (

    <section className="relative bg-black py-16 md:py-24 border-y border-white/5 overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 flex h-28 items-end justify-center gap-2 px-6 opacity-20" aria-hidden="true">
        {[44, 72, 52, 92, 64, 84, 48, 78, 58, 96, 68, 88].map((height, i) => (
          <motion.span
            key={`${height}-${i}`}
            className="w-3 rounded-t-sm bg-[#FDB614]"
            initial={{ height: 0 }}
            whileInView={{ height }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: "easeOut" }}
            viewport={{ once: true }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-[#FDB614] tracking-widest mb-10 text-3xl md:text-4xl font-[family-name:var(--font-playfair)]">
          OUR ACHIEVEMENTS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-4xl md:text-6xl text-white font-light"><AnimatedCounter target={48} />+</p>
            <p className="text-xs tracking-widest text-[#FDB614]">PROJECTS COMPLETED</p>
          </div>

          <div>
            <p className="text-4xl md:text-6xl text-white font-light"><AnimatedCounter target={8} /></p>
            <p className="text-xs tracking-widest text-[#FDB614]">ONGOING</p>
          </div>

          <div>
            <p className="text-4xl md:text-6xl text-white font-light"><AnimatedCounter target={7} />+</p>
            <p className="text-xs tracking-widest text-[#FDB614]">YEARS EXPERIENCE</p>
          </div>

          <div>
            <p className="text-4xl md:text-6xl text-white font-light"><AnimatedCounter target={87} />+</p>
            <p className="text-xs tracking-widest text-[#FDB614]">HAPPY CLIENTS</p>
          </div>
        </div>
      </div>
    </section>


  )
}
