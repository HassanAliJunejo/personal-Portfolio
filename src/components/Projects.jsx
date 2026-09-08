import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal'

const PROJECTS = {
  web: [
    {
      title: 'Elegant Education Centre',
      problem:
        'A modern, full-stack educational web portal designed to showcase courses, manage student results, and streamline admissions for Karachi & AKU-EB boards.',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      impact:
        'Successfully delivered to client; boosted online student inquiries and digitized course admissions.',
      demo: 'https://elegant-education-6yza.vercel.app/',
      image: '/elegant education center.png',
    },
    {
      title: 'TypeScript Quiz System',
      problem: 'Interactive TypeScript online assessment platform featuring student testing interface and dedicated admin portal.',
      tags: ['TypeScript', 'React', 'Tailwind CSS', 'Vercel'],
      impact: 'Provides a streamlined platform for conducting TypeScript assessments with automated grading and admin management.',
      demo: 'https://typescript-test-d4r9.vercel.app/',
      image: '/typescript quiz.png',
    },
    {
      title: 'Todo full stack app',
      problem:
        'A full-stack Todo application integrated with a chatbot to manage tasks through conversational AI.',
      tags: ['Next.js', 'FastAPI', 'GPT'],
      impact: 'Streamlined task management and improved user productivity.',
      github: 'https://github.com/hassanalijunejo/todo-full-stack',
      demo: 'https://todo-full-stack-orcin.vercel.app/',
      image: '/todo full stack app.png',
    },
  ],
  ai: [
    {
      title: 'Todo Chatbot Full stack app',
      problem:
        'A full-stack Todo application integrated with a chatbot to manage tasks through conversational AI.',
      tags: ['Next.js', 'FastAPI', 'GPT'],
      impact: 'Streamlined task management and improved user productivity.',
      github: '[REPLACE: https://github.com/hassanalijunejo/repo]',
      demo: 'https://todo-chatbot-sr16.vercel.app/login',
      image: '/Todo Chatbot Full stack app.png',
    },
    {
      title: 'NovaChat AI Assistant',
      problem:
        'Intelligent AI-powered conversational bot designed to streamline automated customer interaction and query management in real-time.',
      tags: ['GPT-4', 'FastAPI', 'Python', 'Next.js'],
      impact: 'Reduced query response time by 80% and enabled 24/7 automated support.',
      github: '[REPLACE: https://github.com/hassanalijunejo/repo]',
      demo: 'https://ai-chatbot-abjt.vercel.app/login',
      image: '/Nova Chatbot.png',
    },
    {
      title: 'Physical AI & Humanoid Robotics',
      problem:
        'Interactive web portal and RAG chatbot platform covering ROS 2, robotic nervous systems, and autonomous intelligent agent controls for humanoid robots.',
      tags: ['ROS 2', 'FastAPI', 'Qdrant', 'Python', 'Next.js'],
      impact: 'Digitized AI robotics course modules and built an integrated interactive RAG knowledge base.',
      github: 'https://github.com/hassanalijunejo/rag-chatbot',
      demo: 'https://rag-chatbot-ui-sepia.vercel.app/',
      image: '/Physical AI & Humanoid Robotics.png',
    },
  ],
}

const TABS = [
  { key: 'web', label: 'Web Development', accent: 'amber' },
  { key: 'ai', label: 'AI Agents', accent: 'cyan' },
]

function ProjectCard({ project, accent }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col rounded-xl border border-ink-line bg-ink-soft/60 p-6"
    >
      <div className="rounded-t-xl aspect-video overflow-hidden mb-6">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full bg-gradient-to-b from-ink-soft/80 to-ink-soft rounded-t-xl"
          />
        )}
      </div>

      <div className="flex-1">
        <h3 className="font-heading text-lg font-semibold text-text">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-muted">{project.problem}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded border px-2 py-0.5 font-mono text-xs ${
                accent === 'amber'
                  ? 'border-amber/40 text-amber'
                  : 'border-cyan/40 text-cyan'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-4 border-t border-ink-line pt-4 text-sm text-text">
          <span className={`font-mono text-xs ${accent === 'amber' ? 'text-amber' : 'text-cyan'}`}>
            ▸ impact{' '}
          </span>
          {project.impact}
        </p>
      </div>

      <div className="mt-6">
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className="w-full bg-amber text-ink py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          ↗ Demo
        </a>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [active, setActive] = useState('web')
  const reduce = useReducedMotion()
  const current = PROJECTS[active]
  const accent = TABS.find((t) => t.key === active).accent

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal>
        <p className="font-mono text-sm text-faint">
          <span className="text-amber">03</span> / projects
        </p>
        <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Selected work.
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-8 inline-flex rounded-lg border border-ink-line bg-ink-soft/60 p-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className={`rounded-md px-5 py-2 font-mono text-sm transition-colors ${
                active === tab.key
                  ? tab.accent === 'amber'
                    ? 'bg-amber text-ink'
                    : 'bg-cyan text-ink'
                  : 'text-muted hover:text-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div
        key={active}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="wait">
          {current.map((project, i) => (
            <ProjectCard key={active + i} project={project} accent={accent} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
