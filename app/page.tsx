'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { motion, useInView } from "framer-motion"

export default function Home() {
	
  const [form, setForm] = useState({ name: '', phone: '', type: '', message: '' })
  const [success, setSuccess] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  
  const canvaStory = [
	  { img: "/story/1.png", title: "VISION", desc: "We shape ideas into realities." },
	  { img: "/story/2.png", title: "DESIGN", desc: "Where aesthetics meet function." },
	  { img: "/story/3.png", title: "PLANNING", desc: "Precision in every detail." },
	  { img: "/story/4.png", title: "CONSTRUCTION", desc: "Crafted by experts, built to last." },
	  { img: "/story/5.png", title: "DELIVERY", desc: "On time. On budget. With trust." },
  ]
  
  const [current, setCurrent] = useState(0)

  const images = [
	  '/projects/1.jpg',
	  '/projects/2.jpg',
	  '/projects/3.jpg',
	  '/projects/4.jpg',
  ]
  
  const slide = (direction) => {
	  setCurrent((prev) =>
		direction === 1
		  ? (prev + 1) % images.length
		  : (prev - 1 + images.length) % images.length
	  )
  }
  
  useEffect(() => {
	  const interval = setInterval(() => slide(1), 4000) // auto scroll every 4 sec
	  return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const templateParams = {
      name: form.name,
      phone: form.phone,
      service: form.type,
      message: form.message,
    }

    try {
      await emailjs.send(
        'serviceID',
        'templateID',
        templateParams,
        '-publicKey'
      )

      setSuccess(true)
      setTimeout(() => window.location.reload(), 2500)
    } catch (error) {
      alert('Failed to send enquiry. Please try again.')
    }
  }
  

 const RiseSection = ({ children, className = "" }) => {
	  const ref = useRef(null)

	  useEffect(() => {
		const observer = new IntersectionObserver(
		  ([entry]) => {
			if (entry.isIntersecting) {
			  entry.target.classList.add("in-view")
			  observer.unobserve(entry.target) // run only once, no blinking ever
			}
		  },
		  { threshold: 0.25 }
		)

		if (ref.current) observer.observe(ref.current)
		return () => observer.disconnect()
	  }, [])

	  return (
		<section ref={ref} className={`rise-section ${className}`}>
		  {children}
		</section>
	  )
 }

  return (
    <main className="bg-black text-white scroll-smooth overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/95 backdrop-blur z-50 border-b border-white/10">
		  <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
			{/* Logo */}
			<div>
			  <Image src="/justlogo.png" alt="Space-D" width={40} height={40} priority />
			</div>

			{/* Desktop Menu */}
			<nav className="hidden md:flex gap-8 text-xs tracking-[0.2em]">
			  <a href="#home">HOME</a>
			  <a href="#about">ABOUT</a>
			  <a href="#projects">PROJECTS</a>
			  <a href="#founder">FOUNDER</a>
			  <a href="#contact">CONTACT</a>
			</nav>

			{/* Mobile Hamburger */}
			<button
			  className="md:hidden text-white text-xl"
			  onClick={() => setMenuOpen(!menuOpen)}
			>
			  ☰
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
      <section id="home" className="relative h-[70vh] md:h-screen pt-20 flex items-center justify-center overflow-hidden">
        <Image src="/banner.jpg" alt="Space-D Banner" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center px-4 max-w-full translate-y-38 md:translate-y-40">
			<p className="mt-3 text-[#FDB614] tracking-[0.3em] text-xs md:text-sm">SPACE-D INFRA DEVELOPERS</p>
            <h1 className="text-3xl md:text-xl tracking-wider">INNOVATE · DESIGN · SHAPE</h1>
		    <p className="mt-4 text-white/80 text-sm md:text-base tracking-wide max-w-2xl mx-auto">
				"Building spaces that stand the test of time, not just today’s trends."</p>
        </div>
      </section>
	  
	  {/* Canva */}
	  <section className="bg-black py-20">
		  <div className="max-w-7xl mx-auto px-6">
			<h2 className="text-[#FDB614] tracking-widest mb-10 text-center">
			  OUR PROCESS
			</h2>

			<motion.div
			  className="grid grid-cols-2 md:grid-cols-5 gap-6"
			  initial={{ opacity: 0, y: 80 }}
			  whileInView={{ opacity: 1, y: 0 }}
			  transition={{ duration: 0.9, ease: "easeOut" }}
			  viewport={{ once: true }}
			>
			  {canvaStory.map((item, i) => (
				  <div
					key={i}
					className={`group relative rounded-xl overflow-hidden
								transform transition-all duration-300
								hover:-translate-y-3 hover:shadow-2xl
								${i === 4 ? "hidden md:block" : ""}`}   // hide 5th on mobile
				  >
					<Image
					  src={item.img}
					  alt={item.title}
					  width={400}
					  height={300}
					  className="w-full h-[220px] object-cover"
					/>

					<div
					  className="absolute inset-x-0 bottom-0 bg-black/80
						 translate-y-0 md:translate-y-full md:group-hover:translate-y-0
						 transition-transform duration-300
						 p-4"
					>
					  <h3 className="tracking-widest text-sm text-[#FDB614]">
						{item.title}
					  </h3>
					  <p className="text-xs mt-1 text-white">
						{item.desc}
					  </p>
					</div>
				  </div>
				))}
			</motion.div>
		  </div>
		</section>

      {/* About */}
      <section id="about" className="bg-black py-6 md:py-16">
		  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
			{/* Text */}
			<div className="max-w-5xl w-full text-center">
			  <h2 className="text-[#FDB614] tracking-widest mb-8">ABOUT US</h2>
			  <p className="text-white/80 leading-relaxed">
				Our brand stands at the intersection of thoughtful design and reliable construction, dedicated to shaping exceptional spaces for both residential and commercial needs. With a deep commitment to quality, innovation, and precision, we transform ideas into structures that are built to endure and inspire. Every project reflects our belief that great design goes beyond aesthetics—it enhances the way people live, work, and connect. From elegant homes to impactful business environments, we craft spaces that balance functionality, beauty, and lasting value. Our identity represents trust, craftsmanship, and a vision for building a better tomorrow.
			  </p>
			</div>

			{/* Animated Image */}
			<div className="relative w-full h-[320px] md:h-[420px] group overflow-hidden">
			  <Image
				src="/about-visual.png"
				alt="Space-D Brand Visual"
				fill
				className="object-contain opacity-80 transition-all duration-1000 ease-out
						   group-hover:scale-105 group-hover:opacity-100"
			  />
			</div>
		  </div>
	 </section>
	 
	 {/* Core Values */}
	 <section className="bg-black py-8 md:py-16">
		  <div className="max-w-7xl mx-auto px-6 text-center">
			<h2 className="text-[#FDB614] tracking-widest mb-6">WHY SPACE-D</h2>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm md:text-base">
			  <div>
				<p className="text-white font-medium">On-Time Delivery</p>
				<p className="text-white/70 mt-1">We respect your time and commitments.</p>
			  </div>

			  <div>
				<p className="text-white font-medium">Transparent Costing</p>
				<p className="text-white/70 mt-1">No hidden charges, no surprises.</p>
			  </div>

			  <div>
				<p className="text-white font-medium">Quality Materials</p>
				<p className="text-white/70 mt-1">Built to last, not just to look good.</p>
			  </div>

			  <div>
				<p className="text-white font-medium">Professional Supervision</p>
				<p className="text-white/70 mt-1">Every stage monitored by experts.</p>
			  </div>
			</div>
		  </div>
		</section>
	  
	  {/* Projects */}
	  <section id="projects" className="items-center bg-black py-8 md:py-16">
		  <div className="max-w-5xl w-full text-center">
			<h2 className="text-[#FDB614] tracking-widest mb-8">OUR PROJECTS</h2>

			<div className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-xl bg-black flex items-center justify-center">
			  <div className="absolute top-4 left-4 z-20 opacity-80">
				<Image src="/justlogo.png" alt="Space-D Logo" width={50} height={50} />
			  </div>
								
			  <div
				className="flex transition-transform duration-700 ease-in-out"
				style={{ transform: `translateX(-${current * 100}%)` }}
			  >
				{images.map((src, i) => (
				  <Image
					key={i}
					src={src}
					alt={`Project ${i + 1}`}
					width={1600}
					height={1000}
					className="min-w-full object-contain bg-black"
				  />
				))}
			  </div>

			  <button
				onClick={() => slide(-1)}
				className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-full"
			  >
				‹
			  </button>

			  <button
				onClick={() => slide(1)}
				className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-full"
			  >
				›
			  </button>
			</div>
		  </div>
		</section>
		
	  {/* Founder */}
	  <section id="founder" className="min-h-screen flex items-center justify-center bg-black py-8 md:py-10">
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
			<div className="relative w-[260px] h-[320px] md:w-[320px] md:h-[400px] rounded-xl overflow-hidden shadow-2xl group">
			  <Image
				src="/dr.png"
				alt="Founder - Space-D Infra Developers"
				fill
				className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
			  />
			</div>
		  </div>

		  {/* Founder Content */}
		  <div className="max-w-5xl w-full text-center">
			<h2 className="text-[#FDB614] tracking-widest mb-4">FOUNDER INFO</h2>
			<h3 className="text-2xl md:text-3xl tracking-wide mb-4">
			  Founder & Managing Director
			</h3>

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
	  

      {/* Contact */}
      <section id="contact" className="min-h-screen flex items-center justify-center bg-black px-6 py-10">
		  <div className="max-w-xl w-full">
			
			<h2 className="text-[#FDB614] tracking-widest text-center mb-8">CONTACT US</h2>
			
			<div className="mb-8 text-center">
			  <p className="text-white/80 text-sm md:text-base">
				We promise a transparent process, quality workmanship, and on-time delivery.
			  </p>
			  <p className="text-white/80 mt-2 tracking-wide text-sm">
				Free site visit & consultation. We’ll get back to you within 24 hours.
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
				  className="w-full bg-black border border-white/30 px-4 py-3 rounded-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FDB614] focus:scale-[1.02] focus:border-[#FDB614] outline-none"
				  required
				/>

				<input
				  name="phone"
				  onChange={handleChange}
				  placeholder="Phone Number"
				  className="w-full bg-black border border-white/30 px-4 py-3 rounded-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FDB614] focus:scale-[1.02] focus:border-[#FDB614] outline-none"
				  required
				/>

				<div className="relative">
				  <select
					name="type"
					onChange={handleChange}
					className="w-full bg-black border border-white/30 px-4 py-3 rounded-md
							   appearance-none cursor-pointer
							   transition-all duration-300
							   hover:scale-[1.02] hover:border-[#FDB614]
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
					▼
				  </span>
				</div>

				<textarea
				  name="message"
				  onChange={handleChange}
				  rows={4}
				  placeholder="Project details"
				  className="w-full bg-black border border-white/30 px-4 py-3 rounded-md transition-all duration-300 hover:scale-[1.02] hover:border-[#FDB614] focus:scale-[1.02] focus:border-[#FDB614] outline-none"
				/>

				<button
				  type="submit"
				  className="w-full bg-[#FDB614] text-black py-3 rounded-md tracking-widest transition-all duration-300 hover:bg-green-500 hover:scale-105"
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
				  <a href="https://instagram.com/yourpage" target="_blank" className="text-white hover:text-[#FDB614] transition-colors">
					<img src="/icons/instagram.png" className="w-6 h-6" />
				  </a>
				  <a href="https://facebook.com/yourpage" target="_blank" className="text-white hover:text-[#FDB614] transition-colors">
					<img src="/icons/facebook.png" className="w-6 h-6" />
				  </a>
				  <a href="https://twitter.com/yourpage" target="_blank" className="text-white hover:text-[#FDB614] transition-colors">
					<img src="/icons/twitter.png" className="w-6 h-6" />
				  </a>
				  <a href="https://whatsapp.com/yourpage" target="_blank" className="text-white hover:text-[#FDB614] transition-colors">
					<img src="/icons/whatsapp.png" className="w-6 h-6" />
				  </a>
				</div>
			</div>
		  </div>
		</section>
    </main>
  )
}
