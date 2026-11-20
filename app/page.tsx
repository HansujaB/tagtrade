import { TradeFlow } from "@/components/home/TradeFlow";
import { AgentResearch } from "@/components/home/AgentResearch";
import { Closing } from "@/components/home/Closing";
import { Footer } from "@/components/home/Footer";
import { Controls } from "@/components/home/Controls";
import { Hero } from "@/components/home/Hero";
import { Navbar } from "@/components/home/Navbar";
import { ScrollScene } from "@/components/home/ScrollScene";
import { TokenLaunch } from "@/components/home/TokenLaunch";
import { XPostProof } from "@/components/home/XPostProof";

export default function Home() {
  return <>
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground">Skip to content</a>
    <div id="top" />
    <Navbar />
    <main id="main">
      <Hero />
      <div className="mx-auto max-w-[1360px] px-6 lg:px-12">
      <ScrollScene kind="example"><section id="x-example" className="grid items-center gap-10 py-20 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 lg:py-28">
        <div data-scene-heading className="max-w-[470px]"><h2 className="section-heading">A post becomes a trade.</h2><p className="mt-6 max-w-[360px] section-description">Tag @tagtradex on X. Get a purchase reply in the same thread.</p></div>
        <div data-scene-visual><XPostProof /></div>
      </section></ScrollScene>
      </div>
      <div className="landing-wide"><TradeFlow /></div>
      <div className="mx-auto max-w-[1360px] px-6 lg:px-12">
      <ScrollScene kind="research"><AgentResearch /></ScrollScene>
      <ScrollScene kind="controls"><Controls /></ScrollScene>
      <ScrollScene kind="launch"><TokenLaunch /></ScrollScene>
      <ScrollScene kind="closing"><Closing /></ScrollScene>
      </div>
      <Footer />
    </main>
  </>;
}
