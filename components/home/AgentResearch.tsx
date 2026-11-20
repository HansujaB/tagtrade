const steps = [
  { number: "01", name: "Find the exact asset", detail: "If two tokens share a name, TagTrade asks which one you want to buy." },
  { number: "02", name: "See what’s behind the token", detail: "Tinyfish reads the project’s website and public pages, then summarizes what the project does." },
  { number: "03", name: "Check the details", detail: "See the token and how much XRP you’re spending, right in the conversation." },
];

export function AgentResearch() {
  return <section id="how-it-works" className="grid gap-14 py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:py-40">
    <div data-scene-heading>
      <h2 className="font-heading text-[clamp(2.8rem,5vw,5rem)] font-medium leading-[1.06] tracking-[-0.045em]">Know what<br />you trade.</h2>
      <p className="mt-6 max-w-[400px] text-lg leading-[1.6] text-muted-foreground">From a token name to a clearer picture. Tinyfish brings the research into your conversation.</p>
    </div>
    <div className="flex flex-col gap-10 lg:gap-14">
      {steps.map((step) => <div data-scene-step key={step.number} className="grid grid-cols-[44px_1fr] gap-4 sm:grid-cols-[64px_1fr]">
        <span className="pt-1 font-mono text-sm text-muted-foreground">{step.number}</span>
        <div><h3 className="text-2xl font-medium tracking-[-0.025em]">{step.name}</h3><p className="mt-2 max-w-[480px] text-base leading-[1.6] text-muted-foreground">{step.detail}</p></div>
      </div>)}
    </div>
  </section>;
}
