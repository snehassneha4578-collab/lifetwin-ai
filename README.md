<div align="center">

# ✨ LifeTwin AI

### Explore possibilities. Make informed choices.

A decision-intelligence workspace for exploring choices, considering possible outcomes, and tracking meaningful next steps.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-111111?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-087ea4?style=for-the-badge&logo=react)](https://react.dev/)
[![Gemini AI](https://img.shields.io/badge/AI-Gemini-8e75ff?style=for-the-badge)](https://ai.google.dev/)

**🌐 Live dashboard:** Not deployed yet  
**💻 Local demo:** `http://localhost:3000`

</div>

---

## 🧭 Explore LifeTwin AI

| Workspace | What it helps you do |
|---|---|
| 🧠 Decision Lab | Organize a decision and explore the questions that matter. |
| 🪞 My Life Twin | Reflect on personal context and preferences. |
| 🔮 Future Scenarios | Consider possible outcomes and underlying assumptions. |
| ✅ Action Tracker | Track milestones and progress toward a chosen outcome. |
| 💬 Decision Companion | Clarify your thinking through the chat interface. |

> **Human in control:** LifeTwin AI supports your thinking; you remain responsible for your decisions.

## 🎨 Highlights

- 🌈 A colorful decision-intelligence workspace.
- 🧭 Navigation across decisions, scenarios, and action tracking.
- 💬 Chat interface with local responses and a Gemini API integration.
- 📊 Illustrative visualizations for organizing information.
- ✅ Milestone tracking for turning intentions into next steps.
- 🛡️ Clear prototype boundaries: charts are illustrative, not forecasts.

## ⚙️ Technology

- **Framework:** Next.js App Router
- **UI:** React and TypeScript
- **AI integration:** Google Gemini via `@google/genai`
- **Charts:** Recharts
- **Icons:** Lucide React
- **Validation:** Zod

## 🚀 Run locally

### Requirements

Install Node.js and npm. A Gemini API key is needed for AI-powered chat.

### Installation

Clone the repository, install dependencies, and enter the project directory:

    git clone https://github.com/snehassneha4578-collab/lifetwin-ai.git
    cd lifetwin-ai
    npm ci

Create `.env.local` in the project root with your own API key:

    GEMINI_API_KEY=your_gemini_api_key

**Never commit your real API key or `.env.local`.**

Start the development server:

    npm run dev

Open [http://localhost:3000](http://localhost:3000).

### Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint |

## 🏗️ Project structure

    lifetwin-ai/
    ├── public/                 # Static assets
    ├── src/
    │   └── app/
    │       ├── api/chat/       # Chat API
    │       ├── components/     # Dashboard UI
    │       ├── globals.css     # Global styles
    │       ├── layout.tsx      # Root layout
    │       └── page.tsx        # App entry page
    ├── .gitignore
    ├── package.json
    └── README.md

## 🔐 Responsible use

- AI responses may be inaccurate; verify important information.
- Scenarios and visualizations are illustrative, not guaranteed predictions.
- Do not use this prototype as a substitute for qualified professional advice.
- Keep credentials and private configuration out of version control.

## 🗺️ Roadmap

- [ ] Deploy the dashboard and add its verified public URL.
- [ ] Add 12 genuine project images with captions in a feature gallery.
- [ ] Verify the Gemini chat workflow end to end.
- [ ] Expand tests and document known limitations.

## 🤝 Contributing

Issues and constructive suggestions are welcome. Include expected behavior and reproduction steps when reporting a problem.

## 📄 License

No license has been selected. All rights are reserved by default until a license is added.

---

<div align="center">

**LifeTwin AI** · Think clearly. Explore thoughtfully. Act intentionally.

</div>
