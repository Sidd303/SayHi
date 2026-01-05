const WebSocket = require("ws")
const wss = new WebSocket.Server({ port: 3001 })

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

  // 🔴 Handle skip / leave
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

console.log("✅ Signaling server running on ws://localhost:3001")
