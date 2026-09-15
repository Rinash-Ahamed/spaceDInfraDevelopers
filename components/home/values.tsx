'use client'

import { motion } from 'framer-motion'
import { whyItems } from '@/data/home'

export function Values() {

  return (

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
  )
}
