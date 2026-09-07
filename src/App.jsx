import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import ChatBot from './components/ChatBot'

function App() {
  return (
    <div className="min-h-screen bg-ink text-text antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <ChatBot />
      </main>
      <footer className="border-t border-ink-line py-8 text-center">
        <p className="font-mono text-xs text-faint">
          <span className="text-amber">$ </span>
          crafted with <span className="text-cyan">react</span> · tailwind · framer
        </p>
        <p className="mt-1 font-mono text-xs text-faint">
          © {new Date().getFullYear()} Hassan Ali Junejo — AI Developer & Full Stack Web Developer
        </p>
      </footer>
    </div>
  )
}

export default App
