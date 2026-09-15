'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroKey, setHeroKey] = useState(0)
  return (
<>
<header className="fixed top-0 w-full bg-black/95 backdrop-blur z-50 border-b border-white/30">
		  <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
			{/* Logo */}
			<Link href="/" className="flex items-center gap-2">
			  <motion.div
				className="flex items-center gap-2"
				initial={{ x: 40, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 0.7, ease: "easeOut" }}	>
				<Image src="/justlogo.png" alt="Space-D" width={40} height={40} priority />
			  </motion.div>
			</Link>

			{/* Desktop Menu */}
			<nav className="hidden md:flex gap-8 text-xs tracking-[0.2em]">
			  <a
				  href="#home"
				  onClick={() => setHeroKey(prev => prev + 1)}
				  className="hover:text-[#FDB614] transition-colors">HOME
			  </a>
			  <a href="#about" className="hover:text-[#FDB614] transition-colors">ABOUT</a>
			  <a href="#projects" className="hover:text-[#FDB614] transition-colors">PROJECTS</a>
			  <a href="#founder" className="hover:text-[#FDB614] transition-colors">FOUNDER</a>
			  <a href="#contact" className="hover:text-[#FDB614] transition-colors">CONTACT</a>
			</nav>

			{/* Mobile Hamburger */}
			<button
			  onClick={() => setMenuOpen(true)}
			  className="md:hidden text-white"
			  aria-label="Open menu"
			>
			  <div className="space-y-1.5">
				<span className="block w-6 h-0.5 bg-white"></span>
				<span className="block w-6 h-0.5 bg-white"></span>
				<span className="block w-6 h-0.5 bg-white"></span>
			  </div>
			</button>
		  </div>

		  </header>

      <section
		  id="home"
		  className="relative h-[70vh] md:h-screen pt-20 overflow-hidden"
		>
		  <div
			className="absolute inset-0"
			style={{ clipPath: "inset(0 0 0 0 round 40px)" }}
		  >
			<video
			  src="/intro.mp4"
			  autoPlay
			  muted
			  loop
			  playsInline
			  preload="auto"
			  className="w-full h-full object-cover"
			/>
		  </div>

		  {/* Cinematic gradient */}
		  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black" />
		  <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />

		  <motion.div
			key={heroKey}
			initial={{ opacity: 0, y: 28 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.9, ease: "easeOut" }}
			className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end items-start pb-20 md:pb-28"
		  >
			<p className="text-[#FDB614] text-[10px] md:text-xs tracking-[0.35em] mb-3">
			  SPACE-D INFRA DEVELOPERS
			</p>
			<h1 className="max-w-2xl text-3xl md:text-6xl text-white leading-tight font-[family-name:var(--font-playfair)]">
			  Designing Spaces. Building Trust.
			</h1>
			<p className="max-w-lg mt-4 text-white/65 leading-relaxed text-sm md:text-base">
			  Thoughtful design, reliable construction, and transparent execution for homes and commercial spaces built to last.
			</p>
			<div className="mt-8 flex flex-col sm:flex-row gap-3">
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
			className="absolute bottom-0 left-0 w-full"
			viewBox="0 0 1440 90"
			preserveAspectRatio="none"
		  >
			<path
			  d="M0,0 C240,80 480,80 720,60 960,40 1200,20 1440,30 L1440,90 L0,90 Z"
			  fill="black"
			/>
		  </svg>
		</section>
<AnimatePresence>
		  {menuOpen && (
			<motion.div
			  className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center space-y-8"
			  initial={{ opacity: 0, scale: 1.05 }}
			  animate={{ opacity: 1, scale: 1 }}
			  exit={{ opacity: 0, scale: 1.05 }}
			  transition={{ duration: 0.35, ease: "easeOut" }}
			>
			  {/* Close Button */}
			  <button
				onClick={() => setMenuOpen(false)}
				className="absolute top-6 right-6 text-white text-3xl"
				aria-label="Close menu"
			  >
				x
			  </button>

			  {/* Logo */}
			  <Image src="/justlogo.png" alt="Space-D" width={60} height={60} />

			  {/* Nav Links */}
			  {["HOME", "ABOUT", "PROJECTS", "FOUNDER", "CONTACT"].map((item) => (
				<a
				  key={item}
				  href={`#${item.toLowerCase()}`}
				  onClick={() => setMenuOpen(false)}
				  className="text-white text-xl tracking-widest hover:text-[#FDB614] transition"
				>
				  {item}
				</a>
			  ))}
			</motion.div>
		  )}
		</AnimatePresence>
</>
  )
}
