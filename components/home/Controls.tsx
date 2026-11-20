export function Controls() {
  return <section id="controls" className="grid items-start gap-14 py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:py-40">
    <div data-scene-heading>
      <p className="mb-8 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Built around your limits</p>
      <h2 className="font-heading text-[clamp(2.8rem,5vw,5rem)] font-medium leading-[1.06] tracking-[-0.045em]">Your trade.<br />Your call.</h2>
      <p className="mt-6 max-w-[390px] text-lg leading-[1.6] text-muted-foreground">Choose an extra reply to confirm. Trade caps and spending limits remain in place.</p>
    </div>
    <div data-scene-panel className="grid gap-12 pt-2 sm:grid-cols-2 lg:gap-16">
      <div data-scene-detail>
        <span className="font-heading text-[clamp(4.5rem,8vw,8rem)] leading-none tracking-[-0.08em]">10</span>
        <p className="mt-3 font-mono text-sm uppercase tracking-[0.12em] text-muted-foreground">XRP per trade</p>
        <p className="mt-8 max-w-[220px] text-sm leading-6 text-muted-foreground">A cap on each trade helps keep a single request within bounds.</p>
      </div>
      <div data-scene-detail className="space-y-12 sm:pt-6">
        <div><span className="font-mono text-xs text-muted-foreground">01 / CONFIRM</span><h3 className="mt-3 text-2xl font-medium tracking-[-0.025em]">Reply yes, if you choose.</h3><p className="mt-3 max-w-[280px] text-sm leading-6 text-muted-foreground">An optional extra confirmation for the exact trade request.</p></div>
        <div><span className="font-mono text-xs text-muted-foreground">02 / LIMIT</span><h3 className="mt-3 text-2xl font-medium tracking-[-0.025em]">Set a daily budget.</h3><p className="mt-3 max-w-[280px] text-sm leading-6 text-muted-foreground">Your spending limit and activity checks apply either way.</p></div>
      </div>
    </div>
  </section>;
}
