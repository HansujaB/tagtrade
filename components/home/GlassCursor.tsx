"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function GlassCursor() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useGSAP(() => {
    const element = canvas.current;
    const host = element?.closest("section");
    const ctx = element?.getContext("2d");
    if (!element || !host || !ctx) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
      const source = new window.Image(); source.src = "/hero-ledger-glass.webp";
      let width = 0, height = 0, visible = true;
      const point = { x: 0, y: 0, alpha: 0 };
      const xTo = gsap.quickTo(point, "x", { duration: 0.7, ease: "power3.out" });
      const yTo = gsap.quickTo(point, "y", { duration: 0.7, ease: "power3.out" });
      const alphaTo = gsap.quickTo(point, "alpha", { duration: 0.5 });
      const resize = new ResizeObserver(() => {
        width = host.clientWidth; height = host.clientHeight;
        const ratio = Math.min(window.devicePixelRatio, 1.5);
        element.width = width * ratio; element.height = height * ratio;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      });
      resize.observe(host);
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }); observer.observe(host);
      const move = (event: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        if (point.alpha < 0.01) { point.x = event.clientX - rect.left; point.y = event.clientY - rect.top; }
        xTo(event.clientX - rect.left); yTo(event.clientY - rect.top); alphaTo(1);
      };
      const leave = () => alphaTo(0);
      host.addEventListener("pointermove", move); host.addEventListener("pointerleave", leave);
      const draw = (time: number) => {
        if (!visible) return;
        ctx.clearRect(0, 0, width, height);
        if (point.alpha < 0.005 || !source.complete || !source.naturalWidth) return;
        const scale = Math.max(width / source.width, height / source.height);
        const dw = source.width * scale, dh = source.height * scale;
        const left = (width - dw) / 2, top = (height - dh) / 2;
        ctx.globalCompositeOperation = "source-over";
        for (let row = Math.max(0, Math.floor(point.y - 200)); row < Math.min(height, point.y + 200); row += 3) {
          const distance = (row - point.y) / 200;
          const strength = Math.exp(-distance * distance * 5);
          const shift = Math.sin(distance * 8 - time * 1.2) * 9 * strength;
          const sy = (row - top - shift * 0.4) / scale;
          if (sy < 0 || sy + 3 / scale > source.height) continue;
          ctx.drawImage(source, 0, sy, source.width, 3 / scale, left + shift, row, dw, 3.5);
        }
        ctx.globalCompositeOperation = "destination-in";
        const mask = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 220);
        mask.addColorStop(0, `rgba(0,0,0,${point.alpha})`); mask.addColorStop(0.4, `rgba(0,0,0,${point.alpha * 0.8})`); mask.addColorStop(1, "transparent");
        ctx.fillStyle = mask; ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = "source-over";
      };
      gsap.ticker.add(draw);
      return () => { gsap.ticker.remove(draw); resize.disconnect(); observer.disconnect(); host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", leave); ctx.clearRect(0, 0, width, height); };
    });
    return () => media.revert();
  });
  return <canvas ref={canvas} aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" />;
}
