# SayHi 💬🎥  
**Meet. Talk. Connect — anonymously.**

SayHi is an **anonymous real-time text & video chat application** that lets users
connect with **random strangers** from anywhere in the world and make new friends —
no accounts, no profiles, no identity.

The goal of SayHi is simple:  
👉 *help people meet, talk freely, and build human connections without barriers.*

---

## 🌍 Live Infrastructure

- **Signaling Server (Render)**  
  https://sayhi-1-zcci.onrender.com

  WebSocket endpoint:
```

wss://sayhi-1-zcci.onrender.com

```

---

## ✨ Key Features

- 🔀 Random anonymous matchmaking
- 💬 Peer-to-peer **text chat** (WebRTC DataChannel)
- 🎥 Peer-to-peer **video chat** (WebRTC MediaStream)
- 🔁 Skip / leave current stranger
- 🚀 Fast connection with minimal latency
- 🌐 Cloud-hosted signaling server
- 🧠 Clean and simple UX

---

## 🧱 Project Structure (Monorepo)

```

SayHi/
├── server/              # WebSocket signaling server
│   ├── index.js
│   └── package.json
│
├── sayhi-next/          # Next.js frontend (App Router)
│   ├── app/
│   ├── lib/
│   ├── components/
│   └── tailwind.config.js
│
└── README.md

````

---

## 🛠 Tech Stack

### Frontend (sayhi-next)
- **Next.js (App Router)**
- **React + TypeScript**
- **Tailwind CSS**
- **WebRTC**
  - RTCDataChannel (text)
  - MediaStream (video)

### Backend (server)
- **Node.js**
- **WebSocket (`ws`)**
- Custom matchmaking logic
- Deployed on **Render**

---

## ⚙️ How It Works (High Level)

1. User opens SayHi
2. Frontend connects to WebSocket signaling server
3. Server pairs two waiting users
4. WebRTC offer / answer exchange via WebSocket
5. Direct peer-to-peer connection is established
6. Messages and video stream flow directly between users
7. User can **skip** and instantly match with someone new

---

## ▶️ Run Locally

### 1️⃣ Start the Signaling Server
```bash
cd server
npm install
npm start
````

Server runs at:

```
ws://localhost:3000
```

---

### 2️⃣ Start the Frontend

```bash
cd sayhi
npm install
npm run dev
```

Open:

```
http://localhost:3000
```

---

## ☁️ Deployment

### Backend

* Hosted on **Render**
* Uses WebSocket over HTTPS (`wss`)
* Automatically handles port binding

### Frontend

* Deployed on: **Vercel**

---

## 🤝 Contributing

Contributions are **very welcome** 🙌

You can help by:

* Improving UI/UX
* Adding moderation & safety features
* Enhancing matchmaking logic
* Optimizing WebRTC performance
* Writing tests & documentation

### Steps:

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## 🧭 Roadmap

* 🔊 Voice chat
* 🌎 Region-based matching
* 🛡️ Abuse & spam protection
* 🔐 Optional authentication
* 📱 Mobile-friendly UI
* ⚡ Multi-server scaling (Redis)

---

## ❤️ Vision

SayHi is built to remind people that:

> *Sometimes the best conversations are with strangers.*

No pressure.
No identity.
Just human connection.

---

## 📜 License

MIT License
Feel free to use, modify, and build on top of SayHi.

