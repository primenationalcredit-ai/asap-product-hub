import { useState, useEffect, useMemo } from "react";

const BRAND = {
  primary: "#003f87",
  primaryLight: "#0055b8",
  primaryDark: "#002d61",
  accent: "#1a7adb",
  gold: "#c9a227",
  goldLight: "#f5e6a3",
  bg: "#F0F4F8",
  white: "#FFFFFF"
};

const creditMonitoring = [
  { id: "idiq", name: "IdentityIQ", rank: 1, badge: "TOP PICK", description: "Our #1 recommended monitoring service. Full 3-bureau reports with scores, identity theft protection, and real-time alerts. Best for clients who need comprehensive monitoring during their credit repair journey.", url: "https://member.identityiq.com/get-all-your-reports-now.aspx?offercode=431263JR&goal_id=43&transactionid=a6eb3e71917d44d792512e196d65fc68&offer_id=65&aff_id=1031&aff_sub=BPartner_NameD" },
  { id: "smartcredit", name: "Smart Credit", rank: 2, badge: "RECOMMENDED", description: "Excellent alternative monitoring with detailed credit analysis tools. Great interface for tracking score changes and understanding credit factors.", url: "https://www.smartcredit.com/?PID=52188" },
  { id: "3scores", name: "3 Scores", rank: 3, badge: null, description: "Similar to Truly ID — provides all 3 bureau scores in one place. Good budget-friendly option for basic monitoring needs.", url: "https://www.rsptrack.com/click.track?CID=466744&AFID=426429" },
  { id: "freescore360", name: "FreeScore 360", rank: 4, badge: null, description: "360-degree view of your credit with all 3 scores. Easy-to-understand dashboard for clients who want straightforward monitoring.", url: "https://www.rsptrack.com/click.track?CID=402425&AFID=426429" },
  { id: "nationalcredit", name: "National Credit Reports", rank: 5, badge: null, description: "Comprehensive national credit reporting with detailed bureau information. Good for clients needing in-depth report access.", url: "https://www.rsptrack.com/click.track?CID=418993&AFID=426429" },
  { id: "creditbuilderiq", name: "Credit Builder IQ", rank: 6, badge: null, description: "Combines credit monitoring with credit-building insights. Useful for clients who want monitoring plus educational tools.", url: "https://www.rsptrack.com/click.track?CID=468231&AFID=426429" },
  { id: "creditscoreiq", name: "CreditScoreIQ", rank: 7, badge: null, description: "Score-focused monitoring service. Great for clients primarily interested in tracking their score improvements over time.", url: "https://www.rsptrack.com/click.track?CID=451837&AFID=426429" }
];

const creditBuilders = [
  { id: "kikoff", name: "Kikoff", type: "revolving", investment: 5, investmentLabel: "$5/mo", badge: "LOWEST COST", bureaus: ["Equifax", "Experian", "TransUnion*"], bureauNote: "Standard account reports to Equifax & Experian. Optional Credit Builder Loan reports to TransUnion & Equifax.", highlights: ["No credit check required", "$500 revolving credit line", "0% interest, no fees", "~2% utilization ratio", "Account never expires — builds age", "$2/mo membership"], description: "One of the most affordable ways to build revolving credit. Sets up a $500 revolving credit line with extremely low utilization. The account never expires, which helps build account age over time.", url: "https://www.rsptrack.com/click.track?CID=445274&AFID=426429", warn: null, priority: 1 },
  { id: "kovo", name: "Kovo", type: "installment", investment: 10, investmentLabel: "$10/mo", badge: null, bureaus: ["Experian", "Equifax", "MicroBilt"], bureauNote: null, highlights: ["No credit check / no hard pull", "Instant approval", "$0 security deposit", "0% APR, no fees", "Earn up to $1,075 in rewards", "24-month term"], description: "Build credit through small $10/month installment payments over 24 months. Includes educational courses and up to $1,075 in rewards. No bank account needed.", warn: "⚠️ Sales delayed 3-6 months. Reversals possible if client cancels or auto-pay fails.", url: "https://apply.creditcardbroker.com/aff_c?offer_id=390&aff_id=7635", priority: 2 },
  { id: "self-lender", name: "Self (Credit Builder)", type: "installment", investment: 25, investmentLabel: "$25/mo", badge: "BUILDS SAVINGS", bureaus: ["Equifax", "Experian", "TransUnion"], bureauNote: null, highlights: ["Reports to all 3 bureaus as installment loan", "Builds credit + savings simultaneously", "Includes credit monitoring", "Savings unlock at end of term", "Plans: $25, $35, $48, or $150/mo", "24-month term"], description: "Credit Builder Account through banking partners. Payments reported to all 3 bureaus as an installment loan. At the end of the 24-month term, your CD savings unlock (minus interest and fees).", url: "https://www.rsptrack.com/click.track?CID=453698&AFID=426429", warn: null, priority: 3 },
  { id: "magnum", name: "Magnum (CreditStrong)", type: "installment", investment: 28, investmentLabel: "$28/mo", badge: "LARGEST BUILDER", bureaus: ["Equifax", "Experian", "TransUnion"], bureauNote: null, highlights: ["86-point avg FICO® score increase", "Build $2,000–$30,000 in credit", "10-year terms available", "No prepayment or cancellation fees", "Reports to all 3 bureaus", "Largest credit builder in the nation"], description: "The largest credit builder in the nation. Build $2,000 to $30,000 of installment credit with an average 86-point FICO score increase.", url: "https://apply.creditcardbroker.com/aff_c?offer_id=412&aff_id=7635", warn: null, priority: 4 },
  { id: "opensky100", name: "OpenSky Secured Card ($100)", type: "revolving", investment: 100, investmentLabel: "$100 deposit", badge: "EASY APPROVAL", bureaus: ["Equifax", "Experian", "TransUnion"], bureauNote: null, highlights: ["89% approval rate — no credit check", "Up to 10% cash back", "Avg 47-point increase in 6 months", "Free FICO® score in app", "Apple/Google/Samsung Pay", "60-day deposit layaway"], description: "Pre-approved secured card with just $100 deposit. No credit check required with 89% approval rate. 2 out of 3 cardholders see an average 47-point increase after 6 months.", url: "https://apply.creditcardbroker.com/aff_c?offer_id=407&aff_id=7635", warn: null, priority: 5 },
  { id: "self-secured", name: "Self Secured Credit Card", type: "revolving", investment: 100, investmentLabel: "$100 deposit", badge: null, bureaus: ["Equifax", "Experian", "TransUnion"], bureauNote: null, highlights: ["Designed for poor/bad credit", "Build credit with secured card", "Reports to all 3 bureaus", "Additional tool alongside Self builder", "Refundable security deposit"], description: "Secured credit card from Self Financial, designed specifically for people with bad or poor credit. A great companion to the Self Credit Builder Account.", warn: "⚠️ Reversals apply if payment fails or cancellation within 30 days.", url: "https://www.rsptrack.com/click.track?CID=470400&AFID=426429", priority: 6 },
  { id: "creditstrong", name: "CreditStrong", type: "both", investment: 100, investmentLabel: "$100+ deposit", badge: null, bureaus: ["Equifax", "Experian", "TransUnion"], bureauNote: null, highlights: ["Revolv: revolving credit, no min payment", "Instal: installment credit + savings", "CS MAX: supersized installment plans", "Multiple plan options", "Reports to all 3 bureaus", "Builds credit history + savings"], description: "Multiple ways to build credit: CreditStrong Revolv (revolving), Instal (installment + savings), and CS MAX (supersized plans).", url: "https://apply.creditcardbroker.com/aff_c?offer_id=356&aff_id=7635", warn: null, priority: 7 },
  { id: "creditbuildercard", name: "Credit Builder Card", type: "revolving", investment: 200, investmentLabel: "$200 deposit", badge: "FAST REPORTING", bureaus: ["Equifax", "Experian", "TransUnion"], bureauNote: null, highlights: ["Reports within 1 week of approval", "Interest under 25%", "Low $200 limit — won't go into debt", "Designed specifically to build credit", "All 3 bureaus"], description: "Low $200 limit secured card that reports within a week of approval. Interest rates under 25%.", url: "https://www.creditbuildercard.com/asapcreditrepair", warn: null, priority: 8 },
  { id: "opensky200", name: "OpenSky Secured Card ($200)", type: "revolving", investment: 200, investmentLabel: "$200 deposit", badge: null, bureaus: ["Equifax", "Experian", "TransUnion"], bureauNote: null, highlights: ["Up to 10% cash back", "89% approval rate — no credit check", "Avg 47-point increase in 6 months", "Free FICO® score in app", "Apple/Google/Samsung Pay", "60-day deposit layaway"], description: "Same great OpenSky card with $200 deposit. Pre-approved with no credit check.", url: "https://apply.creditcardbroker.com/aff_c?offer_id=31&aff_id=7635", warn: null, priority: 9 },
  { id: "firstlatitude-elite", name: "First Latitude Elite Mastercard", type: "revolving", investment: 200, investmentLabel: "$200 deposit", badge: null, bureaus: ["Equifax", "Experian", "TransUnion"], bureauNote: null, highlights: ["1% cash back rewards", "Lower annual APR", "90-day deposit funding", "No minimum credit score required", "Refundable security deposit", "Reports to all 3 bureaus"], description: "Earn 1% cash back with a lower annual APR. Fund your deposit over 90 days. No minimum credit score required.", url: "https://apply.creditcardbroker.com/aff_c?offer_id=408&aff_id=7635", warn: null, priority: 10 },
  { id: "firstlatitude-assent", name: "First Latitude Assent Mastercard", type: "revolving", investment: 200, investmentLabel: "$200 deposit", badge: "$0 ANNUAL FEE", bureaus: ["Equifax", "Experian", "TransUnion"], bureauNote: null, highlights: ["$0 annual fee", "1% cash back rewards", "Deposit range: $200–$2,000", "Increase up to $5,000 over time", "All credit types welcome", "Reports to all 3 bureaus"], description: "No annual fee secured card with 1% cash back. Start with $200–$2,000 deposit, increase up to $5,000 over time.", url: "https://apply.creditcardbroker.com/aff_c?offer_id=409&aff_id=7635", warn: null, priority: 11 },
  { id: "firstprogress-select", name: "First Progress Platinum Select", type: "revolving", investment: 200, investmentLabel: "$200 deposit", badge: null, bureaus: ["Equifax", "Experian", "TransUnion"], bureauNote: null, highlights: ["1% cash back rewards", "Lower annual fee", "Deposit: $200–$2,000 (up to $5,000)", "Bankruptcy OK — won't be declined", "All credit types welcome", "Reports to all 3 bureaus"], description: "Secured card with 1% cash back and lower annual fee. Discharged bankruptcy will not cause decline.", url: "https://apply.creditcardbroker.com/aff_c?offer_id=128&aff_id=7635", warn: null, priority: 12 },
  { id: "firstprogress-prestige", name: "First Progress Platinum Prestige", type: "revolving", investment: 200, investmentLabel: "$200 deposit", badge: null, bureaus: ["Equifax", "Experian", "TransUnion"], bureauNote: null, highlights: ["1% cash back rewards", "90-day deposit funding option", "Bankruptcy OK — won't be declined", "Debit card funding available", "All credit types welcome", "Reports to all 3 bureaus"], description: "Prestige tier with 1% cash back. Fund deposit over 90 days. Past credit issues welcome.", url: "https://apply.creditcardbroker.com/aff_c?offer_id=130&aff_id=7635", warn: null, priority: 13 },
  { id: "opensky300", name: "OpenSky Secured Card ($300)", type: "revolving", investment: 300, investmentLabel: "$300 deposit", badge: "$0 ANNUAL FEE", bureaus: ["Equifax", "Experian", "TransUnion"], bureauNote: null, highlights: ["$0 annual fee", "Up to 10% cash back", "89% approval rate — no credit check", "Avg 47-point increase in 6 months", "Free FICO® score in app", "60-day deposit layaway"], description: "No annual fee OpenSky card with $300 deposit. Same great benefits — no credit check, up to 10% cash back.", url: "https://apply.creditcardbroker.com/aff_c?offer_id=402&aff_id=7635", warn: null, priority: 14 }
];

function getRecommendation(totalBudget) {
  const sorted = [...creditBuilders].sort((a, b) => a.investment - b.investment || a.priority - b.priority);
  let remaining = totalBudget;
  const selected = [];
  const used = new Set();
  const installments = sorted.filter(p => p.type === "installment" || p.type === "both");
  for (const p of installments) {
    if (remaining >= p.investment && !used.has(p.id)) { selected.push(p); used.add(p.id); remaining -= p.investment; }
  }
  const revolving = sorted.filter(p => p.type === "revolving" || p.type === "both");
  for (const p of revolving) {
    if (remaining >= p.investment && !used.has(p.id)) { selected.push(p); used.add(p.id); remaining -= p.investment; }
  }
  selected.sort((a, b) => a.investment - b.investment || a.priority - b.priority);
  const totalSpent = totalBudget - remaining;
  const revCount = selected.filter(p => p.type === "revolving" || p.type === "both").length;
  const instCount = selected.filter(p => p.type === "installment" || p.type === "both").length;
  return { selected, remaining, totalSpent, revCount, instCount };
}

function TypeBadge({ type }) {
  const config = { revolving: { label: "REVOLVING", bg: "#D6E8FF", color: BRAND.primary, border: "#A3CCFF" }, installment: { label: "INSTALLMENT", bg: "#FEF3C7", color: "#7A5D00", border: "#FCD34D" }, both: { label: "REVOLVING + INSTALLMENT", bg: "#E8D5F5", color: "#5B21B6", border: "#C4B5FD" } };
  const c = config[type];
  return <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: "4px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.05em", background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>{c.label}</span>;
}

function BureauDots({ bureaus }) {
  return <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>{bureaus.map((b, i) => <span key={i} style={{ display: "inline-block", padding: "2px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: 600, background: "#EDF2F7", color: "#4A5568", border: "1px solid #E2E8F0" }}>{b}</span>)}</div>;
}

function ProductCard({ product, expanded, onToggle, copiedLink, onCopy, recommended }) {
  return (
    <div style={{ background: "white", borderRadius: "14px", border: recommended ? `2px solid ${BRAND.primary}30` : expanded ? `2px solid ${BRAND.primary}22` : "1px solid #E2E8F0", overflow: "hidden", transition: "all 0.25s ease", boxShadow: expanded ? `0 8px 30px ${BRAND.primary}0D` : recommended ? `0 2px 12px ${BRAND.primary}0A` : "0 1px 3px rgba(0,0,0,0.04)", position: "relative" }}>
      {recommended && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.accent})` }} />}
      <div onClick={onToggle} style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "6px" }}>
            {recommended && <span style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "9px", fontWeight: 700, background: `${BRAND.primary}12`, color: BRAND.primary, letterSpacing: "0.05em" }}>✦ RECOMMENDED</span>}
            <h4 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#0F172A" }}>{product.name}</h4>
            <TypeBadge type={product.type} />
            {product.badge && <span style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "9px", fontWeight: 700, background: `${BRAND.gold}22`, color: "#7A5D00", letterSpacing: "0.05em", border: `1px solid ${BRAND.gold}44` }}>{product.badge}</span>}
          </div>
          <BureauDots bureaus={product.bureaus} />
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: "18px", fontWeight: 800, color: BRAND.primary, fontFamily: "'Playfair Display', serif" }}>{product.investmentLabel}</div>
          <div style={{ fontSize: "18px", transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.25s", color: "#94A3B8" }}>▾</div>
        </div>
      </div>
      {expanded && (
        <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${BRAND.primary}0A` }}>
          <p style={{ margin: "16px 0 12px", fontSize: "13px", lineHeight: 1.7, color: "#475569" }}>{product.description}</p>
          {product.bureauNote && <p style={{ margin: "0 0 12px", fontSize: "11px", color: "#94A3B8", fontStyle: "italic" }}>📌 {product.bureauNote}</p>}
          {product.warn && <div style={{ background: "#FEF3C7", border: "1px solid #FCD34D", borderRadius: "8px", padding: "10px 14px", fontSize: "12px", color: "#92400E", marginBottom: "12px", fontWeight: 500 }}>{product.warn}</div>}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginBottom: "16px" }}>
            {product.highlights.map((h, i) => <div key={i} style={{ fontSize: "12px", color: "#475569", padding: "6px 10px", background: "#F7FAFC", borderRadius: "6px", display: "flex", alignItems: "flex-start", gap: "6px" }}><span style={{ color: BRAND.accent, flexShrink: 0, fontWeight: 700 }}>✓</span>{h}</div>)}
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <a href={product.url} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: "block", textAlign: "center", padding: "11px", background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primaryLight})`, color: "white", borderRadius: "8px", textDecoration: "none", fontSize: "13px", fontWeight: 700 }}>Open Link →</a>
            <button onClick={(e) => { e.stopPropagation(); onCopy(); }} style={{ padding: "11px 16px", background: copiedLink ? "#059669" : "#EDF2F7", color: copiedLink ? "white" : "#475569", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}>{copiedLink ? "Copied! ✓" : "Copy Link"}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ASAPProductHub() {
  const [activeTab, setActiveTab] = useState("advisor");
  const [budget, setBudget] = useState(150);
  const [budgetInput, setBudgetInput] = useState("150");
  const [typeFilter, setTypeFilter] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);
  const [copiedLink, setCopiedLink] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);
  useEffect(() => { setTimeout(() => setAnimateIn(true), 80); }, []);

  const recommendation = useMemo(() => getRecommendation(budget), [budget]);

  const handleBudgetInput = (val) => {
    setBudgetInput(val);
    const num = parseInt(val.replace(/[^0-9]/g, ""), 10);
    if (!isNaN(num) && num >= 0) setBudget(Math.min(num, 5000));
  };
  const handleSlider = (val) => { setBudget(val); setBudgetInput(String(val)); };

  const allFiltered = creditBuilders.filter(p => {
    if (typeFilter === "all") return true;
    return p.type === typeFilter || p.type === "both";
  });

  const copyLink = (url, id) => { navigator.clipboard.writeText(url).then(() => { setCopiedLink(id); setTimeout(() => setCopiedLink(null), 2000); }); };
  const tabItems = [{ key: "advisor", icon: "🎯", label: "Client Advisor" }, { key: "monitoring", icon: "📊", label: "Credit Monitoring" }, { key: "builders", icon: "🏗️", label: "All Products" }];

  return (
    <div style={{ minHeight: "100vh", background: BRAND.bg, fontFamily: "'DM Sans', sans-serif", opacity: animateIn ? 1 : 0, transition: "opacity 0.5s ease" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet" />

      <div style={{ background: `linear-gradient(145deg, ${BRAND.primaryDark} 0%, ${BRAND.primary} 45%, ${BRAND.primaryLight} 100%)`, padding: "28px 24px 22px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-50px", right: "-30px", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: "-40px", left: "15%", width: "140px", height: "140px", borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "10px" }}>
            <img src="https://asapcreditrepairusa.com/images/logo.png" alt="ASAP Credit Repair" style={{ width: "56px", height: "56px", borderRadius: "12px", objectFit: "contain", background: "rgba(255,255,255,0.12)", padding: "4px" }} onError={(e) => { e.target.style.display = 'none'; }} />
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", marginBottom: "2px" }}>ASAP CREDIT REPAIR USA</div>
              <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 800, color: "white", fontFamily: "'Playfair Display', serif" }}>Product & Monitoring Hub</h1>
            </div>
          </div>
          <p style={{ margin: "6px 0 0", fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.5, maxWidth: "620px" }}>
            Help clients build <span style={{ color: "#7DB8FF", fontWeight: 700 }}>4+ revolving</span> and <span style={{ color: "#FFD166", fontWeight: 700 }}>3+ installment</span> accounts. Enter their budget for instant recommendations.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", background: "white", borderRadius: "0 0 14px 14px", overflow: "hidden", boxShadow: `0 2px 8px ${BRAND.primary}0A`, display: "flex" }}>
        {tabItems.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
            flex: 1, padding: "14px 16px", border: "none",
            borderBottom: activeTab === t.key ? `3px solid ${BRAND.primary}` : "3px solid transparent",
            background: activeTab === t.key ? `${BRAND.primary}08` : "transparent",
            color: activeTab === t.key ? BRAND.primary : "#94A3B8",
            fontWeight: activeTab === t.key ? 700 : 500, fontSize: "13px", cursor: "pointer", transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif"
          }}>{t.icon} {t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px 16px 48px" }}>

        {activeTab === "advisor" && (
          <div>
            <div style={{ background: "white", borderRadius: "16px", padding: "24px", marginBottom: "20px", border: "1px solid #E2E8F0", boxShadow: `0 2px 8px ${BRAND.primary}06` }}>
              <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: 700, color: "#0F172A" }}>How much can the client invest?</h3>
              <p style={{ margin: "0 0 20px", fontSize: "12px", color: "#94A3B8" }}>Enter their total available budget and we'll recommend the best combination of products</p>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                <div style={{ position: "relative", flex: "0 0 auto" }}>
                  <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "28px", fontWeight: 800, color: BRAND.primary, fontFamily: "'Playfair Display', serif" }}>$</span>
                  <input type="text" value={budgetInput} onChange={(e) => handleBudgetInput(e.target.value)} placeholder="150" style={{ width: "180px", padding: "14px 16px 14px 38px", fontSize: "28px", fontWeight: 800, fontFamily: "'Playfair Display', serif", color: BRAND.primary, border: `2px solid ${BRAND.primary}30`, borderRadius: "12px", outline: "none", background: `${BRAND.primary}04` }} onFocus={(e) => e.target.style.borderColor = BRAND.primary} onBlur={(e) => e.target.style.borderColor = `${BRAND.primary}30`} />
                </div>
                <div style={{ flex: 1 }}>
                  <input type="range" min="5" max="1000" value={Math.min(budget, 1000)} onChange={(e) => handleSlider(Number(e.target.value))} style={{ width: "100%", height: "8px", borderRadius: "4px", appearance: "none", background: `linear-gradient(to right, ${BRAND.primary} 0%, ${BRAND.primary} ${((Math.min(budget, 1000) - 5) / 995) * 100}%, #E2E8F0 ${((Math.min(budget, 1000) - 5) / 995) * 100}%, #E2E8F0 100%)`, outline: "none", cursor: "pointer" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
                    {[25, 50, 100, 150, 200, 300, 500].map(m => (
                      <button key={m} onClick={() => handleSlider(m)} style={{ background: budget === m ? BRAND.primary : "#EDF2F7", color: budget === m ? "white" : "#64748B", border: "none", borderRadius: "6px", padding: "4px 8px", fontSize: "10px", fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}>${m}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: `linear-gradient(135deg, ${BRAND.primary}06, ${BRAND.accent}04)`, borderRadius: "16px", padding: "20px", marginBottom: "20px", border: `1px solid ${BRAND.primary}15` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <span style={{ fontSize: "20px" }}>🎯</span>
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#0F172A" }}>Recommended Plan for ${budget} Budget</h3>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px", marginBottom: "16px" }}>
                <div style={{ background: "white", borderRadius: "10px", padding: "12px", textAlign: "center", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: BRAND.primary, fontFamily: "'Playfair Display', serif" }}>{recommendation.selected.length}</div>
                  <div style={{ fontSize: "10px", color: "#64748B", fontWeight: 600 }}>Total Products</div>
                </div>
                <div style={{ background: "white", borderRadius: "10px", padding: "12px", textAlign: "center", border: `2px solid ${recommendation.revCount >= 4 ? "#86EFAC" : "#FDBA74"}` }}>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: recommendation.revCount >= 4 ? "#059669" : "#EA580C", fontFamily: "'Playfair Display', serif" }}>{recommendation.revCount}<span style={{ fontSize: "11px", fontWeight: 500, color: "#94A3B8" }}>/4+</span></div>
                  <div style={{ fontSize: "10px", color: "#64748B", fontWeight: 600 }}>Revolving {recommendation.revCount >= 4 ? "✅" : "⚠️"}</div>
                </div>
                <div style={{ background: "white", borderRadius: "10px", padding: "12px", textAlign: "center", border: `2px solid ${recommendation.instCount >= 3 ? "#86EFAC" : "#FDBA74"}` }}>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: recommendation.instCount >= 3 ? "#059669" : "#EA580C", fontFamily: "'Playfair Display', serif" }}>{recommendation.instCount}<span style={{ fontSize: "11px", fontWeight: 500, color: "#94A3B8" }}>/3+</span></div>
                  <div style={{ fontSize: "10px", color: "#64748B", fontWeight: 600 }}>Installment {recommendation.instCount >= 3 ? "✅" : "⚠️"}</div>
                </div>
                <div style={{ background: "white", borderRadius: "10px", padding: "12px", textAlign: "center", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: recommendation.remaining > 0 ? "#059669" : "#94A3B8", fontFamily: "'Playfair Display', serif" }}>${recommendation.remaining}</div>
                  <div style={{ fontSize: "10px", color: "#64748B", fontWeight: 600 }}>Remaining</div>
                </div>
              </div>
              <div style={{ background: "white", borderRadius: "10px", padding: "12px 16px", border: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "#475569", fontWeight: 500 }}>💰 Total: <strong style={{ color: BRAND.primary }}>${recommendation.totalSpent}</strong> of ${budget}</span>
                <div style={{ width: "120px", height: "8px", borderRadius: "4px", background: "#E2E8F0", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: "4px", background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.accent})`, width: `${Math.min((recommendation.totalSpent / budget) * 100, 100)}%`, transition: "width 0.3s ease" }} />
                </div>
              </div>
            </div>

            {recommendation.selected.length === 0 ? (
              <div style={{ background: "white", borderRadius: "16px", padding: "48px 24px", textAlign: "center", border: "1px solid #E2E8F0" }}>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>💸</div>
                <h3 style={{ margin: 0, color: "#0F172A" }}>Budget too low</h3>
                <p style={{ color: "#94A3B8", fontSize: "13px" }}>The minimum product starts at $5/mo (Kikoff). Increase the budget to see recommendations.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {recommendation.selected.map(p => (
                  <ProductCard key={p.id} product={p} expanded={expandedCard === p.id} onToggle={() => setExpandedCard(expandedCard === p.id ? null : p.id)} copiedLink={copiedLink === p.id} onCopy={() => copyLink(p.url, p.id)} recommended={true} />
                ))}
                {(recommendation.revCount < 4 || recommendation.instCount < 3) && (
                  <div style={{ background: "linear-gradient(135deg, #FEF3C7, #FFFBEB)", borderRadius: "12px", padding: "16px 20px", border: "1px solid #FDE68A" }}>
                    <p style={{ margin: 0, fontSize: "13px", color: "#92400E", lineHeight: 1.6, fontWeight: 500 }}>
                      💡 <strong>Tip:</strong> With ${budget}, the client can open {recommendation.selected.length} product{recommendation.selected.length !== 1 ? "s" : ""}.
                      {recommendation.revCount < 4 && ` They need ${4 - recommendation.revCount} more revolving account${4 - recommendation.revCount !== 1 ? "s" : ""} to hit the 4+ goal.`}
                      {recommendation.instCount < 3 && ` They need ${3 - recommendation.instCount} more installment account${3 - recommendation.instCount !== 1 ? "s" : ""} to hit the 3+ goal.`}
                      {" "}Consider increasing their budget or adding products over time.
                    </p>
                  </div>
                )}
                {recommendation.revCount >= 4 && recommendation.instCount >= 3 && (
                  <div style={{ background: "linear-gradient(135deg, #DCFCE7, #F0FDF4)", borderRadius: "12px", padding: "16px 20px", border: "1px solid #86EFAC" }}>
                    <p style={{ margin: 0, fontSize: "13px", color: "#166534", lineHeight: 1.6, fontWeight: 500 }}>
                      🎉 <strong>Great news!</strong> This plan meets both goals — {recommendation.revCount} revolving and {recommendation.instCount} installment accounts! ${recommendation.remaining} remaining.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === "monitoring" && (
          <div>
            <div style={{ background: `linear-gradient(135deg, ${BRAND.primary}08, ${BRAND.accent}08)`, borderRadius: "14px", padding: "20px", marginBottom: "20px", border: `1px solid ${BRAND.primary}15` }}>
              <h3 style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: 700, color: "#0F172A" }}>📊 Credit Monitoring Services</h3>
              <p style={{ margin: 0, fontSize: "12px", color: "#64748B", lineHeight: 1.5 }}>Listed in order of recommendation. Every client should have credit monitoring set up.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {creditMonitoring.map((s, i) => (
                <div key={s.id} style={{ background: "white", borderRadius: "14px", padding: "20px", border: i === 0 ? `2px solid ${BRAND.primary}25` : "1px solid #E2E8F0", boxShadow: i === 0 ? `0 4px 20px ${BRAND.primary}10` : "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0, background: i === 0 ? BRAND.primary : i === 1 ? `${BRAND.primary}15` : "#F1F5F9", color: i === 0 ? "white" : i === 1 ? BRAND.primary : "#64748B", fontSize: "13px", fontWeight: 800 }}>#{s.rank}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
                        <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#0F172A" }}>{s.name}</h4>
                        {s.badge && <span style={{ padding: "3px 10px", borderRadius: "6px", fontSize: "10px", fontWeight: 700, background: `${BRAND.primary}12`, color: BRAND.primary, letterSpacing: "0.05em" }}>{s.badge}</span>}
                      </div>
                      <p style={{ margin: "0 0 14px", fontSize: "13px", lineHeight: 1.6, color: "#475569" }}>{s.description}</p>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "9px 22px", background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primaryLight})`, color: "white", borderRadius: "8px", textDecoration: "none", fontSize: "12px", fontWeight: 700 }}>Open Link →</a>
                        <button onClick={() => copyLink(s.url, s.id)} style={{ padding: "9px 14px", background: copiedLink === s.id ? "#059669" : "#EDF2F7", color: copiedLink === s.id ? "white" : "#475569", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}>{copiedLink === s.id ? "Copied! ✓" : "Copy Link"}</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "builders" && (
          <div>
            <div style={{ background: `linear-gradient(135deg, ${BRAND.gold}12, ${BRAND.gold}08)`, borderRadius: "14px", padding: "20px", marginBottom: "20px", border: `1px solid ${BRAND.gold}30` }}>
              <h3 style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: 700, color: "#0F172A" }}>🏗️ All Credit Building Products</h3>
              <p style={{ margin: "0 0 12px", fontSize: "12px", color: "#64748B", lineHeight: 1.5 }}>Complete catalog sorted by investment. Use Client Advisor tab for smart budget recommendations.</p>
              <div style={{ display: "flex", gap: "8px" }}>
                {[{ val: "all", label: "All" }, { val: "revolving", label: "Revolving" }, { val: "installment", label: "Installment" }].map(f => (
                  <button key={f.val} onClick={() => setTypeFilter(f.val)} style={{ padding: "6px 14px", borderRadius: "8px", border: typeFilter === f.val ? `2px solid ${BRAND.primary}` : "1px solid #E2E8F0", background: typeFilter === f.val ? `${BRAND.primary}08` : "white", color: typeFilter === f.val ? BRAND.primary : "#64748B", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>{f.label}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "20px" }}>
              <div style={{ background: "#D6E8FF", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                <div style={{ fontSize: "22px", fontWeight: 800, color: BRAND.primary }}>{allFiltered.filter(p => p.type === "revolving" || p.type === "both").length}</div>
                <div style={{ fontSize: "11px", color: BRAND.primary, fontWeight: 600 }}>Revolving</div>
              </div>
              <div style={{ background: "#FEF3C7", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                <div style={{ fontSize: "22px", fontWeight: 800, color: "#7A5D00" }}>{allFiltered.filter(p => p.type === "installment" || p.type === "both").length}</div>
                <div style={{ fontSize: "11px", color: "#D97706", fontWeight: 600 }}>Installment</div>
              </div>
              <div style={{ background: "#DCFCE7", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                <div style={{ fontSize: "22px", fontWeight: 800, color: "#059669" }}>$5–$300</div>
                <div style={{ fontSize: "11px", color: "#10B981", fontWeight: 600 }}>Range</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {allFiltered.map(p => <ProductCard key={p.id + "-b"} product={p} expanded={expandedCard === p.id + "-b"} onToggle={() => setExpandedCard(expandedCard === p.id + "-b" ? null : p.id + "-b")} copiedLink={copiedLink === p.id + "-b"} onCopy={() => copyLink(p.url, p.id + "-b")} recommended={false} />)}
            </div>
          </div>
        )}

        <div style={{ marginTop: "32px", padding: "16px 20px", background: `linear-gradient(135deg, ${BRAND.gold}15, ${BRAND.gold}08)`, borderRadius: "12px", border: `1px solid ${BRAND.gold}35` }}>
          <p style={{ margin: 0, fontSize: "12px", color: "#7A5D00", lineHeight: 1.6, fontWeight: 500 }}>⚠️ <strong>IMPORTANT:</strong> Do NOT manually pull links from any external page. Always use the links provided in this hub. All links are from our automated feed.</p>
        </div>
        <div style={{ textAlign: "center", marginTop: "24px", opacity: 0.4 }}>
          <img src="https://asapcreditrepairusa.com/images/logo.png" alt="" style={{ width: "28px", height: "28px", objectFit: "contain", marginBottom: "4px" }} onError={(e) => { e.target.style.display = 'none'; }} />
          <div style={{ fontSize: "10px", color: "#94A3B8", fontWeight: 500 }}>ASAP Credit Repair USA © 2025</div>
        </div>
      </div>
    </div>
  );
}
