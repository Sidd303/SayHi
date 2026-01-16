"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Phone,
} from "lucide-react"
import QuoteModal from "./QuoteModal"

 

const desktopLinks = [
  "Services",
  "Methodology",
  "Industry Sectors",
  "Network",
]

const mobileLinks = [
  "Services",
  "Methodology",
  "Industry Sectors",
  "Our Network",
  "About Us",
  "Insights",
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)

  /* ================= ESC KEY CLOSE ================= */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside)
    return () =>
      document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  const [openQuote, setOpenQuote] = useState(false)

  return (
    <header className="fixed top-6 left-0 z-50 w-full px-4">
      <div className="mx-auto max-w-6xl">

        {/* ================= TOP BAR ================= */}
        <div className="flex items-center gap-4">

          {/* MAIN NAV */}
          <div className="flex flex-1 items-center justify-between bg-white rounded-xl px-6 py-3 shadow-lg">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg text-gray-900"
            >
              <span className="h-3 w-3 rounded-full bg-green-600" />
              MindMarket
            </Link>

            {/* Desktop Links */}
            <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-800">
              {desktopLinks.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-1 cursor-pointer hover:text-black transition-colors"
                >
                  {item}
                  {(item === "Methodology" ||
                    item === "Industry Sectors") && (
                    <ChevronDown size={14} />
                  )}
                </li>
              ))}
            </ul>

            {/* Menu Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-green-400 text-black transition hover:scale-105"
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Desktop CTA */}
          <button
             onClick={() => setOpenQuote(true)}

            className="hidden md:flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-gray-900 shadow-lg transition hover:shadow-xl"
          >
            Get a quote
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white">
              <ArrowRight size={14} />
            </span>
          </button>
           <QuoteModal
        open={openQuote}
        onClose={() => setOpenQuote(false)}
      />
        </div>

        {/* ================= MENU PANEL ================= */}
        <div
          ref={panelRef}
          className={`mt-4 overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 ease-out
            ${open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-4"}
          `}
        >

          {/* MOBILE HEADER */}
          <div className="md:hidden flex items-center justify-between px-5 py-4 border-b">
            <span className="font-bold text-gray-900">MindMarket</span>
            <Link
              href="/contact"
              className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-900"
            >
              Get a quote
            </Link>
          </div>

          {/* MOBILE LINKS */}
          <div className="md:hidden divide-y">
            {mobileLinks.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between px-5 py-4 text-lg font-medium text-gray-900 cursor-pointer transition hover:bg-gray-50"
              >
                {item}
                {(item === "Methodology" ||
                  item === "Industry Sectors") && (
                  <ChevronDown size={18} />
                )}
              </div>
            ))}
          </div>

          {/* MOBILE CONTACT */}
          <div className="md:hidden px-5 py-4">
            <div className="flex items-center justify-between rounded-xl border p-4 transition hover:bg-gray-50">
              <span className="font-medium text-gray-900">Contact</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
                <Phone size={18} />
              </span>
            </div>
          </div>

          {/* DESKTOP MEGA PANEL */}
          <div className="hidden md:grid grid-cols-3 gap-6 p-6">
            {["About Us", "Insights", "Contact"].map((title) => (
              <div
                key={title}
                className="group relative h-56 rounded-xl bg-gray-200 overflow-hidden cursor-pointer transition hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
                <span className="absolute bottom-4 left-4 flex items-center gap-2 font-semibold text-gray-900">
                  {title}
                  <ArrowRight size={16} />
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </header>
  )
}
