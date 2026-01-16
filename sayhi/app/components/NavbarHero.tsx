"use client"

import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function NavbarHero() {
  return (
    <div className="min-h-screen bg-[#8fd164] relative overflow-hidden">
      {/* NAVBAR */}
      <header className="w-full px-6 py-4">
        <div className="max-w-7xl mx-auto bg-white rounded-full px-6 py-3 flex items-center justify-between shadow-md">
          {/* Logo */}
          <div className="flex items-center gap-2 font-semibold text-lg">
            <span className="text-green-600">◎</span>
            MindMarket
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-700">
            <Link href="#">Services</Link>
            <Link href="#">Methodology</Link>
            <Link href="#">Industry Sectors</Link>
            <Link href="#">Network</Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-2 bg-white border border-zinc-200 px-5 py-2 rounded-full text-sm font-semibold hover:bg-zinc-100 transition">
              Get a quote
              <span className="text-lg">🤝</span>
            </button>

            {/* Mobile menu */}
            <button className="md:hidden p-2 rounded-full bg-green-100">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-28">
        <h1 className="text-[clamp(3rem,8vw,7rem)] font-bold leading-tight text-zinc-900">
          Real human <br /> insights
        </h1>

        <p className="mt-6 text-lg text-zinc-800">
          One global partner
        </p>

        {/* Illustration */}
        <div className="relative mt-16 w-full max-w-3xl">
          <Image
            src="/hero-illustration.png"
            alt="Illustration"
            width={900}
            height={600}
            priority
            className="mx-auto"
          />
        </div>
      </section>
    </div>
  )
}
