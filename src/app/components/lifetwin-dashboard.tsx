"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer,
  Tooltip, XAxis, YAxis
} from "recharts";
import {
  Activity, ArrowRight, BrainCircuit, Check, CheckCircle2, ChevronDown,
  CircleHelp, Clock3, Compass, GitCompareArrows, Lightbulb, MessageCircle,
  Plus, RefreshCw, Send, ShieldCheck, Sparkles, Target, TrendingUp,
  Wallet, Zap
} from "lucide-react";

type Scenario = {
  name: string;
  subtitle: string;
  risk: string;
  effort: string;
  flexibility: string;
  color: string;
  steps: string[];
};

const scenarios: Scenario[] = [
  {
    name: "Accelerated growth",
    subtitle: "Invest more effort upfront and move quickly.",
    risk: "Elevated",
    effort: "High",
    flexibility: "Lower",
    color: "#a78bfa",
    steps: ["Define an ambitious weekly milestone", "Reserve time for focused practice", "Review results every two weeks"]
  },
  {
    name: "Balanced progress",
    subtitle: "Build momentum while preserving flexibility.",
    risk: "Moderate",
    effort: "Medium",
    flexibility: "Balanced",
    color: "#67e8f9",
    steps: ["Set a realistic weekly milestone", "Keep a buffer for unexpected costs", "Reassess after the first month"]
  },
  {
    name: "Lower-risk path",
    subtitle: "Move gradually and retain more options.",
    risk: "Lower",
    effort: "Lowâ€“medium",
    flexibility: "Higher",
    color: "#f0abfc",
    steps: ["Choose one manageable first step", "Review time and resource limits", "Expand only after a progress review"]
  }
];

const initialTasks = [
  { id: 1, text: "Define the outcome you want", done: true },
  { id: 2, text: "Choose your first weekly milestone", done: false },
  { id: 3, text: "Review assumptions and constraints", done: false },
  { id: 4, text: "Schedule a progress checkpoint", done: false }
];

export default function LifeTwinDashboard() {
  const [decision, setDecision] = useState("");
  const [hours, setHours] = useState(10);
  const [budget, setBudget] = useState(5000);
  const [horizon, setHorizon] = useState("90 days");
  const [selected, setSelected] = useState(1);
  const [hasRun, setHasRun] = useState(false);
  const [running, setRunning] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const welcomeMessage = "Welcome to LifeTwin AI. Describe a decision and I can help you structure the options. Ask questions about goals, options, trade-offs, and next steps.";
  type ChatMessage = { role: "user" | "assistant"; text: string };
  type SavedConversation = { id: string; title: string; messages: ChatMessage[]; updatedAt: number };
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", text: welcomeMessage }
  ]);
  const [conversations, setConversations] = useState<SavedConversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState("");
  const [historyReady, setHistoryReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lifetwin-chat-history-v1");
      const parsed: SavedConversation[] = saved ? JSON.parse(saved) : [];
      if (Array.isArray(parsed) && parsed.length) {
        const valid = parsed.filter(c => c && typeof c.id === "string" && Array.isArray(c.messages));
        if (valid.length) {
          setConversations(valid);
          setActiveConversationId(valid[0].id);
          setMessages(valid[0].messages);
          setHistoryReady(true);
          return;
        }
      }
    } catch {
      // Ignore invalid or unavailable browser storage and start a fresh chat.
    }

    const first: SavedConversation = {
      id: `chat-${Date.now()}`,
      title: "New conversation",
      messages: [{ role: "assistant", text: welcomeMessage }],
      updatedAt: Date.now()
    };
    setConversations([first]);
    setActiveConversationId(first.id);
    setMessages(first.messages);
    setHistoryReady(true);
  }, []);

  useEffect(() => {
    if (!historyReady || !activeConversationId) return;
    setConversations(old => {
      const current = old.find(c => c.id === activeConversationId);
      if (!current) return old;
      const firstUser = messages.find(m => m.role === "user")?.text;
      const title = current.title === "New conversation" && firstUser
        ? firstUser.slice(0, 38)
        : current.title;
      const updated = old.map(c => c.id === activeConversationId
        ? { ...c, title, messages, updatedAt: Date.now() }
        : c);
      try {
        localStorage.setItem("lifetwin-chat-history-v1", JSON.stringify(updated));
      } catch {
        // Chat remains usable if browser storage is full or unavailable.
      }
      return updated;
    });
  }, [messages, activeConversationId, historyReady]);

  function startNewChat() {
    if (chatLoading) return;
    const next: SavedConversation = {
      id: `chat-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title: "New conversation",
      messages: [{ role: "assistant", text: welcomeMessage }],
      updatedAt: Date.now()
    };
    setConversations(old => [next, ...old]);
    setActiveConversationId(next.id);
    setMessages(next.messages);
  }

  function switchChat(id: string) {
    if (chatLoading || id === activeConversationId) return;
    const selectedChat = conversations.find(c => c.id === id);
    if (!selectedChat) return;
    setActiveConversationId(id);
    setMessages(selectedChat.messages);
  }
  const [activeTab, setActiveTab] = useState("Decision Lab");
  const [showChat, setShowChat] = useState(true);
  const [comparison, setComparison] = useState(false);

  const chosen = scenarios[selected];
  const completed = tasks.filter(t => t.done).length;
  const taskProgress = Math.round((completed / tasks.length) * 100);

  const chartData = useMemo(() => {
    const base = Math.max(1, hours);
    return [
      { week: "Week 1", growth: Math.min(95, base * 4 + 12), balanced: Math.min(90, base * 3 + 10), flexible: Math.min(80, base * 2 + 12) },
      { week: "Week 2", growth: Math.min(95, base * 5 + 15), balanced: Math.min(90, base * 3.5 + 15), flexible: Math.min(80, base * 2.5 + 15) },
      { week: "Week 3", growth: Math.min(95, base * 5.5 + 18), balanced: Math.min(90, base * 4 + 18), flexible: Math.min(80, base * 3 + 18) },
      { week: "Week 4", growth: Math.min(95, base * 6 + 20), balanced: Math.min(90, base * 4.5 + 20), flexible: Math.min(80, base * 3.5 + 20) }
    ];
  }, [hours]);

  function runSimulation() {
    setRunning(true);
    setHasRun(false);
    // Prototype-only local calculation; this is not a live AI inference.
    window.setTimeout(() => {
      setRunning(false);
      setHasRun(true);
    }, 650);
  }

  function formatChatText(input: string): string {
  return input
    .replace(/\\r\\n|\\n|\\r/g, "\n")
    .replace(/\\\*/g, "*")
    .replace(/\*\*([\s\S]*?)\*\*/g, "$1")
    .replace(/(^|\n)[ \t]*\*[ \t]+/g, "$1• ")
    .trim();
}
function getInstantReply(input: string): string | null {
    let text = input.toLowerCase().trim()
      .replace(/[.!?,]+$/g, "")
      .replace(/\s+/g, " ");

    const corrections: [RegExp, string][] = [
      [/\btiered\b/g, "tired"],
      [/\bpaln\b/g, "plan"],
      [/\bhomweork\b/g, "homework"],
      [/\bnoe\b/g, "now"],
      [/\bwnat\b/g, "want"],
      [/\bsl eepy\b/g, "sleepy"]
    ];
    for (const [pattern, value] of corrections) {
      text = text.replace(pattern, value);
    }

    if (/^(hi|hello|hey|hii|good morning|good afternoon|good evening)$/.test(text)) {
      return "Hi! I'm here to help. What would you like to work through today?";
    }

    if (/^(bye|goodbye|good night|goodnight|gn|ok gn|okay gn)$/.test(text)) {
      return "Good night! Rest well. We can pick things up whenever you're ready.";
    }

    if (/\b(sleepy|sleepiness|drowsy|need sleep|feeling sleepy)\b/.test(text)) {
      return "If you're sleepy, give yourself permission to pause. Drink some water, step away from your screen, and rest if you can. You can return to your tasks when you feel ready.";
    }

    if (/\b(tired|exhausted|drained|overwhelmed|need rest|want rest|take rest|take a rest|rest now)\b/.test(text)) {
      return "It's okay to rest. Put your work aside for a little while, drink some water, and find a comfortable place to relax. You don't have to solve everything right now.";
    }

    if (/\b(ice cream|want.*dessert|craving.*sweet)\b/.test(text)) {
      return "An ice-cream break sounds nice! I can't physically bring you one, but you could check what's available nearby or enjoy a treat you already have.";
    }

    if (/^(what|what now|what can i do now|so now|ok then next|help me)$/.test(text)) {
      return "Let's take one step at a time. Would you like to study, finish homework, plan your day, or take a rest?";
    }

    if (/\b(study|studying|study plan|homework|assignment|exam preparation|exam prep)\b/.test(text)) {
      return "Let's make a simple study plan:\n\n1. Choose one subject or assignment.\n2. Pick one specific topic to finish first.\n3. Study for 25 minutes, then take a 5-minute break.\n4. Spend 10 minutes recalling what you learned or solving questions.\n5. Repeat only if you still have energy.\n\nTell me your subject and deadline, and I'll help organize the topics.";
    }

    if (/^(set my day|plan my day|help me plan my day|organize my day|organise my day|daily plan|set plan|plan my schedule)$/.test(text)) {
      return "Let's keep today manageable:\n\n1. Pick your top 3 priorities.\n2. Start with the most important small task.\n3. Work in focused blocks with short breaks.\n4. Leave some buffer time.\n5. Review what you completed before ending the day.\n\nTell me your main tasks and any fixed timings, and I'll help arrange them.";
    }

    if (/^(ok|okay|thanks|thank you)$/.test(text)) {
      return "You're welcome. Take it one step at a time. What would you like help with next?";
    }

    return null;
  }
async function sendMessage() {
    const value = chatInput.trim();
    if (!value || chatLoading) return;

    setChatInput("");
    setChatLoading(true);
    setMessages(old => [
      ...old,
      { role: "user", text: value },
      { role: "assistant", text: "" }
    ]);

    try {
      const instantReply = getInstantReply(value);
      if (instantReply) {
        setMessages(old => old.map((m, i) =>
          i === old.length - 1 && m.role === "assistant"
            ? { ...m, text: instantReply }
            : m
        ));
        return;
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value }),
        signal: AbortSignal.timeout(8000)
      });

      if (!response.ok) {
        let reason = `AI request failed (${response.status}).`;
        try {
          const data: { error?: string } = await response.json();
          if (data.error) reason = data.error;
        } catch {}
        throw new Error(reason);
      }

      if (!response.body) throw new Error("Streaming is unavailable in this browser.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let streamedText = "";

      const handleEvent = (eventText: string) => {
        for (const line of eventText.split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const data: { text?: string; error?: string; done?: boolean } =
            JSON.parse(line.slice(6));
          if (data.error) throw new Error(data.error);
          if (data.text) {
            streamedText += data.text;
            setMessages(old => old.map((m, i) =>
              i === old.length - 1 && m.role === "assistant"
                ? { ...m, text: streamedText }
                : m
            ));
          }
        }
      };

      while (true) {
        const { value: chunk, done } = await reader.read();
        buffer += decoder.decode(chunk || new Uint8Array(), { stream: !done });
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";
        for (const eventText of events) handleEvent(eventText);
        if (done) break;
      }
      if (buffer.trim()) handleEvent(buffer);
      if (!streamedText.trim()) throw new Error("AI returned an empty response.");
    } catch (error) {
      const timedOut = error instanceof Error &&
        (error.name === "TimeoutError" || error.name === "AbortError");
      const message = timedOut
        ? "The AI service is taking too long. Try a shorter question, or try again shortly."
        : error instanceof Error
          ? `I couldn't complete that reply: ${error.message} Please try again.`
          : "I couldn't reach the AI service. Please try again.";

      setMessages(old => old.map((m, i) =>
        i === old.length - 1 && m.role === "assistant"
          ? { ...m, text: message }
          : m
      ));
    } finally {
      setChatLoading(false);
    }
  }
  const navItems = [
    { name: "Decision Lab", icon: Compass },
    { name: "My Life Twin", icon: BrainCircuit },
    { name: "Future Scenarios", icon: GitCompareArrows },
    { name: "Action Tracker", icon: Target }
  ];
  const viewFor = (tab: string) => ({
    "Decision Lab": "decision",
    "My Life Twin": "profile",
    "Future Scenarios": "scenarios",
    "Action Tracker": "tracker"
  }[tab] || "decision");

  return (
    <main className="min-h-screen text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-64 shrink-0 border-r border-white/[0.08] bg-[#0a0d17]/85 p-5 lg:flex lg:flex-col">
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/20">
              <BrainCircuit size={23} />
            </div>
            <div>
              <div className="font-bold tracking-tight">LifeTwin AI</div>
              <div className="text-[9px] tracking-[.22em] text-violet-300">DECISION INTELLIGENCE</div>
            </div>
          </a>

          <div className="mt-10 text-[10px] font-semibold uppercase tracking-[.2em] text-slate-500">Workspace</div>
          <nav className="mt-3 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button key={item.name} onClick={() => setActiveTab(item.name)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm ${activeTab === item.name ? "border border-violet-400/20 bg-violet-400/10 text-violet-200" : "text-slate-400 hover:bg-white/[0.04] hover:text-white"}`}>
                  <Icon size={17} />{item.name}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto rounded-2xl border border-cyan-300/15 bg-gradient-to-br from-violet-500/10 to-cyan-400/5 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-100"><ShieldCheck size={15} /> Human in control</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-400">Explore possible outcomes, examine assumptions, and make the final decision yourself.</p>
          </div>
        </aside>

        <div id="home" className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/[0.08] bg-[#090c16]/85 px-4 py-4 backdrop-blur-xl sm:px-7">
            <div className="flex items-center gap-3 lg:hidden">
              <div className="rounded-xl bg-violet-500/20 p-2 text-violet-200"><BrainCircuit size={21}/></div>
              <span className="font-bold">LifeTwin AI</span>
            </div>
            <div className="hidden text-xs text-slate-400 sm:block">Workspace <span className="mx-2 text-slate-600">/</span><span className="text-slate-200">{activeTab}</span></div>
            <div className="ml-auto flex items-center gap-3">
              <span className="rounded-full border border-amber-300/20 bg-amber-300/[0.07] px-3 py-1.5 text-[10px] text-amber-200">Prototype mode</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-300/25 bg-gradient-to-br from-violet-400/25 to-cyan-300/20 text-xs font-bold">LT</div>
            </div>
          </header>

          <div className="mx-auto max-w-[1300px] p-4 sm:p-7 xl:p-10">
            <section hidden={activeTab !== "Decision Lab"} className="lt-animate-in relative overflow-hidden rounded-3xl border border-violet-300/15 bg-gradient-to-br from-violet-950/70 via-[#13152a] to-cyan-950/35 p-6 sm:p-9">
              <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl"/>
              <div className="pointer-events-none absolute bottom-0 right-1/3 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl"/>
              <div className="relative grid gap-8 xl:grid-cols-[1.4fr_.6fr] xl:items-center">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[.22em] text-cyan-200"><Sparkles size={14}/> YOUR PERSONAL DECISION ENGINE</div>
                  <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">Your future, <span className="lt-gradient-text">explored.</span></h1>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">Compare different paths before committing. Explore trade-offs, adjust assumptions, and turn uncertainty into a plan you can act on.</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["Multiple paths","Trade-off clarity","Actionable steps"].map(x => <span key={x} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] text-slate-300"><Check size={12} className="mr-1 inline text-cyan-300"/>{x}</span>)}
                  </div>
                </div>
                <div hidden={activeTab !== "Action Tracker"} className="lt-animate-glow rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur-lg">
                  <div className="flex items-center justify-between text-xs text-slate-400"><span>Action tracker</span><Activity size={16} className="text-cyan-300"/></div>
                  <div className="mt-3 flex items-end justify-between"><span className="text-4xl font-semibold">{taskProgress}%</span><span className="text-xs text-slate-400">{completed} of {tasks.length} complete</span></div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300 transition-all duration-700" style={{width:`${taskProgress}%`}}/></div>
                  <p className="mt-3 text-[10px] leading-5 text-slate-500">Calculated from your checklistâ€”not a prediction of future success.</p>
                </div>
              </div>
            </section>

            <section id="decision" hidden={activeTab !== "Decision Lab" && activeTab !== "My Life Twin"} className="lt-animate-in lt-delay-1 mt-8 scroll-mt-24">
              <div hidden={activeTab !== "Decision Lab"} className="mb-4 flex items-end justify-between gap-3"><div><div className="text-[10px] font-semibold tracking-[.2em] text-violet-300">01 / DEFINE</div><h2 className="mt-2 text-xl font-semibold">Start with a decision that matters</h2><p className="mt-2 text-xs text-slate-400">Tell us what you are deciding and what resources you have.</p></div><button onClick={() => {setDecision("");setHasRun(false);setSelected(1);}} className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/5"><Plus size={14}/> New decision</button></div>

              <div className="grid gap-4 xl:grid-cols-[1.25fr_.75fr]">
                <div hidden={activeTab !== "Decision Lab"} className="lt-glass rounded-2xl p-5 sm:p-6">
                  <label htmlFor="lt-decision" className="text-sm font-medium">What are you trying to decide?</label>
                  <textarea id="lt-decision" value={decision} onChange={e=>setDecision(e.target.value)} maxLength={2000} placeholder="Example: Should I focus on software, prepare for core electronics roles, or balance both over the next 6 months?" className="mt-3 min-h-32 w-full resize-y rounded-xl border border-white/10 bg-[#090d18]/80 p-4 text-sm leading-6 outline-none placeholder:text-slate-600 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/10"/>
                  <div className="mt-2 text-right text-[10px] text-slate-500">{decision.length}/2000 characters</div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div><label htmlFor="lt-hours" className="flex items-center gap-2 text-xs text-slate-400"><Clock3 size={14}/> Time available / week</label><div className="mt-3 flex items-center gap-3"><input id="lt-hours" type="range" min="1" max="60" value={hours} onChange={e=>setHours(Number(e.target.value))} className="w-full accent-violet-400"/><span className="min-w-16 rounded-lg bg-white/[0.05] px-3 py-2 text-center text-sm">{hours}h</span></div></div>
                    <div><label htmlFor="lt-budget" className="flex items-center gap-2 text-xs text-slate-400"><Wallet size={14}/> Budget (optional)</label><div className="mt-3 flex items-center rounded-xl border border-white/10 bg-[#090d18]/80 px-3"><span className="text-slate-500">â‚¹</span><input id="lt-budget" type="number" min="0" value={budget} onChange={e=>setBudget(Math.max(0,Number(e.target.value)||0))} className="w-full bg-transparent p-2.5 text-sm outline-none"/></div></div>
                  </div>
                  <div className="mt-5"><label htmlFor="lt-horizon" className="text-xs text-slate-400">Planning horizon</label><div className="relative mt-2"><select id="lt-horizon" value={horizon} onChange={e=>setHorizon(e.target.value)} className="w-full appearance-none rounded-xl border border-white/10 bg-[#101321] px-3 py-3 text-sm outline-none focus:border-violet-400/60"><option>30 days</option><option>90 days</option><option>6 months</option><option>1 year</option><option>3 years</option></select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-3.5 text-slate-500"/></div></div>
                  <button disabled={!decision.trim()||running} onClick={runSimulation} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-3.5 text-sm font-semibold shadow-lg shadow-violet-950/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"><Zap size={16}/>{running?"Exploring scenarios…":"Run Analysis"}<ArrowRight size={15}/></button>
                  <p className="mt-3 text-center text-[10px] text-slate-500">Prototype simulation only · No live AI inference is connected.</p>
                  {hasRun && <div role="status" className="lt-animate-in mt-4 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] p-3 text-xs leading-5 text-cyan-100"><CheckCircle2 size={15} className="mr-2 inline"/> Prototype scenario view refreshed using your selected resources. Results are illustrative, not validated forecasts.</div>}
                </div>

                <div id="profile" hidden={activeTab !== "My Life Twin"} className="lt-glass scroll-mt-24 rounded-2xl p-5 sm:p-6">
                  <div className="flex items-center gap-3"><div className="rounded-xl bg-cyan-300/10 p-3 text-cyan-200"><BrainCircuit size={19}/></div><div><h3 className="text-sm font-semibold">My Life Twin</h3><p className="mt-1 text-[10px] text-slate-500">Your decision context</p></div></div>
                  <p className="mt-4 text-xs leading-6 text-slate-400">A useful decision model starts with your goals, resources, constraints, and definition of success.</p>
                  <div className="mt-5 space-y-3">{[{icon:Target,label:"Decision focus",value:decision.trim()?"Personal decision entered":"Not defined"},{icon:Clock3,label:"Weekly time",value:`${hours} hours`},{icon:Wallet,label:"Available budget",value:`â‚¹${budget.toLocaleString("en-IN")}`},{icon:Compass,label:"Horizon",value:horizon}].map(item=>{const Icon=item.icon;return <div key={item.label} className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.025] p-3"><span className="flex items-center gap-2 text-xs text-slate-400"><Icon size={14}/>{item.label}</span><span className="max-w-[55%] truncate text-right text-xs font-medium">{item.value}</span></div>})}</div>
                  <div className="mt-5 rounded-xl border border-violet-300/15 bg-violet-300/[0.05] p-3 text-[11px] leading-5 text-violet-100"><Lightbulb size={14} className="mr-2 inline"/>Tip: state what a good outcome looks like and what constraints cannot change.</div>
                </div>
              </div>
            </section>

            <section id="scenarios" hidden={activeTab !== "Future Scenarios"} className="lt-animate-in lt-delay-2 mt-10 scroll-mt-24">
              <div className="text-[10px] font-semibold tracking-[.2em] text-cyan-300">02 / EXPLORE</div>
              <div className="mt-2 flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-xl font-semibold">Your possible futures</h2><p className="mt-2 text-xs text-slate-400">Select a path and inspect its trade-offs.</p></div><button onClick={()=>{setComparison(v=>!v);}} className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/[0.05]"><GitCompareArrows size={14}/>{comparison?"Hide comparison":"Compare paths"}</button></div>
              <div className="mt-5 grid gap-4 lg:grid-cols-3">{scenarios.map((s,i)=><button key={s.name} onClick={()=>setSelected(i)} aria-pressed={selected===i} className={`lt-interactive-card lt-animate-in rounded-2xl border p-5 text-left ${selected===i?"border-violet-300/40 bg-violet-400/[0.08] shadow-lg shadow-violet-950/20":"border-white/[0.08] bg-white/[0.02]"}`} style={{animationDelay:`${i*90}ms`}}><div className="flex items-center justify-between"><span className="text-[10px] font-semibold tracking-widest" style={{color:s.color}}>PATH 0{i+1}</span>{selected===i?<CheckCircle2 size={17} style={{color:s.color}}/>:<span className="h-4 w-4 rounded-full border border-white/20"/>}</div><h3 className="mt-5 text-base font-semibold">{s.name}</h3><p className="mt-2 min-h-10 text-xs leading-5 text-slate-400">{s.subtitle}</p><div className="mt-5 space-y-2"><div className="flex justify-between rounded-lg bg-black/20 p-3 text-xs"><span className="text-slate-500">Risk exposure</span><span>{s.risk}</span></div><div className="flex justify-between rounded-lg bg-black/20 p-3 text-xs"><span className="text-slate-500">Effort required</span><span>{s.effort}</span></div><div className="flex justify-between rounded-lg bg-black/20 p-3 text-xs"><span className="text-slate-500">Flexibility</span><span>{s.flexibility}</span></div></div><div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full transition-all duration-500" style={{width:selected===i?"100%":"35%",background:s.color}}/></div></button>)}</div>
              {comparison&&<div className="lt-animate-in mt-5 rounded-2xl border border-white/10 bg-[#101321]/80 p-5"><h3 className="text-sm font-semibold">Compare trade-offs</h3><div className="mt-4 grid gap-4 sm:grid-cols-3">{scenarios.map(s=><div key={s.name} className="rounded-xl bg-white/[0.025] p-4"><div className="text-xs font-semibold" style={{color:s.color}}>{s.name}</div><p className="mt-2 text-xs text-slate-400">Risk: {s.risk}</p><p className="mt-1 text-xs text-slate-400">Effort: {s.effort}</p><p className="mt-1 text-xs text-slate-400">Flexibility: {s.flexibility}</p></div>)}</div></div>}
              <p className="mt-4 flex gap-2 text-[10px] leading-5 text-slate-500"><CircleHelp size={14} className="mt-0.5 shrink-0"/>These are qualitative example paths for the prototype. They are not AI-generated predictions, probability estimates, or evidence-based forecasts.</p>
            </section>

            <section hidden={activeTab !== "Future Scenarios"} className="mt-10 grid gap-5 xl:grid-cols-2">
              <div className="lt-glass rounded-2xl p-5 sm:p-6">
                <div className="flex items-center justify-between"><div><h2 className="text-sm font-semibold">Planning capacity trend</h2><p className="mt-1 text-[10px] text-slate-500">Illustrative index · responds to weekly hours</p></div><TrendingUp size={18} className="text-cyan-300"/></div>
                <div className="mt-5 h-64 w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{top:8,right:8,left:-22,bottom:0}}><defs><linearGradient id="ltGrowth" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a78bfa" stopOpacity={0.45}/><stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/></linearGradient><linearGradient id="ltBalanced" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#67e8f9" stopOpacity={0.3}/><stop offset="95%" stopColor="#67e8f9" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="rgba(255,255,255,.06)" strokeDasharray="3 3"/><XAxis dataKey="week" tick={{fill:"#8490a5",fontSize:10}} axisLine={false} tickLine={false}/><YAxis tick={{fill:"#8490a5",fontSize:10}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:"#111526",border:"1px solid #34364b",borderRadius:12,fontSize:11}}/><Area type="monotone" dataKey="growth" name="Growth path" stroke="#a78bfa" fill="url(#ltGrowth)" strokeWidth={2} animationDuration={800}/><Area type="monotone" dataKey="balanced" name="Balanced path" stroke="#67e8f9" fill="url(#ltBalanced)" strokeWidth={2} animationDuration={950}/><Area type="monotone" dataKey="flexible" name="Flexible path" stroke="#f0abfc" fill="transparent" strokeWidth={2} animationDuration={1100}/></AreaChart></ResponsiveContainer></div>
              </div>
              <div className="lt-glass rounded-2xl p-5 sm:p-6">
                <div className="flex items-center justify-between"><div><h2 className="text-sm font-semibold">Scenario comparison chart</h2><p className="mt-1 text-[10px] text-slate-500">Illustrative index, not success probability</p></div><Activity size={18} className="text-violet-300"/></div>
                <div className="mt-5 h-64 w-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={[{name:"Growth",risk:80,flexibility:30},{name:"Balanced",risk:50,flexibility:65},{name:"Flexible",risk:25,flexibility:85}]} margin={{top:8,right:8,left:-22,bottom:0}}><CartesianGrid stroke="rgba(255,255,255,.06)" strokeDasharray="3 3"/><XAxis dataKey="name" tick={{fill:"#8490a5",fontSize:10}} axisLine={false} tickLine={false}/><YAxis domain={[0,100]} tick={{fill:"#8490a5",fontSize:10}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:"#111526",border:"1px solid #34364b",borderRadius:12,fontSize:11}}/><Bar dataKey="risk" name="Relative risk index" fill="#a78bfa" radius={[5,5,0,0]} animationDuration={850}/><Bar dataKey="flexibility" name="Relative flexibility index" fill="#67e8f9" radius={[5,5,0,0]} animationDuration={1000}/></BarChart></ResponsiveContainer></div>
              </div>
            </section>

            <section id="tracker" hidden={activeTab !== "Action Tracker"} className="lt-animate-in mt-10 scroll-mt-24">
              <div className="flex flex-wrap items-end justify-between gap-3"><div><div className="text-[10px] font-semibold tracking-[.2em] text-emerald-300">03 / ACT</div><h2 className="mt-2 text-xl font-semibold">Action tracker</h2><p className="mt-2 text-xs text-slate-400">Check off milestones to update your actual completion percentage.</p></div><span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] px-3 py-2 text-xs text-emerald-200">{completed}/{tasks.length} completed</span></div>
              <div className="lt-glass mt-5 rounded-2xl p-5 sm:p-6"><div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300 transition-all duration-700" style={{width:`${taskProgress}%`}}/></div><div className="mt-5 space-y-3">{tasks.map(task=><label key={task.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${task.done?"border-emerald-300/15 bg-emerald-300/[0.04]":"border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04]"}`}><input type="checkbox" checked={task.done} onChange={()=>setTasks(old=>old.map(t=>t.id===task.id?{...t,done:!t.done}:t))} className="h-4 w-4 accent-emerald-400"/><span className={`flex-1 text-xs ${task.done?"text-slate-500 line-through":"text-slate-200"}`}>{task.text}</span>{task.done&&<CheckCircle2 size={16} className="text-emerald-300"/>}</label>)}</div><button onClick={()=>setTasks(old=>[...old,{id:Math.max(0,...old.map(t=>t.id))+1,text:"New personal milestone",done:false}])} className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-xs text-slate-300 hover:bg-white/[0.04]"><Plus size={14}/> Add milestone</button></div>
            </section>

            <section hidden={activeTab !== "Action Tracker"} className="lt-animate-in mt-10">
              <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-semibold">Decision companion</h2><p className="mt-2 text-xs text-slate-400">Explore questions and clarify your thinking.</p></div><button onClick={()=>setShowChat(v=>!v)} className="rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/[0.04]">{showChat?"Hide chat":"Open chat"}</button></div>
              {showChat&&<div className="lt-glass mt-5 overflow-hidden rounded-2xl"><div className="flex items-center gap-3 border-b border-white/[0.07] p-4"><div className="rounded-xl bg-violet-400/10 p-2 text-violet-200"><MessageCircle size={17}/></div><div><div className="text-xs font-semibold">LifeTwin conversation</div><div className="mt-1 text-[10px] text-amber-200">Gemini AI · live responses</div></div><button onClick={startNewChat} className="ml-auto rounded-lg border border-white/10 px-3 py-2 text-[10px] text-slate-300 hover:bg-white/[0.04]">New chat</button></div><div className="flex gap-2 overflow-x-auto border-b border-white/[0.07] p-3">{conversations.map(c=><button key={c.id} onClick={()=>switchChat(c.id)} title={c.title} className={`max-w-44 shrink-0 truncate rounded-lg border px-3 py-2 text-[10px] transition ${c.id===activeConversationId?"border-violet-400/50 bg-violet-500/15 text-violet-100":"border-white/10 text-slate-400 hover:bg-white/[0.05]"}`}>{c.title || "New conversation"}</button>)}</div><div className="max-h-72 space-y-3 overflow-y-auto p-4" aria-live="polite">{messages.map((m,i)=><div key={i} className={`flex ${m.role==="user"?"justify-end": "justify-start"}`}><div className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-xs leading-6 ${m.role==="user"?"bg-violet-500/20 text-violet-100":"border border-white/[0.07] bg-white/[0.035] text-slate-300"}`}>{formatChatText(m.text)}</div></div>)}</div><form onSubmit={e=>{e.preventDefault();sendMessage();}} className="flex gap-2 border-t border-white/[0.07] p-3"><input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Ask about goals, options, or trade-offs…" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-xs outline-none focus:border-violet-400/60"/><button type="submit" disabled={!chatInput.trim() || chatLoading} aria-label="Send message" className="rounded-xl bg-violet-500 px-4 text-white disabled:opacity-40">{chatLoading ? <span className="text-xs">Thinking…</span> : <Send size={16}/>}</button></form></div>}
            </section>

            <footer className="mt-12 flex flex-col justify-between gap-3 border-t border-white/[0.07] py-6 text-[10px] leading-5 text-slate-600 sm:flex-row"><p>LifeTwin AI · Explore possibilities. Make informed choices.</p><p>Prototype · Illustrative charts and local chat are not forecasts or live AI advice.</p></footer>
          </div>
        </div>
      </div>
    </main>
  );
}











