# ChatNova AI

A modern, full-stack AI chatbot web application built with React, Node.js, Express, and MongoDB. Features real-time AI conversations, user authentication, chat history, dark mode, and a premium SaaS-style UI.

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, React Router, Axios
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT
**AI:** OpenAI API (with smart mock fallback)

## Features

- Real-time AI chat with typing indicators
- User authentication (signup, login, JWT)
- Chat history with search and multiple threads
- Dark/light mode toggle
- Voice input (Web Speech API)
- PDF chat export
- Copy and regenerate responses
- Fully responsive (mobile-first)
- Premium SaaS landing pages

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero, features, testimonials, FAQ |
| Features | `/features` | Detailed feature showcase with comparison |
| Pricing | `/pricing` | Free, Pro, and Business plans |
| Contact | `/contact` | Contact form with info |
| Login | `/login` | User sign in |
| Signup | `/signup` | User registration |
| Chat | `/chat` | AI chat dashboard (protected) |
| Profile | `/profile` | Settings and preferences (protected) |

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone and install

```bash
# Backend
cd backend
cp .env.example .env    # Edit with your values
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure environment

Edit `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/chatnova
JWT_SECRET=your-super-secret-jwt-key-change-this
OPENAI_API_KEY=sk-your-openai-api-key   # Optional - mock responses used if empty
PORT=5000
NODE_ENV=development
```

### 3. Run development servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Frontend runs on `http://localhost:3000`, backend on `http://localhost:5000`.

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Chat
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/chats` | Get all user chats |
| POST | `/api/chats` | Create new chat |
| GET | `/api/chats/:id` | Get chat by ID |
| POST | `/api/chats/:id/message` | Send message & get AI response |
| DELETE | `/api/chats/:id` | Delete chat |

### User
| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/api/users/profile` | Update profile |
| PUT | `/api/users/password` | Change password |

## Database Schema

### Users
- `name` (String, required)
- `email` (String, unique, required)
- `password` (String, hashed)
- `avatar` (String)
- `createdAt` (Date)

### Chats
- `user` (ObjectId, ref: User)
- `title` (String)
- `messages` (Array of { role, content, timestamp })
- `createdAt`, `updatedAt` (Date)

## Project Structure

```
chatnova-ai/
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # Auth and Theme providers
│   │   ├── pages/         # Page components
│   │   ├── utils/         # API client
│   │   ├── App.jsx        # Root component with routing
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── backend/
│   ├── config/            # Database config
│   ├── middleware/         # Auth and error handling
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API route handlers
│   ├── server.js          # Express app entry
│   ├── .env.example
│   └── package.json
└── README.md
```

## Deployment

### Frontend (Vercel/Netlify)

```bash
cd frontend
npm run build
# Deploy the dist/ folder
```

Set environment variable: `VITE_API_URL=https://your-backend-url.com/api`

### Backend (Railway/Render/Fly.io)

1. Push backend folder to a Git repo
2. Connect to your deployment platform
3. Set environment variables (MONGODB_URI, JWT_SECRET, etc.)
4. Deploy with `npm start`

### MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Get your connection string
3. Add it to `MONGODB_URI` in your backend env

## License

MIT
