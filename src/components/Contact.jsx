import { useState } from 'react'
import Reveal from './Reveal'

const CONTACT = [
  {
    label: 'email',
    value: 'ali3130092@gmail.com',
    href: 'mailto:ali3130092@gmail.com',
  },
  {
    label: 'location',
    value: 'Karachi, Pakistan',
    href: 'https://maps.google.com/?q=Karachi,Pakistan',
  },
  {
    label: 'phone',
    value: '+92 312 121 7343',
    href: 'tel:+923121217343',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) {
      next.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.'
    }
    if (!form.message.trim()) next.message = 'Please enter a message.'
    return next
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Submitting form...")
    
    // Safely target the form element
    const formElement = e.target.closest("form") || e.currentTarget.closest("form")
    if (!formElement) {
        console.error("Form element not found")
        return
    }
    
    const next = validate()
    setErrors(next)
    
    if (Object.keys(next).length === 0) {
      const formData = new FormData(formElement)
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
      if (!accessKey) {
        console.error("Web3Forms Access Key is missing!")
        return
      }
      formData.append("access_key", accessKey)

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        })
        const data = await response.json()
        if (data.success) {
          setSubmitted(true)
        } else {
          console.error("Web3Forms Error:", data)
        }
      } catch (err) {
        console.error("Submission failed:", err)
      }
    }
  }

  const fieldClass = (hasError) =>
    `w-full rounded-md border bg-ink px-4 py-3 font-mono text-sm text-text placeholder:text-faint transition-colors focus:outline-none focus:ring-2 focus:ring-amber/60 ${
      hasError ? 'border-red-500/70' : 'border-ink-line'
    }`

  return (
    <section id="contact" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal>
        <p className="font-mono text-sm text-faint">
          <span className="text-amber">05</span> / contact
        </p>
        <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Let&apos;s build something.
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          Open to freelance, full-time, or a chat about AI, web apps, and
          automation. Drop me a line — I&apos;m based in Karachi, Pakistan.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 overflow-hidden rounded-lg border border-ink-line bg-ink-soft/80 font-mono text-sm shadow-2xl">
          <div className="flex items-center gap-2 border-b border-ink-line px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <span className="h-3 w-3 rounded-full bg-green-500/70" />
            <span className="ml-3 text-xs text-faint">~/contact — reach me</span>
          </div>

          <div className="divide-y divide-ink-line px-4 sm:px-6">
            {CONTACT.map((item) => {
              const isExternal = item.href.startsWith('http')
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                  className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:gap-6"
                >
                  <span className="w-24 shrink-0 text-faint">{item.label}</span>
                  <span className="text-cyan transition-colors group-hover:text-cyan-soft">
                    &gt; {item.value}
                  </span>
                  {isExternal && (
                    <span className="hidden text-faint transition-colors group-hover:text-amber sm:ml-auto">
                      [open]
                    </span>
                  )}
                </a>
              )
            })}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-8 h-auto pb-8 rounded-lg border border-ink-line bg-ink-soft/80 font-mono text-sm shadow-2xl">
          <div className="flex items-center gap-2 border-b border-ink-line px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <span className="h-3 w-3 rounded-full bg-green-500/70" />
            <span className="ml-3 text-xs text-faint">~/contact — message</span>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
              <svg viewBox="0 0 24 24" className="h-12 w-12 text-amber" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <circle cx="12" cy="12" r="10" />
                <path d="m8.5 12.5 2.5 2.5 5-5" />
              </svg>
              <p className="font-heading text-xl font-bold text-text">
                Message sent!
              </p>
              <p className="max-w-sm leading-relaxed text-muted">
                Thanks, {form.name.trim() || 'friend'}. I&apos;ll get back to you
                at {form.email.trim()} soon.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false)
                  setForm({ name: '', email: '', message: '' })
                }}
                className="mt-2 rounded-md border border-cyan/60 px-6 py-3 text-sm text-cyan transition-colors hover:bg-cyan/10"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5 px-4 py-6 sm:px-6">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs text-faint">
                  name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className={fieldClass(errors.name)}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-400">! {errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs text-faint">
                  email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className={fieldClass(errors.email)}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-400">! {errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs text-faint">
                  message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className={`${fieldClass(errors.message)} resize-y`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-400">! {errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="cursor-pointer relative z-50 pointer-events-auto bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-6 rounded-lg flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M22 2 11 13" />
                  <path d="M22 2 15 22l-4-9-9-4z" />
                </svg>
                Send Message
              </button>
            </form>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="mailto:ali3130092@gmail.com"
            className="inline-flex items-center gap-2 rounded-md bg-amber px-6 py-3 font-mono text-sm font-medium text-ink transition-colors hover:bg-amber-soft"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M4 6h16v12H4z" />
              <path d="m4 7 8 6 8-6" />
            </svg>
            Send Email
          </a>
          <p className="text-sm text-faint">
            Usually replies within a day.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
