import Reveal from './Reveal'

const JOBS = [
  {
    year: '2023 — Present',
    role: 'Agentic AI & Applied Generative AI',
    company: 'GIAIC (Governor Initiative for AI & Computing)',
    summary:
      'Specialization in agentic AI systems and applied generative AI — building autonomous agents and GPT-based solutions that reason, use tools, and complete tasks like digital employees.',
    accent: 'cyan',
  },
  {
    year: '2021 — 2023',
    role: 'IT / Software-Hardware Management',
    company: 'SHED Hospital',
    summary:
      'Managed IT infrastructure, software, and hardware systems across the hospital — keeping critical systems running and teams productive.',
    accent: 'amber',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal>
        <p className="font-mono text-sm text-faint">
          <span className="text-amber">04</span> / experience
        </p>
        <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Where I&apos;ve been.
        </h2>
      </Reveal>

      <div className="relative mt-12">
        <div className="absolute left-4 top-0 h-full w-px bg-ink-line sm:left-0" />

        <ol className="space-y-10">
          {JOBS.map((job, i) => (
            <li key={i} className="relative pl-12 sm:pl-10">
              <Reveal delay={0.05 * i}>
                <span
                  className={`absolute left-4 top-1.5 -translate-x-1/2 sm:left-0 ${
                    job.accent === 'amber' ? 'text-amber' : 'text-cyan'
                  }`}
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Z" />
                  </svg>
                </span>

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span
                    className={`font-mono text-xs ${
                      job.accent === 'amber' ? 'text-amber' : 'text-cyan'
                    }`}
                  >
                    {job.year}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-text">
                    {job.role}
                  </h3>
                </div>
                <p className="mt-0.5 text-sm text-faint">{job.company}</p>
                <p className="mt-3 leading-relaxed text-muted">{job.summary}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
