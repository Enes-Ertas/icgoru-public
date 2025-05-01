# 🧠 icgoru.ai – Character Insight via AI

**icgoru.ai** is an AI-powered tool that analyzes the social media posts of any X (Twitter) user to generate psychological and behavioral insights.  
It uses GPT to extract mood fluctuations, dominant emotional tones, and personality signals based on post history — offering a reflective window into how individuals express themselves online.

> 🚧 The live version of icgoru.ai will be available soon. Follow the build-in-public journey below.

---

## 📦 What's Included in This Repo?

This repository contains the **frontend UI only**, built with:

- React (Vite)
- TailwindCSS
- Modular component-based design
- Pages: Home, Landing, History, InsightView

You’ll find:

- A clean, mobile-responsive layout
- Components like `UsernameInput`, `TraitCarousel`, `TweetFeed`, `HistoryList`
- Placeholder UI for real-time and cached analysis flows

---

## 🔒 What's NOT Included (Private for now)

To protect the originality, prompt logic, and technical architecture, the following parts remain private:

- GPT prompt structure & psychological modeling
- FastAPI analysis engine
- Node.js backend (auth, quota, email, Redis queue)
- PDF generation logic and layout
- MongoDB models, access tokens, and caching layers

---

## ⚙️ Setup (Local Preview for UI)

Clone and run the UI locally:

```bash
git clone https://github.com/enesertas/icgoru-public.git
cd icgoru-public
npm install
npm run dev
```

Ensure a .env file exists for frontend endpoint routing if needed:

VITE_API_URL=http://localhost:5000

👤 About the Developer
This project is built and maintained by @Enes\_\_Ertas —
an early-stage solo developer exploring the intersection of AI × psychology × rhythm.

Follow the project and other upcoming tools:

🐦 Twitter: @Enes\_\_Ertas

🌐 Domain reserved: https://icgoru.ai

🤝 Contributing
This repository is not currently accepting pull requests, but the journey is public.
If you're interested in collaboration, ideas, or feedback, feel free to connect via Twitter DM or open an issue for discussion.

📄 License
This codebase is shared under the MIT License.
However, the prompt structure, backend analysis system, and visual identity of icgoru.ai are not to be copied or repurposed for commercial products.
