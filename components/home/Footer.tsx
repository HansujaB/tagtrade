"use client";

import { useId, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const scope = useRef<HTMLElement>(null);
  const id = useId().replace(/:/g, "");
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-footer-column]", { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: scope.current, start: "top 88%", once: true } });
      gsap.fromTo("[data-footer-mark]", { y: 80, opacity: 0.2 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: "[data-footer-mark]", start: "top 98%", once: true } });
      gsap.fromTo("[data-footer-beam]", { attr: { x: -500 } }, { attr: { x: 1250 }, duration: 4.5, repeat: -1, repeatDelay: 1.5, ease: "sine.inOut", scrollTrigger: { trigger: scope.current, start: "top bottom", end: "bottom top", toggleActions: "play pause resume pause" } });
    });
    return () => media.revert();
  }, { scope });
  const groups = [
    { title: "Explore", links: [["How it works", "#how-it-works"], ["Trading on X", "#x-example"], ["Your controls", "#controls"]] },
    { title: "Build", links: [["Launch a token", "#launch"], ["XRP Ledger", "https://xrpl.org/"], ["Tinyfish", "https://www.tinyfish.ai/"]] },
  ];
  return <footer ref={scope} className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#101411] pt-16 pb-6">
    <div className="mx-auto max-w-[1360px] px-6 lg:px-12">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.45fr_1fr_1fr_1fr]">
        <div data-footer-column>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/tagtradex-lockup-white.svg" alt="TagTradeX" width="162" height="24" className="h-7 w-auto" />
          <a href="https://www.tinyfish.ai/" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm text-[#bcc4bd] hover:text-white">Built with
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/tinyfish-icon.svg" alt="" width="28" height="28" /><span>Tinyfish</span>
          </a>
          <p className="mt-6 text-sm text-[#bcc4bd]">Trading on the XRP Ledger.</p>
          <p className="mt-10 font-mono text-xs text-[#8d998f]">© {new Date().getFullYear()} TagTradeX</p>
        </div>
        {groups.map(group => <nav data-footer-column key={group.title} aria-label={group.title}>
          <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#8d998f]">{group.title}</h3>
          <div className="flex flex-col items-start">{group.links.map(([label, href]) => <Button key={label} render={<a href={href} />} variant="link" className="min-h-11 px-0 font-normal text-[#c5cec7] hover:text-white">{label}</Button>)}</div>
        </nav>)}
        <div data-footer-column><h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#8d998f]">One message away</h3><p className="max-w-[210px] text-sm leading-7 text-[#c5cec7]">Buy, sell, and launch.<br />From X or Telegram.</p><Button render={<a href="#top" />} variant="link" className="mt-5 min-h-11 px-0 font-normal text-[#c5cec7]">Back to top ↗</Button></div>
      </div>
      <svg data-footer-mark viewBox="0 0 1200 290" role="img" aria-label="TagTradeX" className="mt-16 w-full overflow-visible sm:mt-24">
        <defs>
          <pattern id={`${id}-dots`} width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1.5" fill="white" /></pattern>
          <mask id={`${id}-mask`}><text x="0" y="238" fontSize="240" fontWeight="500" letterSpacing="-14" textLength="1180" lengthAdjust="spacingAndGlyphs" fill={`url(#${id}-dots)`}>TagTradeX</text></mask>
          <linearGradient id={`${id}-light`}><stop offset="0" stopColor="white" stopOpacity="0" /><stop offset="0.5" stopColor="#edf8ed" /><stop offset="1" stopColor="white" stopOpacity="0" /></linearGradient>
        </defs>
        <g mask={`url(#${id}-mask)`}><rect width="1200" height="290" fill="#566b5c" /><rect data-footer-beam x="-500" width="500" height="290" fill={`url(#${id}-light)`} /></g>
      </svg>
    </div>
  </footer>;
}
