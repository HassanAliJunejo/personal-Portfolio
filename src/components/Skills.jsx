import Reveal from './Reveal'

const FULL_STACK = [
  ['TypeScript', 'type-safe frontends'],
  ['Next.js', 'React apps & SSR'],
  ['FastAPI', 'Python backends & APIs'],
  ['Docker', 'containerized deploys'],
]

const AI_ENGINEERING = [
  ['Python', 'AI & automation core'],
  ['GPT-based chatbots', 'conversational AI'],
  ['Agentic AI systems', 'autonomous agents'],
  ['API integrations', 'GPT / external services'],
  ['Task automation', 'digital employees'],
]

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal>
        <p className="font-mono text-sm text-faint">
          <span className="text-amber">02</span> / skills
        </p>
        <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          What I bring to the table.
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Reveal delay={0.05}>
          <article className="h-full rounded-xl border border-ink-line bg-ink-soft/60 p-7">
            <p className="font-mono text-xs tracking-widest text-amber">
              &lt;tabs /&gt;
            </p>
            <h3 className="mt-2 font-heading text-xl font-semibold text-text">
              Full Stack Development
            </h3>
            <p className="mt-2 text-sm text-muted">
              From database to browser — shipping complete, maintainable web
              products.
            </p>
            <ul className="mt-6 space-y-3">
              {FULL_STACK.map(([name, sub]) => (
                <li
                  key={name}
                  className="flex items-center justify-between gap-4 border-b border-ink-line pb-3"
                >
                  <span className="font-mono text-sm text-amber">
                    <span className="mr-2 text-faint">&#62;</span>
                    {name}
                  </span>
                  <span className="text-xs text-faint">{sub}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        <Reveal delay={0.1}>
          <article className="h-full rounded-xl border border-ink-line bg-ink-soft/60 p-7">
            <p className="font-mono text-xs tracking-widest text-cyan">
              ~/agents$
            </p>
            <h3 className="mt-2 font-heading text-xl font-semibold text-text">
              AI Engineering
            </h3>
            <p className="mt-2 text-sm text-muted">
              Applying large language models and automation to real business
              problems.
            </p>
            <ul className="mt-6 space-y-3">
              {AI_ENGINEERING.map(([name, sub]) => (
                <li
                  key={name}
                  className="flex items-center justify-between gap-4 border-b border-ink-line pb-3"
                >
                  <span className="font-mono text-sm text-cyan">
                    <span className="mr-2 text-faint">&#62;</span>
                    {name}
                  </span>
                  <span className="text-xs text-faint">{sub}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
