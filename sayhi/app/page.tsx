"use client"

import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black text-white px-6">
      {/* Logo */}
      <h1 className="text-5xl font-bold mb-4">
        👋 Say<span className="text-blue-500">Hi</span>
      </h1>

      {/* Tagline */}
      <p className="text-zinc-400 text-center max-w-md mb-12">
        Say hi to someone new.  
        Random text & video chat with strangers.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-sm">
        {/* Text Chat */}
        <button
          onClick={() => router.push("/text")}
          className="w-full px-6 py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-all font-semibold text-lg border border-zinc-700"
        >
          💬 Text Chat
        </button>

        {/* Video Chat */}
        <button
          onClick={() => router.push("/chat")}
          className="w-full px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all font-semibold text-lg shadow-lg"
        >
          🎥 Video Chat
        </button>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-sm text-zinc-500">
        © {new Date().getFullYear()} SayHi · Chat with strangers
      </footer>
    </main>
  )
}
