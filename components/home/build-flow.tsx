'use client'

import { motion } from 'framer-motion'
import { buildSteps } from '@/data/home'

export function BuildFlow() {

  return (

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
  )
}
