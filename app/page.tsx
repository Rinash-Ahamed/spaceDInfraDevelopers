import { Hero } from '@/components/home/hero'
import { About } from '@/components/home/about'
import { Values } from '@/components/home/values'
import { BuildFlow } from '@/components/home/build-flow'
import { Projects } from '@/components/home/projects'
import { Achievements } from '@/components/home/achievements'
import { Testimonials } from '@/components/home/testimonials'
import { Founder } from '@/components/home/founder'
import { Faq } from '@/components/home/faq'
import { Contact } from '@/components/home/contact'
import { getProjectImages } from '@/lib/projects'

export default async function Home() {
  const projects = await getProjectImages()

  return (
    <main className="bg-black text-white scroll-smooth overflow-x-hidden">
      <Hero />
      <About />
      <Values />
      <BuildFlow />
      <Projects projects={projects} />
      <Achievements />
      <Testimonials />
      <Founder />
      <Faq />
      <Contact />
    </main>
  )
}
