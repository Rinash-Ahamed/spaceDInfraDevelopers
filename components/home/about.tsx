import Image from 'next/image'

export function About() {

  return (

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
  )
}
