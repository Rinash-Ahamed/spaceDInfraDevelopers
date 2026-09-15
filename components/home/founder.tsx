'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Founder() {

  return (

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
  )
}
