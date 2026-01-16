"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"


gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(titleRef.current, {
        y: -120,
        scale: 0.9,
        opacity: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.to(subtitleRef.current, {
        y: -80,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="min-h-screen bg-[#8FD162] flex items-center justify-center"
    >
      <div className="text-center px-6">
        <h1
          ref={titleRef}
          className="text-[clamp(3rem,7vw,6rem)]   text-black leading-tight"
        >
          Real human <br /> insights
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 text-lg text-black/80"
        >
          One global partner
        </p>
      </div>
    </section>
  )
}
