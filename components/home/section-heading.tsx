'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export function SectionHeading({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.h2
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-[#FDB614]">
        {children}
      </span>
    </motion.h2>
  )
}
