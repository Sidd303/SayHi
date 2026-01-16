"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type Props = {
  title: string
  description: string
  align?: "left" | "right"
  bgColor?: string
}

export default function StorySection({
  title,
  description,
  align = "left",
  bgColor = "#8FD162",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const blobRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(blobRef.current, {
        scale: 0.8,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      })

      gsap.from(cardRef.current, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[120vh] flex items-center justify-center overflow-hidden"
    >
      {/* Organic blob */}
      <div
        ref={blobRef}
        style={{ backgroundColor: bgColor }}
        className="absolute w-[70vw] h-[70vw] rounded-full blur-0 opacity-90"
      />

      {/* Content */}
      <div
        className={`relative z-10 max-w-lg bg-white rounded-2xl p-6 shadow-xl
          ${align === "left" ? "ml-12 self-start mt-32" : "mr-12 self-end mb-32"}
        `}
        ref={cardRef}
      >
        <h3 className="text-xl font-semibold text-gray-900">
          {title}
        </h3>
        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  )
}
