"use client"

import { useEffect, useRef, forwardRef } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function AnimeLanding() {
  const router = useRouter()
  const sections = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    // ✅ clean slate (important for StrictMode)
    sections.current = []
    ScrollTrigger.getAll().forEach(t => t.kill())

    sections.current.forEach((section) => {
      gsap.fromTo(
        section.children,
        { opacity: 0, y: 120, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 35%",
            scrub: true, // 🔥 reverses on scroll up
          },
        }
      )
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <main>

      <Section
        className="bg-episode-1"
        ref={(el) => {
          if (el) sections.current.push(el)
        }}
      >
        <h1 className="anime-title text-8xl md:text-9xl text-blue-400">
          SAYHI
        </h1>
        <p className="max-w-2xl text-zinc-200 text-xl">
          In a world where strangers never meet…
          <br /> one message can change everything.
        </p>
      </Section>

      <Section
        className="bg-episode-2"
        ref={(el) => {
          if (el) sections.current.push(el)
        }}
      >
        <h2 className="anime-title text-6xl">THE POWER</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl">
          <Panel title="⚡ Instant Match" />
          <Panel title="🕶️ Anonymous" />
          <Panel title="🌍 Global Chat" />
        </div>
      </Section>

      <Section
        className="bg-episode-3"
        ref={(el) => {
          if (el) sections.current.push(el)
        }}
      >
        <h2 className="anime-title text-6xl text-pink-400">
          THE CHARACTERS
        </h2>
        <p className="text-xl text-zinc-200 max-w-3xl">
          You are not a profile.
          <br /> You are a story unfolding.
        </p>
      </Section>

      <Section
        className="bg-episode-4"
        ref={(el) => {
          if (el) sections.current.push(el)
        }}
      >
        <h2 className="anime-title text-6xl text-red-400">
          ENTER THE ACTION
        </h2>
        <div className="flex gap-6">
          <ActionButton label="💬 TEXT MODE" onClick={() => router.push("/text")} />
          <ActionButton label="🎥 VIDEO MODE" onClick={() => router.push("/video")} />
        </div>
      </Section>

      <Section
        className="bg-final"
        ref={(el) => {
          if (el) sections.current.push(el)
        }}
      >
        <h2 className="anime-title text-7xl">
          YOUR STORY STARTS NOW
        </h2>
        <button
          onClick={() => router.push("/text")}
          className="px-14 py-6 bg-blue-600 rounded-xl text-xl hover:scale-110 transition"
        >
          SAY HI 🚀
        </button>
      </Section>

    </main>
  )
}

/* ---------------- COMPONENTS ---------------- */

const Section = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode
    className?: string
  }
>(({ children, className }, ref) => (
  <section
    ref={ref}
    className={`min-h-screen flex flex-col items-center justify-center gap-10 px-6 text-center ${className ?? ""}`}
  >
    {children}
  </section>
))

Section.displayName = "Section"

const Panel = ({ title }: { title: string }) => (
  <div className="comic-panel bg-zinc-900/80 backdrop-blur p-10 rounded-xl">
    <h3 className="anime-title text-3xl mb-4">{title}</h3>
    <p className="text-zinc-300">
      Built for instant, real-time connection.
    </p>
  </div>
)

const ActionButton = ({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    className="px-10 py-5 bg-zinc-800 border-2 border-white rounded-xl hover:bg-zinc-700 hover:scale-105 transition"
  >
    {label}
  </button>
)
