<div align="center">

<img src="https://capsule-render.vercel.app/api?type=venom&color=0:0d0d0d,40:1a0533,80:0d1b2e,100:001a3d&height=200&section=header&text=ChatNova%20AI&fontSize=60&fontColor=00D9FF&animation=fadeIn&fontAlignY=40&desc=Full-Stack%20AI%20Chatbot%20Platform&descAlignY=65&descSize=20&descColor=a0aec0" width="100%"/>

[![Stars](https://img.shields.io/github/stars/aasimansari1/chatnova-ai?style=for-the-badge&color=00D9FF&labelColor=0d0d0d)](https://github.com/aasimansari1/chatnova-ai/stargazers)
[![Forks](https://img.shields.io/github/forks/aasimansari1/chatnova-ai?style=for-the-badge&color=7C3AED&labelColor=0d0d0d)](https://github.com/aasimansari1/chatnova-ai/network/members)
[![Issues](https://img.shields.io/github/issues/aasimansari1/chatnova-ai?style=for-the-badge&color=00FF88&labelColor=0d0d0d)](https://github.com/aasimansari1/chatnova-ai/issues)
[![License](https://img.shields.io/github/license/aasimansari1/chatnova-ai?style=for-the-badge&color=FF6B6B&labelColor=0d0d0d)](LICENSE)

</div>

---

## ⚡ Overview

**ChatNova AI** is a production-ready, full-stack AI chatbot platform featuring real-time conversations, multi-thread chat history, voice input, and a premium SaaS-grade UI. Built with the MERN stack and OpenAI API.

---

## 🚀 Live Features

| Feature | Status |
|:---|:---:|
| Real-time AI chat with typing indicators | ✅ |
| JWT Authentication (Login / Signup) | ✅ |
| Multi-thread chat history + search | ✅ |
| Dark / Light mode toggle | ✅ |
| Voice input (Web Speech API) | ✅ |
| PDF export of conversations | ✅ |
| Copy & regenerate responses | ✅ |
| Mobile-first responsive design | ✅ |
| Premium SaaS landing pages | ✅ |

---

## 🛠️ Tech Stack

<div align="center">

[![Tech](https://skillicons.dev/icons?i=react,nodejs,express,mongodb,tailwind,vite&theme=dark)](https://skillicons.dev)

</div>

| Layer | Technologies |
|:---|:---|
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion, React Router |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, JWT |
| **AI** | OpenAI API (GPT-3.5/4) with smart mock fallback |

---

## 📁 Project Structure

```
chatnova-ai/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route pages (Home, Chat, Auth...)
│   │   ├── hooks/           # Custom React hooks
│   │   └── utils/           # Helpers & API calls
│   └── package.json
├── backend/
│   ├── routes/              # API route handlers
│   ├── models/              # Mongoose schemas
│   ├── middleware/          # JWT auth, error handling
│   ├── controllers/         # Business logic
│   └── server.js
└── README.md
```

---

## ⚙️ Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/aasimansari1/chatnova-ai.git
cd chatnova-ai

# 2. Backend setup
cd backend
cp .env.example .env       # Add OPENAI_API_KEY, MONGO_URI, JWT_SECRET
npm install
npm start

# 3. Frontend setup (new terminal)
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** to view the app.

---

## 🌐 Pages

| Route | Page |
|:---|:---|
| `/` | Landing page — hero, features, testimonials |
| `/features` | Detailed feature showcase |
| `/pricing` | Free, Pro, Business plans |
| `/chat` | AI chat dashboard (protected) |
| `/profile` | User settings (protected) |

---

## 🤝 Contributing

PRs welcome! Fork → branch → PR. Check [issues](https://github.com/aasimansari1/chatnova-ai/issues) for open tasks.

---

<div align="center">

**Built by [Mohd Aasim Ansari](https://github.com/aasimansari1) — Star ⭐ if you find it useful!**

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d0d0d,50:1a0533,100:0d1b2e&height=80&section=footer" width="100%"/>

</div>
