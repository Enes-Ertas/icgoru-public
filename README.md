# 🧠 icgoru.ai – Character Insight via AI

**icgoru.ai** is an AI-powered analysis tool that generates psychological and behavioral insights by analyzing a user's social media posts on X (formerly Twitter).

Built as a solo project, icgoru.ai bridges language, rhythm, and emotional patterns to create a mirror of how individuals express themselves digitally — through personality traits, mood variations, and symbolic patterns extracted by GPT.

> 🚧 The live version is coming soon. Follow the build-in-public progress on [@Enes__Ertas](https://twitter.com/Enes__Ertas).

---

## ✨ What’s in This Repo?

This repo contains the **frontend code only**.

Tech stack:

- ⚛️ React (Vite)
- 🎨 TailwindCSS
- 🔍 i18n (multi-language support)
- 📱 Mobile-responsive UI
- 🧩 Modular components: `UsernameInput`, `TraitChart`, `TraitCarousel`, `TweetFeed`, `HistoryList`, etc.

Available pages:

- `/` → Landing Page
- `/analysis/:id` → Analysis Viewer
- `/sharedAnalysis/:id` → OG Meta-compatible share page
- `/history` → Previous results for logged-in users

---

## 🔒 What's Private?

To protect prompt integrity and backend architecture, these components are not public:

- 🔐 GPT prompt structure & psychological modeling
- 🧠 FastAPI engine (OpenAI-powered)
- 🗂 MongoDB models & caching layer
- 📥 PDF generation logic (PDFKit)
- 🧾 Node.js backend (OAuth, quota tracking, Redis queue)
- 📸 Puppeteer-based OG image generation
- 🔒 Full .env config & access tokens

---

## 🛠 Setup (Local Preview – Frontend Only)

```bash
git clone https://github.com/enesertas/icgoru-public.git
cd icgoru-public
npm install
npm run dev


Ensure you have a .env.local or .env file:

env
Kopyala
Düzenle
VITE_API_URL=http://localhost:5000
VITE_FRONTEND_URL=http://localhost:5173
VITE_SUPABASE_URL=https://your.supabase.co/storage/v1/object/public/og-images

frontend/
├── components/         # Reusable UI pieces
├── pages/              # Route-linked views
├── utils/              # Helper configs (API URLs, i18n)
├── assets/             # Icons & static content
└── App.jsx             # Main app entry

👤 About the Developer
Hi, I'm @Enes__Ertas
I'm a solo indie developer exploring the intersection of:

🤖 AI + LLMs

🧠 Psychology & behavior modeling

🎼 Rhythm as cognition

This project started from curiosity, and became a self-reflection framework powered by GPT and design.

🧩 Contributing
This project is not accepting external PRs yet.
However, you're welcome to fork, explore, and give feedback via issues or DMs on Twitter.

📄 License
MIT License – You are free to use and learn from the code in this repo.
But the GPT prompt structure, backend pipeline, and brand visuals of icgoru.ai are NOT to be copied or used commercially.

📍 Live Link Coming Soon
🌐 icgoru.ai

📡 Follow the build-in-public updates on Twitter
