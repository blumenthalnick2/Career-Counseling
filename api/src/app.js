import { useState, useEffect } from "react";

const questions = [
  {
    id: "workstyle_people", layer: "Work Style", layerColor: "#93C5FD",
    question: "In a typical workday, how much time do you want to spend working directly with other people?",
    subtitle: "Be honest — this one shapes everything.",
    options: [
      { value: "solo", label: "Mostly alone", icon: "🧘", desc: "Deep focus, minimal meetings" },
      { value: "mixed", label: "A healthy mix", icon: "⚖️", desc: "Some collaboration, some solo work" },
      { value: "people", label: "Mostly with others", icon: "🤝", desc: "People energy all day" },
    ],
  },
  {
    id: "workstyle_desk", layer: "Work Style", layerColor: "#93C5FD",
    question: "How many hours per day are you comfortable sitting at a computer?",
    subtitle: "Not what you can do — what you'd actually enjoy long-term.",
    options: [
      { value: "low", label: "Less than 2 hours", icon: "🌿", desc: "I need to move around" },
      { value: "medium", label: "2–4 hours", icon: "💻", desc: "Some screen time is fine" },
      { value: "high", label: "4–6 hours", icon: "🖥️", desc: "Comfortable at a desk" },
      { value: "full", label: "Most of the day", icon: "⌨️", desc: "I actually enjoy deep computer work" },
    ],
  },
  {
    id: "workstyle_handson", layer: "Work Style", layerColor: "#93C5FD",
    question: "Which feels more like you?",
    subtitle: "There's no right answer — this is about self-knowledge.",
    options: [
      { value: "handson", label: "Hands-on & physical", icon: "🔧", desc: "Building, fixing, making things in the real world" },
      { value: "knowledge", label: "Knowledge & analysis", icon: "📊", desc: "Thinking, writing, strategizing" },
      { value: "both", label: "A real mix of both", icon: "🔀", desc: "I want variety" },
    ],
  },
  {
    id: "workstyle_writing", layer: "Work Style", layerColor: "#93C5FD",
    question: "How do you feel about writing as a core part of your job?",
    subtitle: "Reports, emails, proposals — would that energize or drain you?",
    options: [
      { value: "love", label: "Love it", icon: "✍️", desc: "Writing is one of my strengths" },
      { value: "fine", label: "Fine in moderation", icon: "📝", desc: "Some writing is okay" },
      { value: "avoid", label: "Prefer to avoid it", icon: "🙅", desc: "Not my thing" },
    ],
  },
  {
    id: "workstyle_numbers", layer: "Work Style", layerColor: "#93C5FD",
    question: "How do you feel about data, spreadsheets, or math as a regular part of work?",
    subtitle: "Not whether you can do it — whether you want to.",
    options: [
      { value: "love", label: "Enjoy it", icon: "📈", desc: "Numbers make sense to me" },
      { value: "fine", label: "Fine in moderation", icon: "🔢", desc: "A little is okay" },
      { value: "avoid", label: "Would rather not", icon: "😅", desc: "Keep the spreadsheets away" },
    ],
  },
  {
    id: "practical_earnings", layer: "Money & Lifestyle", layerColor: "#FCD34D",
    question: "What income level are you aiming for in your career?",
    subtitle: "This is a real filter — some paths simply can't get you there.",
    options: [
      { value: "high", label: "$200k+ / year", icon: "💰", desc: "I want serious wealth — finance, law, medicine, tech" },
      { value: "comfortable", label: "$60k–$150k / year", icon: "🏠", desc: "Comfortable, stable professional income" },
      { value: "mission", label: "Below market is okay", icon: "🌱", desc: "I'd trade pay for meaningful work" },
    ],
  },
  {
    id: "practical_intensity", layer: "Money & Lifestyle", layerColor: "#FCD34D",
    question: "How hard do you want to work?",
    subtitle: "Ambition is great — but knowing yourself is smarter.",
    options: [
      { value: "intense", label: "60+ hours — I want to build something big", icon: "🚀", desc: "High intensity, high reward" },
      { value: "standard", label: "40–45 hours — standard professional", icon: "⏰", desc: "Solid career, room for life" },
      { value: "balanced", label: "Work-life balance is a real priority", icon: "🌅", desc: "I want a full life outside work" },
    ],
  },
  {
    id: "practical_mobility", layer: "Money & Lifestyle", layerColor: "#FCD34D",
    question: "How important is geographic flexibility to you?",
    subtitle: "Some careers take you anywhere. Others chain you to one or two cities.",
    options: [
      { value: "high", label: "Very important — I want to live anywhere", icon: "🗺️", desc: "Nursing, teaching, trades — high portability" },
      { value: "medium", label: "A few major cities is fine", icon: "🏙️", desc: "Flexibility within reason" },
      { value: "low", label: "Not important — happy to plant roots", icon: "🌳", desc: "Stability over mobility" },
    ],
  },
  {
    id: "career_impact", layer: "Career Shape", layerColor: "#FCA5A5",
    question: "Which kind of impact feels most meaningful to you?",
    subtitle: "Think about what would make you feel proud at the end of a workday.",
    options: [
      { value: "direct", label: "Helping specific people directly", icon: "❤️", desc: "I want to see my impact on individuals" },
      { value: "systemic", label: "Driving systemic change", icon: "🌍", desc: "Big picture, policy, scale" },
      { value: "building", label: "Building things", icon: "🏗️", desc: "Products, companies, tools" },
      { value: "wealth", label: "Creating financial value", icon: "📊", desc: "Markets, deals, growth" },
    ],
  },
  {
    id: "career_orgtype", layer: "Career Shape", layerColor: "#FCA5A5",
    question: "What kind of organization do you picture yourself working in?",
    subtitle: "This shapes your daily culture, pace, and politics more than most people expect.",
    options: [
      { value: "startup", label: "Startup or small company", icon: "⚡", desc: "Fast, scrappy, wear many hats" },
      { value: "midsize", label: "Mid-size company", icon: "🏢", desc: "Structure with room to grow" },
      { value: "enterprise", label: "Large corporation", icon: "🌐", desc: "Resources, stability, clear ladder" },
      { value: "mission", label: "Nonprofit / government / social enterprise", icon: "🤲", desc: "Mission-first, different incentives" },
    ],
  },
  {
    id: "career_management", layer: "Career Shape", layerColor: "#FCA5A5",
    question: "Long-term, what kind of role do you want to grow into?",
    subtitle: "Neither answer is better — they lead to very different paths.",
    options: [
      { value: "manager", label: "Lead & manage people", icon: "👥", desc: "Build teams, set direction" },
      { value: "specialist", label: "Deep individual expertise", icon: "🎯", desc: "Become the expert others rely on" },
      { value: "founder", label: "Start my own thing", icon: "🏗️", desc: "Entrepreneurship or freelance" },
      { value: "either", label: "Open to any of these", icon: "🔭", desc: "I'll figure it out as I go" },
    ],
  },
  {
    id: "ai_relationship", layer: "Future of Work", layerColor: "#C4B5FD",
    question: "How do you feel about working in a field that AI will significantly change?",
    subtitle: "This isn't about fear — it's about fit.",
    options: [
      { value: "resistant", label: "I want strong AI resistance", icon: "🛡️", desc: "Trades, hands-on care, things robots can't easily do" },
      { value: "alongside", label: "Work with AI as a tool", icon: "🤖", desc: "Amplify my skills with AI" },
      { value: "inside", label: "Work inside AI/tech itself", icon: "⚡", desc: "Build the future" },
      { value: "unsure", label: "Honestly not sure yet", icon: "🤷", desc: "Help me think about it" },
    ],
  },
];

const S = {
  bg: "#020817", surface: "#0f172a", border: "#1e293b",
  text: "#f1f5f9", muted: "#64748b", subtle: "#94a3b8",
  green: "#6EE7B7", blue: "#93C5FD", red: "#FCA5A5",
  yellow: "#FCD34D", purple: "#C4B5FD",
};

const aiColors = { low: "#6EE7B7", medium: "#FCD34D", high: "#FCA5A5" };
const aiLabels = { low: "🟢 AI-Resilient", medium: "🟡 Will Evolve", high: "🔴 High Change" };

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: S.muted, fontFamily: "'DM Mono', monospace" }}>
        <span>Question {current} of {total}</span><span>{pct}%</span>
      </div>
      <div style={{ height: 4, background: S.border, borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${S.green}, ${S.blue})`, borderRadius: 2, transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
}

function QuestionCard({ q, onAnswer, onBack, stepIndex, animating }) {
  return (
    <div style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(16px)" : "translateY(0)", transition: "all 0.3s ease" }}>
      <div style={{ marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: "0.15em", textTransform: "uppercase", color: q.layerColor, background: q.layerColor + "22", padding: "4px 10px", borderRadius: 20 }}>{q.layer}</span>
      </div>
      <h2 style={{ fontSize: "clamp(20px, 3.5vw, 30px)", fontFamily: "'Playfair Display', serif", fontWeight: 700, color: S.text, lineHeight: 1.3, marginBottom: 10 }}>{q.question}</h2>
      <p style={{ color: S.muted, fontSize: 15, marginBottom: 28 }}>{q.subtitle}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map(opt => (
          <button key={opt.value} onClick={() => onAnswer(opt.value)}
            style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", background: S.surface, border: `2px solid ${S.border}`, borderRadius: 12, cursor: "pointer", textAlign: "left", transition: "all 0.15s ease", width: "100%" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = q.layerColor + "99"; e.currentTarget.style.background = q.layerColor + "0f"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = S.border; e.currentTarget.style.background = S.surface; }}
          >
            <span style={{ fontSize: 24, flexShrink: 0 }}>{opt.icon}</span>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, color: S.text }}>{opt.label}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: S.muted, marginTop: 2 }}>{opt.desc}</div>
            </div>
          </button>
        ))}
      </div>
      {stepIndex > 0 && (
        <button onClick={onBack} style={{ marginTop: 24, background: "none", border: "none", color: S.muted, cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: 13 }}>← go back</button>
      )}
    </div>
  );
}

function CareerCard({ career, index, visible }) {
  const c = career;
  const risk = c.ai_risk || "medium";
  const ac = aiColors[risk];
  const sectionColors = { why_it_fits: S.green, daily_reality: S.blue, earnings_note: S.yellow, ai_note: S.purple, path: S.red };
  const sectionLabels = { why_it_fits: "Why it fits you", daily_reality: "Daily reality", earnings_note: "Earnings outlook", ai_note: "AI outlook", path: "Getting started" };

  return (
    <div style={{
      background: S.surface, border: `1px solid ${S.border}`, borderRadius: 16, padding: "24px",
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.5s ease, transform 0.5s ease",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 34 }}>{c.emoji}</span>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: S.text, margin: 0 }}>{c.title}</h3>
            <span style={{ fontSize: 12, color: S.muted, fontFamily: "'DM Mono', monospace" }}>{c.earnings}</span>
          </div>
        </div>
        <span style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: ac, background: ac + "18", padding: "4px 10px", borderRadius: 20 }}>{aiLabels[risk]}</span>
      </div>

      <div style={{ display: "grid", gap: 14 }}>
        {Object.entries(sectionLabels).map(([key, label]) => c[key] && (
          <div key={key}>
            <div style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", color: sectionColors[key], marginBottom: 4 }}>{label}</div>
            <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.6, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>{c[key]}</p>
          </div>
        ))}

        {c.courses && c.courses.length > 0 && (
          <div>
            <div style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", color: S.green, marginBottom: 10 }}>Courses to consider</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {c.courses.map((course, ci) => {
                const parts = course.split(" — ");
                return (
                  <div key={ci} style={{ display: "flex", gap: 10, background: S.bg, padding: "10px 14px", borderRadius: 10, border: `1px solid ${S.border}` }}>
                    <span style={{ color: S.green, fontSize: 13, flexShrink: 0, marginTop: 1 }}>→</span>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: S.text }}>{parts[0]}</div>
                      {parts[1] && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: S.muted, marginTop: 2 }}>{parts[1]}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

async function callAPI(prompt, maxTokens = 600) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!response.ok) throw new Error("API error");
  const data = await response.json();
  return data.content.map(i => i.text || "").join("").replace(/```json|```/g, "").trim();
}

function ResultsView({ answers, onRestart }) {
  const [summary, setSummary] = useState("");
  const [careers, setCareers] = useState([null, null, null]);
  const [careerTitles, setCareerTitles] = useState([]);
  const [cardErrors, setCardErrors] = useState([false, false, false]);
  const [loadingCards, setLoadingCards] = useState([true, true, true]);
  const [status, setStatus] = useState("loading");
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (status !== "loading") return;
    const iv = setInterval(() => setDots(d => d.length >= 3 ? "" : d + "."), 400);
    return () => clearInterval(iv);
  }, [status]);

  useEffect(() => { fetchAll(); }, []);

  const answerSummary = questions.map(q => {
    const opt = q.options.find(o => o.value === answers[q.id]);
    return `${q.question} → ${opt ? opt.label : "unanswered"}`;
  }).join("\n");

  async function fetchCareer(title, summary, index, attempt = 1) {
    const careerText = await callAPI(`You are a career counselor. Generate details for this career for an 18-year-old college freshman.

Career: ${title}
Student profile: ${summary}
Student answers: ${answerSummary}

IMPORTANT: Respond ONLY with a single valid JSON object. No markdown, no backticks, no explanation before or after. Start your response with { and end with }.

{"title":"${title}","emoji":"one relevant emoji","why_it_fits":"2 sentences specific to their answers","daily_reality":"1 sentence on a real workday","earnings":"$X–$Y range","earnings_note":"1 honest sentence on hitting their income goal","ai_risk":"low|medium|high","ai_note":"1 sentence on AI impact","path":"1 sentence on getting started in college","courses":["Course Name — why it matters","Course Name — why it matters","Course Name — why it matters"]}`, 550);

    // Try parsing — strip any stray text before/after the JSON object
    const match = careerText.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON object found");
    return JSON.parse(match[0]);
  }

  async function fetchAll() {
    setStatus("loading");
    setSummary("");
    setCareers([null, null, null]);
    setLoadingCards([true, true, true]);
    setCardErrors([false, false, false]);

    try {
      const planText = await callAPI(`You are a career counselor for an 18-year-old college freshman.

Based on these answers, write a 2-sentence profile summary and pick exactly 3 fitting career titles.
Rules: if hands-on/AI-resistant include one skilled trade; if mission org include nonprofit/gov option.

ANSWERS:
${answerSummary}

Respond ONLY with valid JSON, no markdown:
{"summary":"2 sentences","careers":["Career Title 1","Career Title 2","Career Title 3"]}`, 300);

      const plan = JSON.parse(planText);
      setSummary(plan.summary);
      setCareerTitles(plan.careers);
      setStatus("streaming");

      // Fire 3 parallel calls with auto-retry once on failure
      plan.careers.forEach(async (title, i) => {
        let success = false;
        for (let attempt = 1; attempt <= 2; attempt++) {
          try {
            const career = await fetchCareer(title, plan.summary, i, attempt);
            setCareers(prev => { const next = [...prev]; next[i] = career; return next; });
            setLoadingCards(prev => { const next = [...prev]; next[i] = false; return next; });
            success = true;
            break;
          } catch(e) {
            if (attempt === 2) {
              setCardErrors(prev => { const next = [...prev]; next[i] = true; return next; });
              setLoadingCards(prev => { const next = [...prev]; next[i] = false; return next; });
            }
          }
        }
      });

      const checkDone = setInterval(() => {
        setLoadingCards(prev => {
          if (prev.every(v => !v)) { setStatus("done"); clearInterval(checkDone); }
          return prev;
        });
      }, 500);

    } catch(e) {
      setStatus("error");
    }
  }

  if (status === "error") return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <p style={{ color: S.red, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>Something went wrong. Please try again.</p>
      <button onClick={fetchAll} style={{ padding: "12px 28px", background: S.green, color: S.bg, border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}>Try Again</button>
    </div>
  );

  return (
    <div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 4vw, 36px)", color: S.text, marginBottom: 16 }}>Your Career Profile</h2>

        {status === "loading" ? (
          <div style={{ background: S.surface, padding: "20px 24px", borderRadius: 14, borderLeft: `3px solid ${S.green}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 20, animation: "pulse 1.2s ease infinite" }}>🧭</span>
              <span style={{ color: S.muted, fontFamily: "'DM Mono', monospace", fontSize: 14 }}>Analyzing your answers{dots}</span>
            </div>
          </div>
        ) : (
          <p style={{ color: S.subtle, fontSize: 16, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", background: S.surface, padding: "20px 24px", borderRadius: 14, borderLeft: `3px solid ${S.green}`, opacity: summary ? 1 : 0, transition: "opacity 0.5s ease" }}>{summary}</p>
        )}
      </div>

      {/* Career cards — show as soon as titles are known */}
      {(careerTitles.length > 0 || status === "loading") && (
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: S.muted, marginBottom: 20 }}>
            Career Matches {status === "streaming" && <span style={{ color: S.green, animation: "pulse 1s ease infinite" }}>· generating</span>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[0, 1, 2].map(i => {
              const title = careerTitles[i];
              const career = careers[i];
              const isLoading = loadingCards[i];
              const hasError = cardErrors[i];

              // Error state — show title + retry button
              if (hasError) {
                return (
                  <div key={i} style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 16, padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: S.text }}>{title || "Career"}</div>
                    <button onClick={() => {
                      setCardErrors(prev => { const n = [...prev]; n[i] = false; return n; });
                      setLoadingCards(prev => { const n = [...prev]; n[i] = true; return n; });
                      fetchCareer(title, summary, i).then(c => {
                        setCareers(prev => { const n = [...prev]; n[i] = c; return n; });
                        setLoadingCards(prev => { const n = [...prev]; n[i] = false; return n; });
                      }).catch(() => {
                        setCardErrors(prev => { const n = [...prev]; n[i] = true; return n; });
                        setLoadingCards(prev => { const n = [...prev]; n[i] = false; return n; });
                      });
                    }} style={{ padding: "8px 18px", background: "none", border: `1px solid ${S.red}`, color: S.red, borderRadius: 8, cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: 12 }}>retry →</button>
                  </div>
                );
              }

              // Loading skeleton
              if (status === "loading" || isLoading || !career) {
                return (
                  <div key={i} style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 16, padding: "24px" }}>
                    {title ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                        <div style={{ width: 34, height: 34, background: S.border, borderRadius: 8, animation: "pulse 1.5s ease infinite" }} />
                        <div>
                          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: S.text }}>{title}</div>
                          <div style={{ height: 10, background: S.border, borderRadius: 4, width: 80, marginTop: 6, animation: "pulse 1.5s ease infinite" }} />
                        </div>
                      </div>
                    ) : (
                      <div style={{ height: 28, background: S.border, borderRadius: 8, width: "45%", marginBottom: 12, animation: "pulse 1.5s ease infinite" }} />
                    )}
                    <div style={{ height: 14, background: S.border, borderRadius: 6, width: "85%", marginBottom: 8, animation: "pulse 1.5s ease infinite" }} />
                    <div style={{ height: 14, background: S.border, borderRadius: 6, width: "60%", animation: "pulse 1.5s ease infinite" }} />
                  </div>
                );
              }

              return <CareerCard key={i} career={career} index={i} visible={true} />;
            })}
          </div>
        </div>
      )}

      {status === "done" && (
        <div style={{ marginTop: 40, paddingTop: 40, borderTop: `1px solid ${S.border}`, textAlign: "center" }}>
          <button onClick={onRestart} style={{ background: "none", border: `1px solid ${S.border}`, color: S.muted, padding: "12px 28px", borderRadius: 10, cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: 13 }}>← Start over</button>
        </div>
      )}
    </div>
  );
}

export default function CareerCompass() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [animating, setAnimating] = useState(false);

  const isIntro = step === -1;
  const isResults = step >= questions.length;
  const q = !isIntro && !isResults ? questions[step] : null;

  function handleAnswer(value) {
    setAnswers(prev => ({ ...prev, [questions[step].id]: value }));
    setAnimating(true);
    setTimeout(() => { setStep(s => s + 1); setAnimating(false); }, 300);
  }

  function goBack() {
    setAnimating(true);
    setTimeout(() => { setStep(s => s - 1); setAnimating(false); }, 200);
  }

  function restart() { setStep(-1); setAnswers({}); }

  return (
    <div style={{ minHeight: "100vh", background: S.bg, padding: "40px 20px", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&family=DM+Mono&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
          <span style={{ fontSize: 26 }}>🧭</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: "0.2em", color: S.muted, textTransform: "uppercase" }}>Career Compass</span>
          {!isIntro && !isResults && (
            <button onClick={restart} style={{ marginLeft: "auto", background: "none", border: `1px solid ${S.border}`, color: S.muted, padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontFamily: "'DM Mono', monospace" }}>restart</button>
          )}
        </div>

        {/* Intro */}
        {isIntro && (
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: S.green, textTransform: "uppercase", marginBottom: 16 }}>For first-year college students</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px, 6vw, 54px)", fontWeight: 900, color: S.text, lineHeight: 1.15, marginBottom: 24 }}>
              Find work that actually<br />
              <span style={{ background: `linear-gradient(90deg, ${S.green}, ${S.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>fits you.</span>
            </h1>
            <p style={{ fontSize: 17, color: S.muted, lineHeight: 1.7, marginBottom: 14, maxWidth: 520 }}>You're 18. First semester. Next semester's registration is coming up, and someone's going to ask what your major is.</p>
            <p style={{ fontSize: 17, color: S.muted, lineHeight: 1.7, marginBottom: 48, maxWidth: 520 }}>Most career advice asks what subjects you like. That's the wrong question. This asks how you want to <em style={{ color: S.subtle }}>live</em> — then tells you which careers and courses actually match that.</p>
            <div style={{ display: "flex", gap: 16, marginBottom: 48, flexWrap: "wrap" }}>
              {[["~6 min", "12 questions"], ["AI-powered", "real suggestions"], ["Courses included", "not just careers"]].map(([a, b]) => (
                <div key={a} style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 12, padding: "14px 18px" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: S.text, marginBottom: 2 }}>{a}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: S.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{b}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setStep(0)} style={{ padding: "16px 44px", background: `linear-gradient(135deg, ${S.green}, ${S.blue})`, color: S.bg, border: "none", borderRadius: 14, fontSize: 17, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              Find my path →
            </button>
          </div>
        )}

        {/* Quiz */}
        {!isIntro && !isResults && (
          <div>
            <ProgressBar current={step + 1} total={questions.length} />
            <QuestionCard q={q} onAnswer={handleAnswer} onBack={goBack} stepIndex={step} animating={animating} />
          </div>
        )}

        {/* Results */}
        {isResults && <ResultsView answers={answers} onRestart={restart} />}
      </div>
    </div>
  );
}
