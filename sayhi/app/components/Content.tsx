"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import QuoteModal from "./QuoteModal"

gsap.registerPlugin(ScrollTrigger)

export default function Content() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { y: 120 },
      {
        y: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      }
    )
  }, [])

    const [openQuote, setOpenQuote] = useState(false)

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F6F2E6] rounded-t-[48px] -mt-40 pt-40 pb-32 px-6"
    >
      <div className="max-w-5xl mx-auto grid gap-12">
        <p className="text-xl text-black leading-relaxed max-w-2xl">
          We deliver global qualitative market research through real people who
          understand local cultures. We connect you with voices that matter—
          wherever they are—to help you make smarter decisions.
        </p>

        <div className="flex gap-6">
          <button 
          onClick={() => setOpenQuote(true)}
          className="group flex items-center gap-3 rounded-xl bg-white px-6 py-3 text-black shadow transition hover:scale-105">
            Get a quote
            <span className="h-8 w-8 rounded-full bg-[#8FD162] flex items-center justify-center transition group-hover:translate-x-1">
              →
            </span>
          </button>
             {/* MODAL */}
      <QuoteModal
        open={openQuote}
        onClose={() => setOpenQuote(false)}
      />
        </div>
      </div>
    </section>
  )
}
