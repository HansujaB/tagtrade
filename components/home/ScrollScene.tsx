"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, SplitText);
type Scene = "example" | "research" | "controls" | "launch" | "closing";
export function ScrollScene({ kind, children }: { kind: Scene; children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!scope.current) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const heading = scope.current?.querySelector("h2");
      const split = heading ? SplitText.create(heading, {
        type: "lines,words", mask: "lines", autoSplit: true,
        onSplit(self) {
          return gsap.from(self.words, { yPercent: 110, rotation: 2, duration: 0.85, stagger: 0.065, ease: "power3.out", scrollTrigger: { trigger: heading, start: "top 88%", once: true } });
        },
      }) : null;
      const select = gsap.utils.selector(scope);
      const items = select("[data-scene-step], [data-scene-detail]");
      items.forEach((item) => {
        gsap.fromTo(item, { y: 55, opacity: 0.15 }, { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 88%", once: true } });
      });
      if (kind === "example") {
        gsap.fromTo("[data-scene-visual]", { y: 75, rotate: 2, scale: 0.95 }, { y: 0, rotate: 0, scale: 1, ease: "none", scrollTrigger: { trigger: scope.current, start: "top 85%", end: "center 60%", scrub: 0.7 } });
        gsap.fromTo("[data-x-reply]", { y: 25, opacity: 0.2 }, { y: 0, opacity: 1, duration: 0.65, ease: "power3.out", scrollTrigger: { trigger: select("[data-x-reply]")[0], start: "top 90%", once: true } });
      }
      if (kind === "launch") {
        gsap.fromTo("[data-scene-panel]", { rotate: -12, y: 50 }, { rotate: 8, y: -25, ease: "none", scrollTrigger: { trigger: scope.current, start: "top bottom", end: "bottom top", scrub: 1 } });
      }
      return () => split?.revert();
    });
    return () => media.revert();
  }, { scope });
  return <div ref={scope}>{children}</div>;
}
