'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

export function WhatsAppBubble() {
  const origin = useRef<HTMLDivElement>(null)
  const bubble = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const container = origin.current
    const button = bubble.current
    const destination = document.getElementById('footer-whatsapp')
    const icon = document.getElementById('footer-whatsapp-icon')
    if (!container || !button || !destination || !icon) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const update = () => {
      frame = 0
      const start = container.getBoundingClientRect()
      const end = icon.getBoundingClientRect()
      // Dock over the last 120px of the footer icon entering the viewport.
      const progress = Math.max(0, Math.min(1, (window.innerHeight - end.bottom) / 120))
      const x = end.left + end.width / 2 - (start.left + start.width / 2)
      const y = end.top + end.height / 2 - (start.top + start.height / 2)
      const movement = reducedMotion.matches ? 0 : progress

      button.style.transform = `translate(${x * movement}px, ${y * movement}px) scale(${1 - movement * 0.64})`
      button.style.opacity = reducedMotion.matches
        ? String(progress < 1 ? 1 : 0)
        : String(1 - Math.max(0, (progress - 0.75) / 0.25))
      button.style.pointerEvents = progress === 1 ? 'none' : 'auto'
      button.tabIndex = progress === 1 ? -1 : 0
      if (progress === 1 && document.activeElement === button) {
        destination.focus({ preventScroll: true })
      }
      button.setAttribute('aria-hidden', String(progress === 1))
    }

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const resizeObserver = new ResizeObserver(scheduleUpdate)
    resizeObserver.observe(document.body)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    reducedMotion.addEventListener('change', scheduleUpdate)
    update()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      reducedMotion.removeEventListener('change', scheduleUpdate)
    }
  }, [])

  return (
    <div ref={origin} className="pointer-events-none fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 h-14 w-14">
      <a
        ref={bubble}
        href="https://wa.me/919995060708"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Space-D on WhatsApp (opens in a new tab)"
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-[#111] text-white shadow-[0_6px_24px_rgba(0,0,0,0.35)] hover:border-[#FDB614]/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FDB614]"
      >
        <Image src="/icons/whatsapp.png" alt="" width={28} height={28} />
      </a>
    </div>
  )
}
