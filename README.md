# ✨ LifeTwin AI

<div align="center">

### Your Personal Decision Intelligence Workspace

**Explore possibilities. Understand trade-offs. Turn intentions into action.**

An AI-powered decision-support prototype for exploring choices, reflecting on personal priorities, considering alternative scenarios, and organizing meaningful next steps.

[🚀 **Open Live Dashboard**](https://lifetwin-ai-five.vercel.app) · [💻 **Source Code**](https://github.com/snehassneha4578-collab/lifetwin-ai) · [🐛 **Report an Issue**](https://github.com/snehassneha4578-collab/lifetwin-ai/issues)

</div>

---

## 🌌 About LifeTwin AI

LifeTwin AI explores how artificial intelligence can support better decision-making without taking control away from people.

The application brings together personal reflection, structured decision exploration, future-scenario thinking, AI-assisted conversation, and action planning in one workspace.

The goal is to help users understand their options, examine assumptions, consider trade-offs, and identify practical next steps.

> **Core principle:** AI supports the thinking process. Humans remain responsible for decisions.

## 🎨 Project Experience

<div align="center">

<img src="public/images/lifetwin-ai/hero-background.png" alt="LifeTwin AI hero background" width="90%"/>

*The visual introduction to LifeTwin AI and its decision-intelligence vision.*

</div>

## 🧠 Decision Lab

<div align="center">

<img src="public/images/lifetwin-ai/decision-lab.png" alt="Decision Lab visual" width="80%"/>

</div>

Decision Lab focuses on breaking complex decisions into understandable parts.

- Explore available options.
- Compare potential advantages and disadvantages.
- Identify relevant considerations and uncertainties.
- Reflect on trade-offs before choosing a direction.

**Purpose:** Help users approach difficult choices more systematically.

## 🪞 My Life Twin

<div align="center">

<img src="public/images/lifetwin-ai/my-life-twin.png" alt="My Life Twin visual" width="80%"/>

</div>

My Life Twin represents a personalized reflection experience centered on goals, preferences, priorities, and individual context.

- Reflect on personal aspirations.
- Organize goals and priorities.
- Consider whether options align with longer-term intentions.
- Encourage more deliberate choices.

**Purpose:** Connect decision exploration with what matters to the individual.

## 🔮 Future Scenarios

<div align="center">

<img src="public/images/lifetwin-ai/future-scenarios.png" alt="Future Scenarios visual" width="80%"/>

</div>

Future Scenarios explores hypothetical paths and possible consequences.

- Consider alternative situations.
- Examine the assumptions behind potential outcomes.
- Identify uncertainty and possible trade-offs.
- Compare different paths without presenting them as guaranteed predictions.

**Purpose:** Encourage forward thinking while acknowledging uncertainty.

## ✅ Action Tracker

<div align="center">

<img src="public/images/lifetwin-ai/action-tracker.png" alt="Action Tracker visual" width="80%"/>

</div>

Action Tracker focuses on turning decisions and intentions into practical next steps.

- Organize intended actions.
- Break goals into manageable tasks.
- Review progress toward objectives.
- Connect reflection with follow-through.

**Purpose:** Help bridge the gap between deciding and doing.

## ✨ AI Intelligence Core

<div align="center">

<img src="public/images/lifetwin-ai/ai-intelligence-core.png" alt="AI intelligence core concept" width="80%"/>

</div>

The AI intelligence concept represents the use of AI to assist with contextual reasoning, explanations, and conversational exploration.

LifeTwin AI integrates the Google Gemini API for AI-assisted responses. Actual availability depends on API configuration, quota, model availability, and service conditions.

**Purpose:** Make AI a useful decision-support component rather than a replacement for human judgment.

## 🌱 Personal Growth

<div align="center">

<img src="public/images/lifetwin-ai/personal-growth.png" alt="Personal growth concept" width="80%"/>

</div>

Personal growth connects reflection with continuous improvement.

- Clarify goals and intentions.
- Review priorities.
- Reflect on choices and experiences.
- Identify opportunities for improvement.

**Purpose:** Encourage thoughtful, goal-oriented personal development.

## ⚖️ Risks & Trade-offs

<div align="center">

<img src="public/images/lifetwin-ai/risks-tradeoffs.png" alt="Risks and trade-offs concept" width="80%"/>

</div>

Good decisions require examining more than the potential benefits.

- Consider disadvantages and opportunity costs.
- Identify assumptions that may be incorrect.
- Recognize uncertainty and competing priorities.
- Evaluate consequences before taking action.

**Purpose:** Promote balanced evaluation rather than one-sided recommendations.

## 🛡️ Trust & Transparency

<div align="center">

<img src="public/images/lifetwin-ai/trust-transparency.png" alt="Trust and transparency concept" width="80%"/>

</div>

Responsible AI requires users to understand the limitations of generated content.

- AI responses may be incomplete or incorrect.
- Hypothetical scenarios are not predictions.
- Important claims should be independently verified.
- Users retain control over their choices.

**Purpose:** Encourage informed, critical, and responsible use of AI.

## ⚙️ AI Architecture

<div align="center">

<img src="public/images/lifetwin-ai/ai-architecture.png" alt="LifeTwin AI architecture concept" width="80%"/>

</div>

At a high level, the application connects the user interface with a server-side API and an external AI service.

```text
User Interaction
       ↓
Next.js Application
       ↓
Server-side Chat API
       ↓
Google Gemini API
       ↓
AI Response
       ↓
User Interface
```

The API key should remain on the server and must never be committed to the public repository.

*This diagram illustrates the high-level integration concept, not a complete production architecture specification.*

## 🚀 Project Presentation

### Pitch Deck Cover

<div align="center">

<img src="public/images/lifetwin-ai/pitch-deck-cover.png" alt="LifeTwin AI pitch deck cover" width="80%"/>

*Introducing the project, its vision, and the decision-support problem it explores.*

</div>

### Pitch Deck Closing

<div align="center">

<img src="public/images/lifetwin-ai/pitch-deck-closing.png" alt="LifeTwin AI pitch deck closing" width="80%"/>

*Concluding the project story with its central vision: thoughtful decisions supported by AI.*

</div>

## 💬 AI Decision Companion

The AI Decision Companion provides a conversational way to explore questions, clarify thinking, and consider alternative perspectives.

Possible uses include:

- Comparing alternatives.
- Exploring assumptions and uncertainties.
- Identifying potential risks.
- Organizing ideas into next steps.
- Requesting a different perspective on a decision.

The quality and availability of responses depend on the connected Gemini service. AI-generated content should always be evaluated critically.

## 🧰 Technology Stack

| Technology | Role |
|---|---|
| Next.js | Application framework and server-side routes |
| React | Component-based user interface |
| TypeScript | Type-safe development |
| Google Gemini API | AI-assisted conversational responses |
| Recharts | Data visualization |
| Lucide React | Interface icons |
| Zod | Schema validation |

## 🚀 Run Locally

### Prerequisites

- Node.js
- npm
- A Google Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/snehassneha4578-collab/lifetwin-ai.git
cd lifetwin-ai
npm ci
```

### 2. Configure the environment

Create `.env.local` in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Replace the placeholder with your own key.

**Security:** Never commit `.env.local` or expose your API key in client-side code, screenshots, or public issues.

### 3. Start the development server

```bash
npm run dev
```

Open http://localhost:3000.

### Useful commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application |
| `npm run start` | Start the production server |
| `npm run lint` | Run linting if configured |

## 🧪 Reliability and Testing

The public dashboard being accessible does not guarantee that every feature or AI request will succeed.

Important testing areas include:

- Successful chat responses.
- Temporary AI service unavailability.
- API quota and configuration errors.
- Invalid or empty messages.
- Network interruptions and retry behavior.
- Correct handling of AI-generated content.

Gemini may temporarily return availability errors during periods of high demand. The AI workflow should be tested under both normal and failure conditions.

## 🛡️ Responsible Use and Limitations

LifeTwin AI is an experimental decision-support prototype.

- AI responses can be inaccurate, incomplete, or outdated.
- Scenarios represent possibilities, not guaranteed outcomes.
- Suggestions may not account for every personal circumstance.
- Verify important claims using reliable sources.
- Do not use generated content as the sole basis for high-stakes decisions.
- The application is not a substitute for qualified professional advice.

Visual concepts and illustrations communicate the project vision; they do not independently establish that every depicted capability is fully implemented.

## 🤝 Contributing and Feedback

Ideas, bug reports, and constructive feedback are welcome.

**Repository:**  
https://github.com/snehassneha4578-collab/lifetwin-ai

**Issues:**  
https://github.com/snehassneha4578-collab/lifetwin-ai/issues

When reporting a problem, describe the steps to reproduce it and the expected and actual results. Never include secrets or API keys.

## 📄 License

No license has been selected yet. All rights are reserved by default until a license is added. Check the repository for licensing updates before reusing or redistributing this project.

---

<div align="center">

### 💚 Think Clearly. Explore Thoughtfully. Act Intentionally.

**[🚀 Open LifeTwin AI](https://lifetwin-ai-five.vercel.app)**

**[💻 Explore the Source Code](https://github.com/snehassneha4578-collab/lifetwin-ai)**

*AI to support better thinking. Humans in control.*

</div>
