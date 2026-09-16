'use client'

import { SectionHeading } from './section-heading'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { faqs } from '@/data/home'

export function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  return (

    <section id="faq" className="bg-black py-16 md:py-24 border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-[#FDB614] tracking-widest text-sm mb-3">CLIENT QUESTIONS</p>
          <SectionHeading className="text-white text-3xl md:text-5xl font-[family-name:var(--font-playfair)]">
            Frequently Asked Questions
          </SectionHeading>
          <p className="text-white/60 mt-4 leading-relaxed">
            Clear answers before the first site visit.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
                viewport={{ once: true }}
                className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02] transition-all duration-300 hover:border-[#FDB614]/70 hover:shadow-[0_0_16px_rgba(253,182,20,0.18)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 px-5 md:px-7 py-5 text-left hover:bg-white/[0.04] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-white font-medium tracking-wide">
                    {faq.question}
                  </span>
                  <span className="shrink-0 text-[#FDB614] text-2xl leading-none">
                    {isOpen ? "-" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <p className="px-5 md:px-7 pb-5 text-white/70 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
