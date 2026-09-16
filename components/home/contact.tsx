'use client'

import { SectionHeading } from './section-heading'

import { motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { sendEnquiry } from '@/lib/enquiries'

export function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', type: '', message: '' })
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (submitting) return
    setSubmitting(true)

    const templateParams = {
      name: form.name,
      phone: form.phone,
      service: form.type,
      message: form.message,
    }

    try {
      await sendEnquiry(templateParams)

      setSuccess(true)
    } catch {
      alert('Failed to send enquiry. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }, [form, submitting])
  return (
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

        <SectionHeading className="text-[#FDB614] tracking-widest text-center mb-8 text-3xl md:text-4xl font-[family-name:var(--font-playfair)]">CONTACT US</SectionHeading>

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
              disabled={submitting}
              className="w-full bg-[#FDB614] text-black font-medium py-3 rounded-md tracking-widest transition-all duration-300 hover:bg-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:-translate-y-1"
            >
              {submitting ? 'SENDING...' : 'SEND ENQUIRY'}
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
              title="Space-D office location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.6020255621133!2d76.65518627504062!3d10.68796698945547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba813a3efec0675%3A0x919176c7727e0942!2sSpace-D%20Infra%20Developers!5e0!3m2!1sen!2sin!4v1768231379816!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
