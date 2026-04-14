'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'
import emailjs from '@emailjs/browser'
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion"
import { getProjectImages } from './actions'

type ProjectImage = {
  id: string | number
  src: string
  title: string
  category: string
  className?: string
}

function AnimatedCounter({ target, duration = 1.5 }: { target: number, duration?: number }) {
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

function HardHatLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-16" role="status" aria-label="Loading projects">
      <motion.div
        className="relative h-16 w-24"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute left-3 top-4 h-10 w-18 rounded-t-full bg-[#FDB614]" />
        <div className="absolute left-0 bottom-3 h-4 w-24 rounded-md bg-[#FDB614]" />
        <div className="absolute left-1/2 top-2 h-12 w-2 -translate-x-1/2 rounded-full bg-black/25" />
        <div className="absolute left-7 top-5 h-8 w-1 rounded-full bg-black/20" />
        <div className="absolute right-7 top-5 h-8 w-1 rounded-full bg-black/20" />
        <div className="absolute left-2 bottom-1 h-2 w-20 rounded-full bg-[#FDB614]/25 blur-md" />
      </motion.div>
      <p className="mt-4 text-xs tracking-[0.3em] text-[#FDB614]">LOADING PROJECTS</p>
    </div>
  )
}

const whyItems = [
  { title: "Innovate", desc: "We bring fresh thinking to every plan, material choice, and construction challenge." },
  { title: "Design", desc: "We shape functional spaces with proportion, purpose, and lasting visual clarity." },
  { title: "Shape", desc: "We turn ideas into strong, meaningful spaces built for real life." },
]

const buildSteps = [
  { phase: "01", title: "Foundation", desc: "Site study, layout marking, and a strong structural base." },
  { phase: "02", title: "Structure", desc: "Measured execution with supervised civil work at every stage." },
  { phase: "03", title: "Finishing", desc: "Material coordination, details, interiors, and final refinement." },
  { phase: "04", title: "Handover", desc: "A clean closeout with clarity, quality checks, and client confidence." },
]

const reviews = [
  {
    name: "Nazrin Rasic, Palakkad",
    text: "From planning to handover, Space-D maintained complete transparency and quality. The finish of our home exceeded expectations."
  },
  {
    name: "Anitha Raj, Coimbatore",
    text: "Their design sense and site supervision are truly professional. Timely delivery and excellent workmanship."
  },
  {
    name: "Rahul Menon, Thrissur",
    text: "We were impressed by the structural quality and attention to detail. Very reliable and honest team."
  },
  {
    name: "Farzana Banu, Malappuram",
    text: "Space-D converted our vision into reality with perfect planning and budget control."
  },
  {
    name: "KarthickDas, Koduvayur",
    text: "Modern design, strong construction, and smooth coordination. Highly recommended."
  }
]

const faqs = [
  {
    question: "Do you provide a free consultation?",
    answer: "Yes. We offer an initial consultation to understand your project scope, site condition, budget, and timeline before suggesting the next steps."
  },
  {
    question: "Can Space-D handle both design and construction?",
    answer: "Yes. We work across planning, design coordination, construction, interiors, renovation, and project consultation depending on the project requirement."
  },
  {
    question: "How do you estimate the project cost?",
    answer: "We prepare estimates based on the project type, built-up area, material choices, site conditions, drawings, and the quality level you want to achieve."
  },
  {
    question: "Do you work outside Palakkad?",
    answer: "Yes. We take up selected residential and commercial projects in nearby regions based on project scope, schedule, and site feasibility."
  },
  {
    question: "How do you keep the construction process transparent?",
    answer: "We maintain clear communication on scope, material choices, budget, timelines, and execution progress so clients know what is happening at each stage."
  }
]

export default function Home() {
	
  const [form, setForm] = useState({ name: '', phone: '', type: '', message: '' })
  const [success, setSuccess] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroKey, setHeroKey] = useState(0)
  const [projects, setProjects] = useState<ProjectImage[]>([])
  const [projectsLoading, setProjectsLoading] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    getProjectImages()
      .then(setProjects)
      .finally(() => setProjectsLoading(false))
  }, [])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])
  
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const templateParams = {
      name: form.name,
      phone: form.phone,
      service: form.type,
      message: form.message,
    }

    try {
      await emailjs.send(
        'service_pv6cmir',
        'template_4798riz',
        templateParams,
        'AowSTnRMgS5_huZjn'
      )

      setSuccess(true)
      setTimeout(() => window.location.reload(), 2500)
    } catch {
      alert('Failed to send enquiry. Please try again.')
    }
  }, [form])

 const [reviewIndex, setReviewIndex] = useState(0)

	useEffect(() => {
	  const interval = setInterval(() => {
		setReviewIndex((prev) => (prev + 1) % reviews.length)
	  }, 4000)
	  return () => clearInterval(interval)
	}, [])


  return (
    <main className="bg-black text-white scroll-smooth overflow-x-hidden">
      {/* Header */}
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

		  {/* Mobile Dropdown */}
		  {menuOpen && (
			<div className="md:hidden bg-black border-t border-white/10">
			  <div className="flex flex-col text-center py-4 space-y-4">
				<a href="#home" onClick={() => setMenuOpen(false)}>HOME</a>
				<a href="#about" onClick={() => setMenuOpen(false)}>ABOUT</a>
				<a href="#projects" onClick={() => setMenuOpen(false)}>PROJECTS</a>
				<a href="#founder" onClick={() => setMenuOpen(false)}>FOUNDER</a>
				<a href="#contact" onClick={() => setMenuOpen(false)}>CONTACT US</a>
			  </div>
			</div>
		  )}
	</header>

      {/* Hero */}
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

      {/* About */}
      <section id="about" className="bg-black py-16 md:py-24">
		  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
			{/* Text */}
			<div className="max-w-5xl w-full text-center md:text-left">
			  <h2 className="text-[#FDB614] tracking-widest mb-8 text-3xl md:text-4xl font-[family-name:var(--font-playfair)]">ABOUT US</h2>
			  <p className="text-white/80 leading-relaxed">
				Our brand stands at the intersection of thoughtful design and reliable construction, dedicated to shaping exceptional spaces for both residential and commercial needs. With a deep commitment to quality, innovation, and precision, we transform ideas into structures that are built to endure and inspire. Every project reflects our belief that great design goes beyond aesthetics - it enhances the way people live, work, and connect. From elegant homes to impactful business environments, we craft spaces that balance functionality, beauty, and lasting value. Our identity represents trust, craftsmanship, and a vision for building a better tomorrow.
			  </p>
			</div>

			{/* Animated Image */}
			<div className="relative w-full h-[320px] md:h-[420px] group overflow-hidden">
			  <Image
				src="/about.jpg"
				alt="Space-D Brand Visual"
				sizes="(max-width: 768px) 100vw, 50vw"
				fill
				className="object-contain opacity-80 transition-all duration-1000 ease-out
						   group-hover:scale-105 group-hover:opacity-100"
			  />
			</div>
		  </div>
	 </section>
	 
	 {/* Core Values - Why Space D*/}
	 <section className="bg-black py-16 md:py-24">
		  <div className="max-w-7xl mx-auto px-6 text-center">
			<h2 className="text-[#FDB614] tracking-widest mb-10 text-3xl md:text-4xl font-[family-name:var(--font-playfair)]">WHY SPACE-D</h2>

			<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
			  {whyItems.map((item, i) => (
				<motion.div
				  key={i}
				  initial={{ opacity: 0, y: 40 }}
				  whileInView={{ opacity: 1, y: 0 }}
				  transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
				  viewport={{ once: true }}
				  className="relative bg-black border border-white/10 rounded-lg p-4
							 transition-transform duration-300
							 hover:-translate-y-2 hover:border-[#FDB614]/70 hover:shadow-[0_0_16px_rgba(253,182,20,0.18)]"
				>
				  <p className="relative text-white font-medium">{item.title}</p>
				  <p className="relative text-white/70 mt-1 text-sm">{item.desc}</p>
				</motion.div>
			  ))}
			</div>
		  </div>
	  </section>

	  {/* Build Flow */}
	  <section className="relative bg-black py-16 md:py-24 overflow-hidden border-y border-white/5">
		  <div className="absolute left-6 top-6 h-12 w-12 border-l border-t border-[#FDB614]/35" aria-hidden="true" />
		  <div className="absolute right-6 top-6 h-12 w-12 border-r border-t border-[#FDB614]/35" aria-hidden="true" />
		  <div className="absolute bottom-6 left-6 h-12 w-12 border-b border-l border-[#FDB614]/35" aria-hidden="true" />
		  <div className="absolute bottom-6 right-6 h-12 w-12 border-b border-r border-[#FDB614]/35" aria-hidden="true" />
		  <div
			className="absolute inset-0 opacity-[0.08]"
			style={{
			  backgroundImage:
				"linear-gradient(rgba(253,182,20,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(253,182,20,0.45) 1px, transparent 1px)",
			  backgroundSize: "44px 44px",
			}}
		  />
		  <motion.div
			className="absolute left-0 right-0 top-10 h-px opacity-70"
			style={{
			  backgroundImage: "repeating-linear-gradient(90deg, transparent 0 18px, rgba(253,182,20,0.75) 18px 34px)",
			  backgroundSize: "52px 1px",
			}}
			animate={{ backgroundPositionX: ["0px", "104px"] }}
			transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
			aria-hidden="true"
		  />
		  <motion.div
			className="absolute left-0 right-0 top-8 flex justify-between px-6 opacity-45"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 0.45 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
			viewport={{ once: true }}
			aria-hidden="true"
		  >
			{["0", "25", "50", "75", "100"].map((mark) => (
			  <span key={mark} className="text-[10px] tracking-widest text-[#FDB614]">
				{mark}
			  </span>
			))}
		  </motion.div>
		  <div className="absolute left-0 right-0 top-10 flex justify-between px-6" aria-hidden="true">
			{["0", "25", "50", "75", "100"].map((mark, i) => (
			  <motion.span
				key={mark}
				className="h-2 w-2 rounded-full bg-[#FDB614]"
				animate={{ scale: [1, 1.8, 1], opacity: [0.45, 1, 0.45] }}
				transition={{ duration: 2, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
			  />
			))}
		  </div>

		  <div className="relative max-w-7xl mx-auto px-6">
			<motion.div
			  initial={{ opacity: 0, y: 24 }}
			  whileInView={{ opacity: 1, y: 0 }}
			  transition={{ duration: 0.7, ease: "easeOut" }}
			  viewport={{ once: true }}
			  className="max-w-2xl mb-12 md:mb-16"
			>
			  <p className="text-[#FDB614] tracking-widest text-sm mb-3">BUILD FLOW</p>
			  <h2 className="text-white text-3xl md:text-5xl font-[family-name:var(--font-playfair)]">
				From Ground Marking to Handover
			  </h2>
			  <p className="text-white/60 mt-4 leading-relaxed">
				A clear construction rhythm keeps every decision, site update, and finish moving with purpose.
			  </p>
			</motion.div>

			<div className="relative">
			  <div className="hidden md:block absolute left-0 right-0 top-10 h-px bg-white/15" />
			  <motion.div
				className="hidden md:block absolute left-0 top-10 h-px bg-[#FDB614]"
				initial={{ width: 0 }}
				whileInView={{ width: "100%" }}
				transition={{ duration: 1.4, ease: "easeOut" }}
				viewport={{ once: true }}
			  />

			  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				{buildSteps.map((step, i) => (
				  <motion.div
					key={step.title}
					initial={{ opacity: 0, y: 26 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
					viewport={{ once: true }}
					className="relative pt-2 md:pt-0"
				  >
					<motion.div
					  className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-md border border-[#FDB614]/70 bg-black text-[#FDB614] tracking-widest transition-shadow duration-300 hover:shadow-[0_0_16px_rgba(253,182,20,0.18)]"
					  animate={{ scale: [1, 1.05, 1] }}
					  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
					>
					  {step.phase}
					</motion.div>
					<h3 className="text-xl md:text-2xl text-white font-[family-name:var(--font-playfair)]">
					  {step.title}
					</h3>
					<p className="text-white/65 mt-3 leading-relaxed text-sm">
					  {step.desc}
					</p>
				  </motion.div>
				))}
			  </div>
			</div>
		  </div>
		</section>
	  
	  {/* Projects */}
	  <section id="projects" className="bg-black py-16 md:py-28">
		  <div className="max-w-7xl mx-auto px-6">
			<motion.div
			  initial={{ opacity: 0, y: 20 }}
			  whileInView={{ opacity: 1, y: 0 }}
			  transition={{ duration: 0.8, ease: "easeOut" }}
			  viewport={{ once: true }}
			  className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
			>
			  <div>
				<h2 className="text-[#FDB614] tracking-widest mb-3 text-sm font-medium">PORTFOLIO</h2>
				<h3 className="text-3xl md:text-5xl text-white font-[family-name:var(--font-playfair)]">
				  Featured Projects
				</h3>
			  </div>
			  <p className="text-white/60 max-w-md text-sm md:text-base leading-relaxed">
				A curated selection of our finest architectural and interior achievements, 
				blending aesthetic elegance with structural integrity.
			  </p>
			</motion.div>

			{projectsLoading ? (
			  <HardHatLoader />
			) : projects.length === 0 ? (
			  <p className="text-center text-white/60">
				Project images will appear here soon.
			  </p>
			) : (
			  <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] md:auto-rows-[350px] gap-4 md:gap-6">
				{projects.map((project, i) => (
				<motion.div
				  key={project.id}
				  initial={{ opacity: 0, y: 30 }}
				  whileInView={{ opacity: 1, y: 0 }}
				  transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
				  viewport={{ once: true, margin: "-50px" }}
				  className={`relative overflow-hidden rounded-xl group cursor-pointer ${project.className}`}
				>
				  <Image
					src={project.src}
					alt={project.title}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					fill
					className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
				  />

				  {/* Premium Gradient Overlay */}
				  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

				  {/* Hover Text Content */}
				  <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
					<p className="text-[#FDB614] text-xs font-semibold tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
					  {project.category}
					</p>
					<h4 className="text-white text-xl md:text-3xl font-[family-name:var(--font-playfair)] leading-tight">
					  {project.title}
					</h4>
				  </div>
				</motion.div>
				))}
			  </div>
			)}
		  </div>
		</section>
		
	 {/* Counters */}
	 <section className="relative bg-black py-16 md:py-24 border-y border-white/5 overflow-hidden">
	  <div className="absolute inset-x-0 bottom-0 flex h-28 items-end justify-center gap-2 px-6 opacity-20" aria-hidden="true">
		{[44, 72, 52, 92, 64, 84, 48, 78, 58, 96, 68, 88].map((height, i) => (
		  <motion.span
			key={`${height}-${i}`}
			className="w-3 rounded-t-sm bg-[#FDB614]"
			initial={{ height: 0 }}
			whileInView={{ height }}
			transition={{ duration: 0.7, delay: i * 0.06, ease: "easeOut" }}
			viewport={{ once: true }}
		  />
		))}
	  </div>

	  <div className="relative max-w-7xl mx-auto px-6 text-center">
		<h2 className="text-[#FDB614] tracking-widest mb-10 text-3xl md:text-4xl font-[family-name:var(--font-playfair)]">
		  OUR ACHIEVEMENTS
		</h2>

		<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
		  <div>
			<p className="text-4xl md:text-6xl text-white font-light"><AnimatedCounter target={48} />+</p>
			<p className="text-xs tracking-widest text-[#FDB614]">PROJECTS COMPLETED</p>
		  </div>

		  <div>
			<p className="text-4xl md:text-6xl text-white font-light"><AnimatedCounter target={8} /></p>
			<p className="text-xs tracking-widest text-[#FDB614]">ONGOING</p>
		  </div>

		  <div>
			<p className="text-4xl md:text-6xl text-white font-light"><AnimatedCounter target={7} />+</p>
			<p className="text-xs tracking-widest text-[#FDB614]">YEARS EXPERIENCE</p>
		  </div>

		  <div>
			<p className="text-4xl md:text-6xl text-white font-light"><AnimatedCounter target={87} />+</p>
			<p className="text-xs tracking-widest text-[#FDB614]">HAPPY CLIENTS</p>
		  </div>
		</div>
	  </div>
	</section>
	
	<section className="bg-black py-16 md:py-24 overflow-hidden">
	  <div className="max-w-4xl mx-auto px-6 text-center">
		<h2 className="text-[#FDB614] tracking-widest mb-10 text-3xl md:text-4xl font-[family-name:var(--font-playfair)]">
		  WHAT OUR CLIENTS SAY
		</h2>

		<div className="relative h-40 flex items-center justify-center">
		  <motion.div
			key={reviewIndex}
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -30 }}
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
		
	  {/* Founder */}
	  <section id="founder" className="min-h-screen flex items-center justify-center bg-black py-16 md:py-24">
	  <div className="max-w-7xl mx-auto px-6">
		<motion.div
		  className="grid md:grid-cols-2 gap-12 items-center"
		  initial={{ opacity: 0, y: 80 }}
		  whileInView={{ opacity: 1, y: 0 }}
		  transition={{ duration: 0.9, ease: "easeOut" }}
		  viewport={{ once: true }}
		>
		  {/* Founder Image */}
		  <div className="flex justify-center">
			<div className="relative w-[260px] h-[320px] md:w-[480px] md:h-[400px] rounded-xl overflow-hidden shadow-2xl group">
			  <Image
				src="/founder.png"
				alt="Founder - Space-D Infra Developers"
				sizes="(max-width: 768px) 100vw, 50vw"
				fill
				className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
			  />
			</div>
		  </div>

		  {/* Founder Content */}
		  <div className="max-w-5xl w-full text-center md:text-left">
			<h2 className="text-[#FDB614] tracking-widest mb-2 text-3xl md:text-4xl font-[family-name:var(--font-playfair)]">FOUNDER</h2>
			<h3 className="text-2xl md:text-3xl tracking-wide mb-1 font-[family-name:var(--font-playfair)]">
			  Haris Rahman
		    </h3>
			<p className="text-white/70 mb-4">
			 Founder & Managing Director
		    </p>

			<p className="text-white/80 leading-relaxed">
			  Born and based in Kerala, the founder of Space-D Infra Developers carries a deep passion for civil engineering and the art of building meaningful spaces. Driven by a vision to achieve global construction standards, he pursued advanced studies at a reputed university in London, gaining international exposure to modern design, planning, and execution practices.
			</p>

			<p className="text-white/80 leading-relaxed mt-4">
			  With a strong belief that quality construction transforms lives, his journey blends global knowledge with local understanding. This fusion of international education and on-ground experience in Kerala forms the foundation of Space-D Infra Developers - a company built on precision, integrity, and long-term value creation.
			</p>
			</div>
				</motion.div>
			</div>
		</section>
	  

      {/* FAQ */}
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
			  <h2 className="text-white text-3xl md:text-5xl font-[family-name:var(--font-playfair)]">
				Frequently Asked Questions
			  </h2>
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

      {/* Contact */}
      <section id="contact" className="relative min-h-screen flex items-center justify-center bg-black px-6 py-16 md:py-24 overflow-hidden">
		  <div
			className="absolute inset-0 opacity-[0.06]"
			style={{
			  backgroundImage:
				"linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)",
			  backgroundSize: "56px 56px",
			}}
		  />
		  <div className="absolute left-6 top-10 h-14 w-14 border-l border-t border-[#FDB614]/30" aria-hidden="true" />
		  <div className="absolute right-6 bottom-10 h-14 w-14 border-b border-r border-[#FDB614]/30" aria-hidden="true" />
		  <div className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FDB614]/40 to-transparent" aria-hidden="true" />
		  <motion.div
			className="absolute left-1/2 top-1/2 hidden h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(253,182,20,0.14),transparent_62%)] md:block"
			animate={{ scale: [0.9, 1.08, 0.9], opacity: [0.45, 0.75, 0.45] }}
			transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
			aria-hidden="true"
		  />
		  <svg
			className="absolute inset-0 hidden h-full w-full md:block"
			viewBox="0 0 1200 800"
			preserveAspectRatio="none"
			aria-hidden="true"
		  >
			<circle cx="120" cy="620" r="16" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
			<circle cx="120" cy="620" r="4" fill="rgba(255,255,255,0.55)" />
			<text x="146" y="626" fill="rgba(255,255,255,0.5)" fontSize="13" letterSpacing="4">
			  CUSTOMER
			</text>
			<motion.circle
			  cx="1080"
			  cy="210"
			  r="20"
			  fill="none"
			  stroke="rgba(253,182,20,0.45)"
			  strokeWidth="1"
			  animate={{ r: [20, 34, 20], opacity: [0.45, 0.12, 0.45] }}
			  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
			/>
			<circle cx="1080" cy="210" r="6" fill="#FDB614" />
			<text x="940" y="216" fill="rgba(253,182,20,0.75)" fontSize="13" letterSpacing="4">
			  SPACE-D
			</text>
			<motion.path
			  d="M120 620 C360 470 360 250 590 360 S900 520 1080 210"
			  fill="none"
			  stroke="rgba(253,182,20,0.26)"
			  strokeWidth="1"
			  strokeDasharray="8 16"
			  animate={{ strokeDashoffset: [0, -96] }}
			  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
			/>
			<motion.circle
			  r="6"
			  fill="#FDB614"
			  filter="url(#contactGlow)"
			  initial={{ offsetDistance: "0%" }}
			  animate={{ offsetDistance: ["0%", "100%"] }}
			  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
			  style={{
				offsetPath: "path('M120 620 C360 470 360 250 590 360 S900 520 1080 210')",
			  }}
			/>
			<defs>
			  <filter id="contactGlow" x="-80%" y="-80%" width="260%" height="260%">
				<feGaussianBlur stdDeviation="6" result="blur" />
				<feMerge>
				  <feMergeNode in="blur" />
				  <feMergeNode in="SourceGraphic" />
				</feMerge>
			  </filter>
			</defs>
		  </svg>
		  <div className="relative max-w-xl w-full">
			
			<h2 className="text-[#FDB614] tracking-widest text-center mb-8 text-3xl md:text-4xl font-[family-name:var(--font-playfair)]">CONTACT US</h2>
			
			<div className="mb-8 text-center">
			  <p className="text-white/80 text-sm md:text-base">
				We promise a transparent process, quality workmanship, and on-time delivery.
			  </p>
			  <p className="text-white/80 mt-2 tracking-wide text-sm">
				Free site visit & consultation. We&apos;ll get back to you within 24 hours.
			  </p>
			</div>

			{success ? (
			  <div className="text-center text-green-400 animate-pulse">
				<h3 className="text-xl tracking-widest">THANK YOU</h3>
				<p className="mt-2">Your enquiry has been sent successfully.</p>
			  </div>
			) : (
			  <form className="space-y-6" onSubmit={handleSubmit}>
				<input
				  name="name"
				  onChange={handleChange}
				  placeholder="Full Name"
				  className="w-full bg-black border border-white/10 px-4 py-3 rounded-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FDB614]/50 focus:scale-[1.02] focus:border-[#FDB614] outline-none"
				  required
				/>

				<input
				  name="phone"
				  onChange={handleChange}
				  placeholder="Phone Number"
				  className="w-full bg-black border border-white/10 px-4 py-3 rounded-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FDB614]/50 focus:scale-[1.02] focus:border-[#FDB614] outline-none"
				  required
				/>

				<div className="relative">
				  <select
					name="type"
					onChange={handleChange}
					className="w-full bg-black border border-white/10 px-4 py-3 rounded-md
							   appearance-none cursor-pointer
							   transition-all duration-300 text-white/70
							   hover:scale-[1.02] hover:border-[#FDB614]/50
							   focus:scale-[1.02] focus:border-[#FDB614] outline-none"
					required
				  >
					<option value="">Select Service</option>
					<option>Residential Construction</option>
					<option>Commercial Projects</option>
					<option>Interior Design</option>
					<option>Renovation & Remodeling</option>
					<option>Project Consultation</option>
				  </select>

				  {/* Custom arrow */}
				  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#FDB614] text-sm">
					v
				  </span>
				</div>

				<textarea
				  name="message"
				  onChange={handleChange}
				  rows={4}
				  placeholder="Project details"
				  className="w-full bg-black border border-white/10 px-4 py-3 rounded-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FDB614]/50 focus:scale-[1.02] focus:border-[#FDB614] outline-none"
				/>

				<button
				  type="submit"
				  className="w-full bg-[#FDB614] text-black font-medium py-3 rounded-md tracking-widest transition-all duration-300 hover:bg-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:-translate-y-1"
				>
				  SEND ENQUIRY
				</button>
			  </form>
			)}

			{/* Office Info Section */}
			<div className="mt-16 border-t border-white/10 pt-10 text-center space-y-4">
			  <h3 className="text-[#FDB614] tracking-widest text-sm">OUR OFFICE</h3>

			  <p className="text-white/70 text-sm">
				ADDRESS:<br />
				5/1957, Kuzhalmannam Koduvayur Rd, Koduvayur, Kerala 678501
			  </p>

			  <p className="text-white/70 text-sm">
				EMAIL: info.spacedinfra@gmail.com
			  </p>

			  <p className="text-white/70 text-sm">
				PHONE: +91 9995060708
			  </p>

			  <div className="mt-6 w-full h-56 rounded-lg overflow-hidden border border-white/20">
				<iframe
				  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.6020255621133!2d76.65518627504062!3d10.68796698945547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba813a3efec0675%3A0x919176c7727e0942!2sSpace-D%20Infra%20Developers!5e0!3m2!1sen!2sin!4v1768231379816!5m2!1sen!2sin"
				  width="100%"
				  height="100%"
				  style={{ border: 0 }}
				  loading="lazy"
				  referrerPolicy="no-referrer-when-downgrade"
				></iframe>
			  </div>
			  
			  {/* Social Media */}
				<div className="mt-8 flex justify-center gap-6">
				  <a href="https://www.instagram.com/space_d_infra_developers/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FDB614] transition-colors">
					<Image src="/icons/instagram.png" alt="Instagram" width={24} height={24} className="w-6 h-6" />
				  </a>
				  <a href="https://facebook.com/share/1CnyrXX1GK/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FDB614] transition-colors">
					<Image src="/icons/facebook.png" alt="Facebook" width={24} height={24} className="w-6 h-6" />
				  </a>
				  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FDB614] transition-colors">
					<Image src="/icons/twitter.png" alt="Twitter" width={24} height={24} className="w-6 h-6" />
				  </a>
				  <a href="https://wa.me/919995060708?text=Hi%20Space-D%20Infra%20Developers,%20I%20would%20like%20to%20enquire%20about%20construction%20services."
					 target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FDB614] transition-colors">
					<Image src="/icons/whatsapp.png" alt="WhatsApp" width={24} height={24} className="w-6 h-6" />
				  </a>
				</div>
			</div>
		  </div>
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
    </main>
  )
}
