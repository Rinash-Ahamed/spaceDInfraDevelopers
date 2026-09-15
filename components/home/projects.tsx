'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { ProjectImage } from '@/lib/projects'

export function Projects({ projects }: { projects: ProjectImage[] }) {

  return (

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

			{projects.length === 0 ? (
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
  )
}
