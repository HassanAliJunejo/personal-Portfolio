import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal>
        <p className="font-mono text-sm text-faint">
          <span className="text-amber">01</span> / about
        </p>
        <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Building apps and AI that work while you sleep.
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-14">
        <Reveal delay={0.05}>
          <div className="border-l-2 border-amber pl-5">
            <h3 className="font-mono text-sm text-amber">full-stack</h3>
            <p className="mt-3 leading-relaxed text-muted">
              I build fast, production-grade web applications using Next.js on
              the frontend and FastAPI on the backend — clean APIs, polished
              UIs, and deployment-ready systems that perform at scale.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border-l-2 border-cyan pl-5">
            <h3 className="font-mono text-sm text-cyan">ai / automation</h3>
            <p className="mt-3 leading-relaxed text-muted">
              I engineer agentic AI systems and GPT-based chatbots that act like
              autonomous digital employees — reasoning over tools, automating
              workflows, and handling real tasks end-to-end without constant
              supervision.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <p className="mt-10 max-w-3xl leading-relaxed text-muted">
          The two halves are one skill set: I use my full-stack skills to ship
          the products, and my AI skills to make them smarter. The result is
          software that doesn&apos;t just run — it works for you.
        </p>
      </Reveal>
    </section>
  )
}
