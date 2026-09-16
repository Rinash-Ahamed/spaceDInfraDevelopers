'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const links = [
  ['home', 'Home'],
  ['about', 'About'],
  ['projects', 'Projects'],
  ['founder', 'Founder'],
  ['contact', 'Contact'],
] as const

export function Navigation() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id)
      }
    }, { rootMargin: '-15% 0px -65% 0px' })
    links.forEach(([id]) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const panel = dialog.current
    const trigger = menuButton.current
    const previousOverflow = document.body.style.overflow
    panel?.showModal()
    document.body.style.overflow = 'hidden'
    const desktop = window.matchMedia('(min-width: 1024px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      panel?.close()
      document.body.style.overflow = previousOverflow
      desktop.removeEventListener('change', closeOnDesktop)
      trigger?.focus()
    }
  }, [menuOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-6">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl border border-white/15 bg-[#090909]/85 px-4 py-3 shadow-[0_12px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-6">
          <span aria-hidden="true" className="absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-[#FDB614]/65 to-transparent" />
          <a href="#home" aria-label="Space-D Infra Developers home" className="flex shrink-0 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FDB614]">
            <Image src="/justlogo.png" alt="" width={40} height={40} priority />
            <span>
              <span className="block text-base font-medium tracking-[0.2em] text-white">SPACE-D</span>
              <span className="mt-0.5 block text-[8px] tracking-[0.2em] text-white/50">INFRA DEVELOPERS</span>
            </span>
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {links.map(([id, label]) => (
              <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}
                className={`relative rounded-full px-4 py-2.5 text-[11px] tracking-[0.1em] transition-colors focus-visible:outline-2 focus-visible:outline-[#FDB614] ${active === id ? 'bg-[#FDB614]/10 text-[#FDB614]' : 'text-white/65 hover:bg-white/5 hover:text-white'}`}>
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden items-center gap-4 rounded-full bg-[#FDB614] px-5 py-3 text-[10px] font-semibold tracking-[0.12em] text-black transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FDB614] sm:inline-flex">
              LET’S TALK
            </a>
            <button ref={menuButton} type="button" onClick={() => setMenuOpen(true)} aria-label="Open navigation menu" aria-expanded={menuOpen} aria-controls="mobile-navigation"
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-white/20 text-[#FDB614] transition-colors hover:border-[#FDB614] focus-visible:outline-2 focus-visible:outline-[#FDB614] lg:hidden">
              <span className="h-px w-5 bg-current" />
              <span className="ml-1.5 h-px w-3.5 bg-current" />
            </button>
          </div>
        </div>
      </header>

      <dialog ref={dialog} id="mobile-navigation" aria-labelledby="mobile-navigation-title" onClose={() => setMenuOpen(false)}
        className="fixed inset-0 m-auto max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-lg overflow-y-auto rounded-3xl border border-[#FDB614]/25 bg-[#0c0c0c] p-6 text-white shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-md sm:p-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <p id="mobile-navigation-title" className="text-xs tracking-[0.25em] text-[#FDB614]">EXPLORE SPACE-D</p>
          <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-2xl hover:border-[#FDB614] hover:text-[#FDB614] focus-visible:outline-2 focus-visible:outline-[#FDB614]">×</button>
        </div>
        <nav aria-label="Mobile navigation" className="py-4">
          {links.map(([id, label], index) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} aria-current={active === id ? 'location' : undefined}
              className="group flex items-center gap-5 rounded-lg px-2 py-4 transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-[#FDB614]">
              <span aria-hidden="true" className="text-[10px] tracking-widest text-[#FDB614]/60">0{index + 1}</span>
              <span className={`font-[family-name:var(--font-playfair)] text-3xl ${active === id ? 'text-[#FDB614]' : 'text-white/85 group-hover:text-[#FDB614]'}`}>{label}</span>
              <span aria-hidden="true" className="ml-auto text-xl text-[#FDB614]">↗</span>
            </a>
          ))}
        </nav>
        <a href="tel:+919995060708" className="block border-t border-white/10 pt-6 text-sm tracking-wide text-white/60 hover:text-[#FDB614]">Let’s start a conversation · +91 99950 60708</a>
      </dialog>
    </>
  )
}
