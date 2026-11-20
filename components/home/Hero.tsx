"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GlassCursor } from "./GlassCursor";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const scope = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !scope.current) return;
    gsap.timeline()
      .fromTo("[data-hero-media]", { scale: 1.055, opacity: 0.65 }, { scale: 1, opacity: 1, duration: 1.25, ease: "power2.out" })
      .fromTo("[data-hero-copy]", { y: 19, opacity: 0.85 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.11, ease: "power3.out", clearProps: "all" }, 0.18);
    gsap.to("[data-hero-media]", {
      yPercent: 9,
      ease: "none",
      scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: 0.8 },
    });
  }, { scope });

  return <section ref={scope} className="relative flex min-h-[700px] flex-col justify-center overflow-hidden bg-black py-24 lg:min-h-[760px] lg:py-32">
    <div data-hero-media className="absolute inset-0">
      <Image data-hero-image src="/hero-ledger-glass.webp" alt="" fill priority sizes="100vw" className="object-cover object-center" />
      <GlassCursor />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
    </div>
    <div className="landing-wide relative z-10">
      <div className="max-w-[930px]">
      <h1 data-hero-copy className="font-heading text-[clamp(2.75rem,4.4vw,4rem)] font-medium leading-[1.05] tracking-[-0.045em]">
        Buy, sell, and launch<br className="hidden sm:block" /> tokens from a message.
      </h1>
      <p data-hero-copy className="mt-8 max-w-[550px] text-base sm:text-lg leading-[1.55] text-[#c4c4c4]">Trade on the XRP Ledger through X or Telegram. Tinyfish researches the token before you trade.</p>
      <div data-hero-copy className="mt-10 flex flex-wrap gap-3">
        <Button nativeButton={false} render={<a href="#x-example" />} size="lg" className="min-h-12 rounded-sm px-5">See X example <ArrowDownRight data-icon="inline-end" /></Button>
        <Button nativeButton={false} render={<a href="#launch" />} size="lg" variant="outline" className="min-h-12 rounded-sm border-white/35 bg-black/45 px-5">Explore launch <ArrowUpRight data-icon="inline-end" /></Button>
      </div>
      <div data-hero-copy className="mt-20 flex flex-wrap items-center gap-x-10 gap-y-6 text-sm text-[#c4c4c4]">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/xrpl-ledger.svg" alt="XRP Ledger" width="125" height="15" className="h-[18px] w-auto brightness-0 invert" />
        </div>
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/tinyfish-icon.svg" alt="" width="23" height="23" className="size-[23px] object-contain" />
          <span>Built with Tinyfish</span>
        </div>
      </div>
      </div>
    </div>
  </section>;
}
