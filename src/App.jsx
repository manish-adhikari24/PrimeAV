import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import ProblemSection from './components/ProblemSection'
import SolutionSection from './components/SolutionSection'
import WorkspaceModesSection from './components/WorkspaceModesSection'
import ServicesSection from './components/ServicesSection'
import ProcessSection from './components/ProcessSection'
import WhyChooseSection from './components/WhyChooseSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // ── Lenis smooth scroll ──────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
      autoRaf: false,
    })

    // Sync Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's RAF so they share the same frame budget
    const lenisRaf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(lenisRaf)
    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger once fonts + layout have settled
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenisRaf)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <WorkspaceModesSection />
        <ServicesSection />
        <ProcessSection />
        <WhyChooseSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatBot />
    </>
  )
}

export default App
