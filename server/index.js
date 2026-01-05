const http = require("http")
const WebSocket = require("ws")

// 🔴 REQUIRED FOR RENDER
const PORT = process.env.PORT || 3000

// HTTP server (Render requirement)
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" })
  res.end("✅ SayHi signaling server running")
})

// WebSocket server attached to HTTP server
const wss = new WebSocket.Server({ server })

let waiting = null
const pairs = new Map()

wss.on("connection", ws => {
  console.log("🔌 Client connected")

  if (waiting && waiting.readyState === WebSocket.OPEN) {
    pairs.set(ws, waiting)
    pairs.set(waiting, ws)

    ws.send(JSON.stringify({ type: "matched", role: "caller" }))
    waiting.send(JSON.stringify({ type: "matched", role: "receiver" }))

    waiting = null
  } else {
    waiting = ws
    ws.send(JSON.stringify({ type: "waiting" }))
  }

  ws.on("message", msg => {
    let data
    try {
      data = JSON.parse(msg.toString())
    } catch {
      return
    }

    const peer = pairs.get(ws)

    // 🔴 Handle skip / leave
    if (data.type === "leave") {
      if (peer && peer.readyState === WebSocket.OPEN) {
        peer.send(JSON.stringify({ type: "leave" }))
      }
      pairs.delete(peer)
      pairs.delete(ws)
      waiting = ws
      return
    }

    if (peer && peer.readyState === WebSocket.OPEN) {
      peer.send(JSON.stringify(data))
    }
  })

  ws.on("close", () => {
    console.log("❌ Client disconnected")

    const peer = pairs.get(ws)
    if (peer && peer.readyState === WebSocket.OPEN) {
      peer.send(JSON.stringify({ type: "leave" }))
    }

    pairs.delete(peer)
    pairs.delete(ws)

    if (waiting === ws) waiting = null
  })
})

// 🔴 Render listens here
server.listen(PORT, () => {
  console.log(`✅ Signaling server running on port ${PORT}`)
})
