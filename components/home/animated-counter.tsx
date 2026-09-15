'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

export function AnimatedCounter({ target, duration = 1.5 }: { target: number, duration?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    if (inView) {
      const controls = animate(count, target, { duration, ease: "easeOut" })
      return controls.stop
    }
  }, [count, target, duration, inView])

  return <motion.span ref={ref}>{rounded}</motion.span>
}
