"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { X } from "lucide-react"

type Props = {
  open: boolean
  onClose: () => void
}

export default function QuoteModal({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  /* ================= OPEN / CLOSE ANIMATION ================= */
  useEffect(() => {
    if (!overlayRef.current || !modalRef.current) return

    if (open) {
      gsap.set(overlayRef.current, { display: "flex" })

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      )

      gsap.fromTo(
        modalRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.6, ease: "power4.out" }
      )
    } else {
      gsap.to(modalRef.current, {
        y: "100%",
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      })

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        delay: 0.15,
        onComplete: () => {
          gsap.set(overlayRef.current, { display: "none" })
        },
      })
    }
  }, [open])

  /* ================= ESC CLOSE ================= */
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onEsc)
    return () => window.removeEventListener("keydown", onEsc)
  }, [onClose])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] hidden items-end justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* ================= MODAL ================= */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-t-3xl bg-[#F7F3E7] p-8 shadow-2xl md:rounded-3xl md:mb-10"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full bg-yellow-400 p-2"
        >
          <X size={18} />
        </button>

        {/* Content */}
        <h2 className="text-4xl font-bold text-gray-900">
          Let’s Start A <br /> Conversation
        </h2>

        <p className="mt-4 text-gray-600">
          Want to talk sooner? Book an instant 15-minute call.
        </p>

        {/* Example form (short version) */}
        <form className="mt-8 grid gap-4">
          <input
            className="w-full rounded-lg border px-4 py-3"
            placeholder="Full Name"
          />
          <input
            className="w-full rounded-lg border px-4 py-3"
            placeholder="Email"
          />
          <button className="mt-4 rounded-xl bg-green-500 py-3 font-medium text-black">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
