"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type Props = {
  eyebrow?: string
  title: string
  description: string
  align?: "left" | "right"
  bg?: string
}

export default function TextStorySection({
  eyebrow,
  title,
  description,
  align = "left",
  bg = "bg-[#F7F3E7]",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`${bg} min-h-[120vh] flex items-center`}
    >
      <div
        ref={contentRef}
        className={`mx-auto max-w-2xl px-6
          ${align === "left" ? "text-left" : "text-right"}
        `}
      >
        {eyebrow && (
          <span className="block text-xs uppercase tracking-widest text-gray-500">
            {eyebrow}
          </span>
        )}

        <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
          {title}
        </h2>

        <p className="mt-6 text-lg text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  )
}
