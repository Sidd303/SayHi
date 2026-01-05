"use client"

import { useEffect, useRef, useState } from "react"
import { createPeerConnection } from "@/lib/webrtc-text"

export default function TextChatPage() {
  const wsRef = useRef<WebSocket | null>(null)
  const pcRef = useRef<RTCPeerConnection | null>(null)
  const dcRef = useRef<RTCDataChannel | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState("")
  const [status, setStatus] = useState("Connecting...")
  const [confirmSkip, setConfirmSkip] = useState(false)

  useEffect(() => {
    connect()
    return () => wsRef.current?.close()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const connect = () => {
    const ws = new WebSocket("wss://sayhi-1-zcci.onrender.com/")
    wsRef.current = ws

    ws.onmessage = async e => {
      const data = JSON.parse(e.data)

      if (data.type === "matched") {
        setStatus("Connected to stranger")
        setupWebRTC(data.role)
      }

      if (data.type === "offer") {
        await pcRef.current!.setRemoteDescription(data.offer)
        const answer = await pcRef.current!.createAnswer()
        await pcRef.current!.setLocalDescription(answer)
        ws.send(JSON.stringify({ type: "answer", answer }))
      }

      if (data.type === "answer") {
        await pcRef.current!.setRemoteDescription(data.answer)
      }

      if (data.type === "ice") {
        await pcRef.current!.addIceCandidate(data.candidate)
      }

      if (data.type === "leave") {
        cleanup()
        setMessages([])
        setStatus("Stranger left. Finding new one...")
      }
    }
  }

  const setupWebRTC = async (role: "caller" | "receiver") => {
    const pc = createPeerConnection()
    pcRef.current = pc

    pc.onicecandidate = e => {
      if (e.candidate) {
        wsRef.current?.send(
          JSON.stringify({ type: "ice", candidate: e.candidate })
        )
      }
    }

    if (role === "caller") {
      const dc = pc.createDataChannel("chat")
      setupDataChannel(dc)

      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)
      wsRef.current?.send(JSON.stringify({ type: "offer", offer }))
    } else {
      pc.ondatachannel = e => setupDataChannel(e.channel)
    }
  }

  const setupDataChannel = (dc: RTCDataChannel) => {
    dcRef.current = dc

    dc.onopen = () => setStatus("Text chat ready 🚀")

    dc.onmessage = e => {
      setMessages(prev => [...prev, `Stranger:${e.data}`])
    }

    dc.onclose = () => setStatus("Connection closed")
  }

  const sendMessage = () => {
    if (!input.trim()) return
    dcRef.current?.send(input)
    setMessages(prev => [...prev, `You:${input}`])
    setInput("")
  }

  const skipChat = () => {
    if (!confirmSkip) {
      setConfirmSkip(true)
      setTimeout(() => setConfirmSkip(false), 3000)
      return
    }

    wsRef.current?.send(JSON.stringify({ type: "leave" }))
    cleanup()
    setMessages([])
    setStatus("Finding a new stranger...")
    setConfirmSkip(false)
  }

  const cleanup = () => {
    dcRef.current?.close()
    pcRef.current?.close()
    dcRef.current = null
    pcRef.current = null
  }

  return (
    <main className="flex flex-col h-screen bg-gradient-to-b from-black to-zinc-900 text-white">
      {/* Header */}
      <header className="px-6 py-3 text-center text-sm border-b border-zinc-800 bg-black/70 backdrop-blur">
        <span className="text-zinc-400">{status}</span>
      </header>

      {/* Chat */}
      <section className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg, i) => {
          const isYou = msg.startsWith("You:")
          const text = msg.replace("You:", "").replace("Stranger:", "")

          return (
            <div
              key={i}
              className={`flex ${isYou ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm shadow-md
                  ${
                    isYou
                      ? "bg-blue-600 rounded-br-none"
                      : "bg-zinc-800 rounded-bl-none"
                  }`}
              >
                <div className="text-xs opacity-70 mb-1">
                  {isYou ? "You" : "Stranger"}
                </div>
                {text}
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </section>

      {/* Input */}
      <footer className="px-4 py-3 border-t border-zinc-800 bg-black/70 backdrop-blur">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-700 text-sm focus:outline-none focus:border-blue-500"
          />

          <button
            onClick={sendMessage}
            className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-sm font-medium"
          >
            Send
          </button>

          <button
            onClick={skipChat}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              confirmSkip
                ? "bg-red-600 hover:bg-red-700 animate-pulse"
                : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            {confirmSkip ? "Confirm" : "Skip"}
          </button>
        </div>
      </footer>
    </main>
  )
}
