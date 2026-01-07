"use client"

import { useEffect, useRef, useState } from "react"

export default function VideoChatPage() {
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  const wsRef = useRef<WebSocket | null>(null)
  const pcRef = useRef<RTCPeerConnection | null>(null)
  const localStreamRef = useRef<MediaStream | null>(null)

  const [status, setStatus] = useState("Connecting...")
  const [confirmSkip, setConfirmSkip] = useState(false)

  useEffect(() => {
    connect()
    return () => fullCleanup()
  }, [])

  /* ---------------- WS ---------------- */

  const connect = () => {
    const ws = new WebSocket("wss://sayhi-1-zcci.onrender.com")
    wsRef.current = ws

    ws.onmessage = async e => {
      const data = JSON.parse(e.data)

      if (data.type === "waiting") {
        setStatus("Waiting for stranger...")
      }

      if (data.type === "matched") {
        setStatus("Connected 🎥")
        await setupWebRTC(data.role)
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
        fullCleanup()
        setStatus("Stranger left. Finding new one...")
      }
    }
  }

  /* ---------------- WEBRTC ---------------- */

  const setupWebRTC = async (role: "caller" | "receiver") => {
    // 🔴 SAFETY: stop old stream first
    stopCamera()

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })

    localStreamRef.current = stream
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream
    }

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    })
    pcRef.current = pc

    stream.getTracks().forEach(track => pc.addTrack(track, stream))

    pc.ontrack = e => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = e.streams[0]
      }
    }

    pc.onicecandidate = e => {
      if (e.candidate) {
        wsRef.current?.send(
          JSON.stringify({ type: "ice", candidate: e.candidate })
        )
      }
    }

    if (role === "caller") {
      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)
      wsRef.current?.send(JSON.stringify({ type: "offer", offer }))
    }
  }

  /* ---------------- CONTROLS ---------------- */

  const skipChat = () => {
    if (!confirmSkip) {
      setConfirmSkip(true)
      setTimeout(() => setConfirmSkip(false), 3000)
      return
    }

    wsRef.current?.send(JSON.stringify({ type: "leave" }))
    fullCleanup()
    setStatus("Finding new stranger...")
    setConfirmSkip(false)
  }

  /* ---------------- CLEANUP ---------------- */

  const stopCamera = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(t => t.stop())
      localStreamRef.current = null
    }

    if (localVideoRef.current) localVideoRef.current.srcObject = null
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null
  }

  const fullCleanup = () => {
    stopCamera()

    pcRef.current?.close()
    pcRef.current = null

    wsRef.current?.close()
    wsRef.current = null
  }

  /* ---------------- UI ---------------- */

  return (
    <main className="h-screen bg-black text-white flex flex-col">
      <header className="text-center py-3 border-b border-zinc-800">
        {status}
      </header>

      <section className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full bg-zinc-900 rounded-lg"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full bg-zinc-900 rounded-lg"
        />
      </section>

      <footer className="p-4 flex justify-center border-t border-zinc-800">
        <button
          onClick={skipChat}
          className={`px-6 py-2 rounded-full font-semibold ${
            confirmSkip
              ? "bg-red-600 animate-pulse"
              : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          {confirmSkip ? "Confirm Skip" : "Skip"}
        </button>
      </footer>
    </main>
  )
}
