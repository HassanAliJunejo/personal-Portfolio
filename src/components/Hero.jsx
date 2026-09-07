import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal'

const BOOT_LINES = [
  { prompt: '$ whoami', out: 'Hassan Ali Junejo' },
  { prompt: '$ cat role.txt', out: 'AI Developer & Full Stack Web Developer' },
  { prompt: '$ ls ./stack', out: 'python typescript nextjs fastapi gpt agents docker' },
  { prompt: '$ ./greet --verbose', out: 'Building web apps & autonomous AI agents.' },
]

function useTypewriter(lines, { typeSpeed = 24, linePause = 480 } = {}) {
  const reduced = useReducedMotion()
  const [line, setLine] = useState(0)
  const [phase, setPhase] = useState('prompt')
  const [char, setChar] = useState(0)
  const [typedOuts, setTypedOuts] = useState(() => lines.map(() => ''))

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(() => setTypedOuts(lines.map((l) => l.out)), 0)
      return () => clearTimeout(t)
    }
    if (line >= lines.length) return

    const current = lines[line]
    const source = phase === 'prompt' ? current.prompt : current.out
    let delay = typeSpeed

    if (char >= source.length && phase === 'prompt') {
      delay = 160
    } else if (char >= source.length) {
      delay = linePause
    }

    const timer = setTimeout(() => {
      if (char < source.length) {
        setChar(char + 1)
        if (phase === 'out') {
          setTypedOuts((prev) => {
            const copy = [...prev]
            copy[line] = source.slice(0, char + 1)
            return copy
          })
        }
      } else if (phase === 'prompt') {
        setPhase('out')
        setChar(0)
      } else {
        setLine(line + 1)
        setPhase('prompt')
        setChar(0)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [line, phase, char, reduced, lines, linePause, typeSpeed])

  return { typedOuts, currentLine: line, reduced }
}

export default function Hero() {
  const { typedOuts, currentLine, reduced } = useTypewriter(BOOT_LINES)
  const finished = currentLine >= BOOT_LINES.length
  const isTyping = !finished && !reduced

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-16 pt-28 sm:px-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 rounded-full bg-cyan/10 blur-3xl"
      />

      <div className="relative flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">

        {/* ── Left column: text ── */}
        <div className="flex-1 text-center lg:text-left">
          <Reveal>
            <p className="mb-6 font-mono text-sm text-cyan">
              <span className="text-faint">&gt; </span>
              init --stack full-stack+ai --profile developer
            </p>
            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              <span className="text-text">Hassan Ali Junejo</span>
              <br />
              <span className="text-cyan">AI Developer</span>{' '}
              <span className="text-muted">&</span>
              <br />
              <span className="text-amber">Full Stack Web Developer</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted">
              I ship Next.js &amp; FastAPI web apps and build agentic AI systems
              and GPT-based chatbots that act like autonomous digital employees —
              bridging clean development with intelligent automation.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <a
                href="#projects"
                className="rounded-md bg-amber px-6 py-3 font-mono text-sm font-medium text-ink transition-colors hover:bg-amber-soft"
              >
                View Projects
              </a>
              <a
                href="./cv4.pdf"
                download
                className="rounded-md border border-cyan/60 px-6 py-3 font-mono text-sm text-cyan transition-colors hover:bg-cyan/10"
              >
                Download Resume
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-12 overflow-hidden rounded-lg border border-ink-line bg-ink-soft/80 font-mono text-sm shadow-2xl">
              <div className="flex items-center gap-2 border-b border-ink-line px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-red-500/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <span className="h-3 w-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-faint">~/profile — bash</span>
              </div>
              <div className="space-y-1.5 px-4 py-4">
                <p className="text-faint">┌────────────────────────────────────────┐</p>
                <p className="text-faint">
                  │ <span className="text-text"> Welcome to my terminal, human.</span>
                </p>
                {BOOT_LINES.map((line, i) => (
                  <p key={`${line.prompt}-${i}`} className="whitespace-pre-wrap">
                    <span className="text-cyan">$ </span>
                    <span className="text-text">{line.prompt}</span>
                    {typedOuts[i] && (
                      <>
                        {'\n'}
                        <span className="pl-4 text-amber">{typedOuts[i]}</span>
                      </>
                    )}
                  </p>
                ))}
                {isTyping && (
                  <p className="whitespace-pre-wrap">
                    <span className="text-cyan">$ </span>
                    <span className="text-text animate-caret text-amber">▊</span>
                  </p>
                )}
                {finished && (
                  <p className="whitespace-pre-wrap">
                    <span className="text-cyan">$ </span>
                    <span className="text-text">
                      boot complete <span className="text-amber">✓</span>
                      <span className="animate-caret text-amber">▊</span>
                    </span>
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Right column: photo ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={reduced ? {} : { opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
          className="flex-shrink-0 -mt-2 lg:-mt-40"
        >
          <motion.div
            animate={reduced ? {} : { y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="hero-photo-glow relative"
          >
            <div className="hero-photo-frame relative overflow-hidden rounded-full p-[3px]">
              <div className="hero-photo-inner relative overflow-hidden rounded-full bg-ink-soft">
                <img
                  src="/photo.jpg"
                  alt="Hassan Ali Junejo — portrait"
                  className="h-64 w-64 object-cover sm:h-80 sm:w-80 lg:h-96 lg:w-96"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
