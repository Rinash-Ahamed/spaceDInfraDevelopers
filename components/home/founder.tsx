'use client'

import { SectionHeading } from './section-heading'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

export function Founder() {
  const reduceMotion = useReducedMotion()
  return (

    <section id="founder" className="bg-[#080808] py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-6">
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Founder Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] max-h-[520px] w-full rounded-3xl overflow-hidden border border-white/10 group">
              <Image
                src="/founder.png"
                alt="Founder - Space-D Infra Developers"
                sizes="(max-width: 768px) 100vw, 50vw"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
              />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
              <p className="absolute bottom-6 left-6 text-[10px] tracking-[0.25em] text-white/85">INNOVATE. DESIGN. SHAPE.</p>
            </div>
          </div>

          {/* Founder Content */}
          <div className="w-full">
            <p className="mb-5 text-[10px] tracking-[0.25em] text-[#FDB614]">THE PERSON BEHIND THE VISION</p>
            <SectionHeading className="text-4xl md:text-5xl mb-3 font-[family-name:var(--font-playfair)] text-white">
              <span className="text-white">Haris Rahman</span>
            </SectionHeading>
            <p className="text-[#FDB614]/85 text-sm mb-8">
              Founder & Managing Director
            </p>

            <p className="border-l-2 border-[#FDB614]/60 pl-5 text-2xl leading-snug text-white font-[family-name:var(--font-playfair)]">
              Global perspective.<br />A local understanding.
            </p>
            <p className="text-white/75 text-sm md:text-base leading-7 mt-6">
              Born and based in Kerala, Haris combines his passion for civil engineering with advanced studies in London. His approach brings international design and construction knowledge to spaces built for life here.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-5 border-t border-white/10 pt-6">
              <div><p className="text-[10px] tracking-[0.2em] text-white/45">ROOTED IN</p><p className="mt-2 text-lg text-white">Kerala</p></div>
              <div><p className="text-[10px] tracking-[0.2em] text-white/45">SHAPED BY</p><p className="mt-2 text-lg text-white">London studies</p></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
