import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TokenLaunch() {
  return <section id="launch" className="relative grid min-h-[470px] items-center gap-12 overflow-hidden rounded-sm bg-[#101211] px-7 py-20 sm:px-12 lg:grid-cols-[1fr_0.7fr] lg:px-20 lg:py-24">
    <div data-scene-heading className="relative z-10">
      <p className="mb-8 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">On the XRP Ledger</p>
      <h2 className="max-w-[650px] font-heading text-[clamp(2.8rem,5vw,5.4rem)] font-medium leading-[1.06] tracking-[-0.045em]">Have an idea?<br />Launch its token.</h2>
      <p className="mt-6 max-w-[410px] text-lg leading-[1.6] text-muted-foreground">A guided flow takes you from token details to review before launch.</p>
      <Button render={<a href="#x-example" />} variant="outline" className="mt-8 min-h-11 rounded-sm border-white/35 bg-transparent px-5">See trading on X <ArrowUpRight data-icon="inline-end" /></Button>
    </div>
    <div data-scene-panel aria-hidden="true" className="relative mx-auto hidden aspect-square w-full max-w-[350px] items-center justify-center lg:flex">
      <div className="absolute inset-[3%] rotate-[-12deg] border border-white/15 bg-gradient-to-br from-white/15 via-transparent to-white/5 shadow-[0_20px_80px_rgba(0,0,0,.4)]" />
      <div className="absolute inset-[19%] rotate-[11deg] border border-white/20 bg-black/50 backdrop-blur-md" />
      <span className="relative font-mono text-xs uppercase tracking-[0.2em] text-white/65">XRP Ledger</span>
    </div>
  </section>;
}
