"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronRight, FileText, Globe, LockKeyhole, MessageCircle, Send, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./TradeFlow.module.css";

const stages = [
  { label: "Message", title: "One request. Either channel.", description: "An X mention or a Telegram message starts the same process.", seconds: 2.5 },
  { label: "Match token", title: "Same ticker. Which token?", description: "A ticker alone isn’t unique. TagTradeX asks you to identify the issuer before continuing.", seconds: 4.8 },
  { label: "Tinyfish", title: "Research before the request proceeds.", description: "Tinyfish reads the project’s website and public docs, then brings a short summary into the conversation.", seconds: 4 },
  { label: "Checks", title: "Every request gets checked.", description: "The account, amount, daily budget, and activity must all pass.", seconds: 4.2 },
  { label: "If blocked", title: "One failed check stops the trade.", description: "A blocked request gets an explanation, not a purchase reply.", seconds: 4.5 },
  { label: "Confirmation", title: "When all checks pass, you decide.", description: "With extra confirmation on, your yes applies only to this exact pending request.", seconds: 4.5 },
  { label: "Reply", title: "Back to the same conversation.", description: "The trade outcome returns to your X thread or Telegram chat.", seconds: 5 },
];
const guardrails = [
  ["Account authorized", "The request belongs to your authorized account."],
  ["Within the trade cap", "1 XRP requested · 10 XRP maximum"],
  ["Within your daily budget", "32 spent + 1 requested · 40 XRP budget"],
  ["Activity checked", "Repeated or unusual requests can pause for review."],
];

export function TradeFlow() {
  const [step, setStep] = useState(0);
  const [inView, setInView] = useState(false);
  const [entered, setEntered] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const scope = useRef<HTMLElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const clock = useRef<gsap.core.Tween | null>(null);
  const motion = useRef<gsap.core.Timeline | null>(null);
  const active = entered && inView && visible && !reduced;
  const stage = stages[step];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    if (scope.current) observer.observe(scope.current);
    const entryObserver = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setEntered(true); entryObserver.disconnect(); } }, { threshold: 0.25 });
    const engine = scope.current?.querySelector("[data-flow-engine]");
    if (engine) entryObserver.observe(engine);
    const visibility = () => setVisible(document.visibilityState === "visible");
    visibility(); document.addEventListener("visibilitychange", visibility);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update(); preference.addEventListener("change", update);
    return () => { observer.disconnect(); entryObserver.disconnect(); document.removeEventListener("visibilitychange", visibility); preference.removeEventListener("change", update); };
  }, []);

  useGSAP(() => {
    if (reduced) return;
    const playhead = { value: 0 };
    if (progress.current) progress.current.style.transform = "scaleX(0)";
    clock.current = gsap.to(playhead, { value: 1, duration: stages[step].seconds, ease: "none", paused: true,
      onUpdate: () => { if (progress.current) progress.current.style.transform = `scaleX(${playhead.value})`; },
      onComplete: () => setStep(current => (current + 1) % stages.length),
    });
    motion.current = gsap.timeline({ paused: true })
      .fromTo("[data-flow-detail]", { y: 8, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" })
      .fromTo("[data-flow-item]", { opacity: 0.25, x: 7 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.16 }, 0.15)
      .fromTo("[data-flow-packet]", { left: "0%", opacity: 0 }, { left: "100%", opacity: 1, duration: 1.2, ease: "power1.inOut", repeat: 1, repeatDelay: 0.3 }, 0);
    if (step === 1) motion.current.fromTo("[data-token-choice]", { borderColor: "#404040", backgroundColor: "#171717" }, { borderColor: "#d4d4d4", backgroundColor: "#262626", duration: 0.5 }, 2.3).fromTo("[data-choice-check]", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 2.4);
    return () => { clock.current = null; motion.current = null; };
  }, { scope, dependencies: [step, reduced], revertOnUpdate: true });

  useEffect(() => { clock.current?.paused(!active); motion.current?.paused(!active); }, [active, step, reduced]);

  return <section id="trade-flow" ref={scope} className="py-16 lg:py-24" aria-labelledby="trade-flow-title">
    <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div><p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Inside TagTradeX</p><h2 id="trade-flow-title" className="section-heading">Two ways in. One checked trade.</h2></div>
    </div>
    <div className={styles.shell}>
      <div className={styles.toolbar}><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">A $DAWN example · from message to reply</span><span className={styles.stepCount}>{reduced ? "THE SHARED FLOW" : `0${step + 1} / 07`}</span></div>
      <div className={styles.diagram}>
        <div className={styles.entry}>
          <p className={styles.eyebrow}>01 / Your message</p>
          <div className={styles.message}><span className={styles.channel}>𝕏 <span>X</span></span><p><span className="text-muted-foreground">@tagtradex</span><br />buy 1 XRP of $DAWN</p></div>
          <span className={styles.or}>or</span>
          <div className={styles.message}><span className={styles.channel}><Send size={16} /><span>Telegram</span></span><p>Buy 1 XRP<br />of $DAWN</p></div>
          <p className={styles.small}>Same account. Same limits.</p>
        </div>
        <div className={styles.connector} aria-hidden="true"><span data-flow-packet /><ChevronRight size={15} /></div>
        <div data-flow-engine className={styles.engine}>
          <div className={styles.engineHeader}><span className={styles.eyebrow}>02 / Understand & check</span></div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/tagtradex-lockup-white.svg" alt="TagTradeX" width="135" height="20" className="h-5 w-auto" /><span className="mx-1 text-muted-foreground">+</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/tinyfish-icon.svg" alt="" width="25" height="25" /><span>Tinyfish</span>
          </div>
          {reduced ? <div className={styles.staticSummary}><h3>From a message to a checked trade.</h3><ol><li><strong>Identify the token.</strong> Match ticker and issuer. Ask when the name is ambiguous or unknown.</li><li><strong>Research with Tinyfish.</strong> Summarize the project’s website and public docs.</li><li><strong>Check the request.</strong> Account authorization, 10 XRP trade cap, daily budget, and activity checks.</li><li><strong>Stop if a check fails.</strong> Explain what needs attention.</li><li><strong>Confirm, if enabled.</strong> Your yes approves only your exact request. Turning this off keeps the checks.</li><li><strong>Reply where you started.</strong> The same X thread or Telegram chat.</li></ol></div> : <div className={styles.detail} data-flow-detail key={step}>
            <h3>{stage.title}</h3><p className={styles.description}>{stage.description}</p>
            {step === 0 && <div className={styles.request} data-flow-item><MessageCircle size={18} /><span>BUY · $DAWN · 1 XRP</span><ArrowRight size={16} /></div>}
            {step === 1 && <div className="mt-5 grid gap-2"><div data-flow-item data-token-choice className={styles.token}><span>$DAWN · Dawn<small>Issuer A · example user choice</small></span><Check data-choice-check size={17} /></div><div data-flow-item className={styles.token}><span>$DAWN · Dawn Labs<small>Issuer B · a different token</small></span></div><p className={styles.small}>No exact match? Ask for the ticker and issuer. Never guess.</p></div>}
            {step === 2 && <div className="mt-5 grid gap-3"><div data-flow-item className="flex gap-3 text-muted-foreground"><Globe size={18} /><FileText size={18} /><span className="text-xs">Project website → public docs → summary</span></div><div data-flow-item className={styles.finding}><span className={styles.eyebrow}>Dawn · Issuer A · example finding</span><p className="mt-2 text-sm leading-6">A community token for a creator collective.</p></div><p className={styles.small}>Research helps you understand the project. It is not a token endorsement.</p></div>}
            {step === 3 && <ul className={styles.checks}>{guardrails.map(([label, detail]) => <li data-flow-item key={label}><Check size={16} /><span><strong>{label}</strong><small>{detail}</small></span></li>)}</ul>}
            {step === 4 && <ul className={styles.checks}>{[["No account authorization", "Ask the user to connect and authorize."], ["12 XRP request / 10 XRP cap", "Stop. Don’t split the request to bypass the cap."], ["Daily budget exhausted", "Stop until the request fits the budget."], ["Repeated or unusual requests", "Hold for review before proceeding."]].map(([label, detail]) => <li data-flow-item key={label}><X size={16} /><span><strong>{label}</strong><small>{detail}</small></span></li>)}</ul>}
            {step === 5 && <div className="mt-5 grid gap-3"><div data-flow-item className={styles.finding}><span className="font-mono text-sm">Buy 1 XRP of $DAWN · Issuer A</span><p className="mt-2 text-sm">Example user reply: <strong>yes</strong></p></div><div data-flow-item className={styles.finding}><span className="text-sm">Extra confirmation off?</span><p className={styles.small}>Continue after the checks. Trade caps, daily limits, and activity checks still apply.</p></div><p className={styles.small}>Another account’s yes, or a yes for an old request, cannot approve this trade.</p></div>}
            {step === 6 && <div className="mt-6 grid gap-4"><div data-flow-item className={styles.request}><Check size={21} /><span>Matched → researched → checked → confirmed</span></div><p data-flow-item className={styles.small}>A successful request gets a purchase reply. A stopped request gets a clear reason instead.</p></div>}
          </div>}
          {!reduced && <div className={styles.progressTrack} aria-hidden="true"><div ref={progress} /></div>}
        </div>
        <div className={styles.connector} aria-hidden="true"><span data-flow-packet /><ChevronRight size={15} /></div>
        <div className={styles.exit}>
          <p className={styles.eyebrow}>03 / Back to you</p>
          <div className={`${styles.receipt} ${step >= 4 || reduced ? styles.receiptReady : ""}`}>
            <span className={styles.receiptIcon}>{step === 4 && !reduced ? <LockKeyhole size={27} /> : step === 6 || reduced ? <Check size={27} /> : <MessageCircle size={27} />}</span>
            <h3>{reduced ? "A clear outcome" : step === 4 ? "Request stopped" : step === 5 ? "Passing request" : step === 6 ? "Trade reply" : "Your reply"}</h3>
            <p>{reduced ? "A purchase reply, or a reason the request was stopped." : step === 4 ? "Nothing proceeds until the failed check is resolved." : step === 5 ? "Checks passed. Waiting for your yes when enabled." : step === 6 ? "Bought $DAWN with 1 XRP." : "The outcome follows the checks."}</p>
            {step === 6 && !reduced && <span className={styles.small}>Dawn · Issuer A</span>}
          </div>
          <p className={styles.small}>Your X thread or Telegram chat.</p>
        </div>
      </div>
      <div className={styles.bottom}><ol className={styles.stageLabels} aria-label="Trade flow">{stages.map((item, index) => <li key={item.label} data-active={!reduced && index === step}><span>0{index + 1}</span>{item.label}</li>)}</ol></div>
    </div>
  </section>;
}
