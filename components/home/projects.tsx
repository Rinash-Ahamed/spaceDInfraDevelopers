'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import type { ProjectImage } from '@/lib/projects'

export function Projects({ projects }: { projects: ProjectImage[] }) {
  const reduceMotion = useReducedMotion()
  return (
    <section id="projects" className="relative overflow-hidden bg-[#080808] py-16 md:py-28">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FDB614]/35 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            <p className="flex items-center gap-3 text-[#FDB614] tracking-[0.3em] mb-4 text-[10px] font-medium">
              <span aria-hidden="true" className="h-px w-8 bg-[#FDB614]" />
              SELECTED WORK
            </p>
            <h2 className="text-4xl md:text-6xl text-white font-[family-name:var(--font-playfair)]">
              Featured Projects
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-sm md:text-base leading-relaxed">
            A curated selection of our finest architectural and interior achievements,
            blending aesthetic elegance with structural integrity.
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <p className="text-center text-white/60">
            Project images will appear here soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8">
            {projects.map((project, i) => (
              <motion.figure
                key={project.id}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className={`group relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/[0.03] ring-1 ring-white/10 transition-shadow duration-500 hover:ring-[#FDB614]/40 hover:shadow-[0_16px_60px_-24px_rgba(253,182,20,0.2)] md:aspect-auto md:h-[380px] lg:h-[440px] ${i === projects.length - 1 && projects.length % 2 !== 0
                  ? 'md:col-span-12'
                  : i % 4 === 0 || i % 4 === 3 ? 'md:col-span-7' : 'md:col-span-5'}`}
              >
                <Image
                  src={project.src}
                  alt={project.title}
                  sizes={i === projects.length - 1 && projects.length % 2 !== 0
                    ? '(max-width: 1280px) 100vw, 1232px'
                    : '(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 720px'}
                  fill
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none"
                />
                <div aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-lg border border-white/0 transition-colors duration-500 group-hover:border-white/25 md:inset-4" />
              </motion.figure>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
