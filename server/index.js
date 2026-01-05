const http = require("http")
const WebSocket = require("ws")

const PORT = process.env.PORT || 3000

// Create HTTP server (required by Render)
const server = http.createServer((req, res) => {
  res.writeHead(200)
  res.end("WebSocket server is running")
})

// Attach WebSocket to HTTP server
const wss = new WebSocket.Server({ server })

let waiting = null
const pairs = new Map()

wss.on("connection", ws => {
  if (waiting) {
    pairs.set(ws, waiting)
    pairs.set(waiting, ws)

    ws.send(JSON.stringify({ type: "matched", role: "caller" }))
    waiting.send(JSON.stringify({ type: "matched", role: "receiver" }))

    waiting = null
  } else {
    waiting = ws
  }

  ws.on("message", msg => {
    const data = JSON.parse(msg)
    const peer = pairs.get(ws)

    if (data.type === "leave") {
      if (peer) peer.send(JSON.stringify({ type: "leave" }))
      pairs.delete(peer)
      pairs.delete(ws)
      waiting = ws
      return
    }

    if (peer) peer.send(JSON.stringify(data))
  })

  ws.on("close", () => {
    const peer = pairs.get(ws)
    if (peer) peer.send(JSON.stringify({ type: "leave" }))
    pairs.delete(ws)
  })
})

server.listen(PORT, () => {
  console.log(`✅ WebSocket server running on port ${PORT}`)
})
