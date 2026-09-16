'use client'

import { motion, useReducedMotion } from 'framer-motion'

export function Hero() {
  const reduceMotion = useReducedMotion()
  return (
    <>
      <section
        id="home"
        className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28 md:min-h-screen md:pt-32"
      >
        <div
          className="absolute inset-0"
        >
          <video
            src="/intro.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-[40%_center] md:object-[30%_center]"
          />
        </div>

        {/* Cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black md:via-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10 md:via-black/35 md:to-transparent" />

        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-start justify-end px-5 pb-20 pt-10 sm:px-6 md:pb-28"
        >
          <h1 className="max-w-2xl text-3xl md:text-6xl text-white leading-tight font-[family-name:var(--font-playfair)] tracking-normal sm:tracking-wide">
            <span className="inline-block overflow-hidden align-bottom pb-2 -mb-2 pr-2">
              <span className="inline-block animate-[fadeInUp_1s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none">
                Designing Spaces.
              </span>
            </span>{" "}
            <span className="inline-block overflow-hidden align-bottom pb-2 -mb-2 pr-2">
              <span className="inline-block animate-[fadeInUp_1s_cubic-bezier(0.16,1,0.3,1)_0.3s_both] motion-reduce:animate-none">
                <span className="hero-gold-gradient">Building Trust.</span>
              </span>
            </span>
          </h1>
          <p className="max-w-lg mt-4 text-white/65 leading-relaxed text-sm md:text-base">
            Thoughtful design, reliable construction, and transparent execution for homes and commercial spaces built to last.
          </p>
          <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-md bg-[#FDB614] px-6 py-3 text-sm font-medium tracking-widest text-black transition-all duration-300 hover:bg-white hover:-translate-y-1"
            >
              VIEW PROJECTS
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-medium tracking-widest text-white transition-all duration-300 hover:border-[#FDB614] hover:text-[#FDB614] hover:-translate-y-1"
            >
              GET CONSULTATION
            </a>
          </div>
        </motion.div>

        {/* Curved bottom mask */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C240,80 480,80 720,60 960,40 1200,20 1440,30 L1440,90 L0,90 Z"
            fill="black"
          />
        </svg>
      </section>
    </>
  )
}
