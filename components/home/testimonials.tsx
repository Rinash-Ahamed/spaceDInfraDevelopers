'use client'

import { SectionHeading } from './section-heading'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { reviews } from '@/data/home'

export function Testimonials() {
  const [reviewIndex, setReviewIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setReviewIndex(index => (index + 1) % reviews.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])
  return (
    <section className="bg-black py-16 md:py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <SectionHeading className="text-[#FDB614] tracking-widest mb-10 text-3xl md:text-4xl font-[family-name:var(--font-playfair)]">
          WHAT OUR CLIENTS SAY
        </SectionHeading>

        <div className="relative h-40 flex items-center justify-center">
          <motion.div
            key={reviewIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute"
          >
            <p className="text-white/90 text-lg leading-relaxed mb-4">
              &quot;{reviews[reviewIndex].text}&quot;
            </p>
            <p className="text-[#FDB614] tracking-widest text-sm">
              - {reviews[reviewIndex].name}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
