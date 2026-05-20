import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search, PenTool, Cpu, GraduationCap, HeartHandshake } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { num: '01', icon: Search,        title: 'Discover',   color: '#00c9ff', desc: 'A detailed consultation to understand your spaces, workflows, team size, infrastructure, and goals.' },
  { num: '02', icon: PenTool,       title: 'Design',     color: '#3d8bff', desc: 'Custom system design — equipment schedules, signal flow diagrams, and a clear installation plan.' },
  { num: '03', icon: Cpu,           title: 'Integrate',  color: '#1a6bff', desc: 'Professional installation, clean cable management, and seamless IT, calendar, and control integration.' },
  { num: '04', icon: GraduationCap, title: 'Train',      color: '#9b6bff', desc: 'Walk your team through day-to-day operation and advanced features until everyone is fully confident.' },
  { num: '05', icon: HeartHandshake,title: 'Support',    color: '#00e5b0', desc: 'Remote monitoring, proactive health checks, rapid response support, and regular maintenance.' },
]

export default function ProcessSection() {
  const sectionRef  = useRef(null)
  const outerRef    = useRef(null)
  const trackRef    = useRef(null)
  const fillRef     = useRef(null)
  const progressRef = useRef(0)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Header reveals */
      gsap.from('.proc-label', {
        scrollTrigger: { trigger: '.proc-header', start: 'top 86%' },
        y: 22, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
      gsap.from('.proc-line', {
        scrollTrigger: { trigger: '.proc-header', start: 'top 83%' },
        y: '110%', skewY: 1.5, duration: 1.3, ease: 'power4.out', stagger: 0.1,
      })
      gsap.from('.proc-sub', {
        scrollTrigger: { trigger: '.proc-sub', start: 'top 90%' },
        y: 35, opacity: 0, duration: 1.0, ease: 'power3.out',
      })

      const track = trackRef.current
      const outer = outerRef.current
      if (!track || !outer) return

      const isMobile = window.innerWidth < 768

      if (!isMobile) {
        /* ── Desktop: horizontal scroll with pin ──────── */
        const getAmt = () => -(track.scrollWidth - outer.clientWidth + 96)

        const st = ScrollTrigger.create({
          trigger: outer,
          start: 'top top',
          end: () => `+=${Math.abs(getAmt()) + 200}`,
          pin: true,
          scrub: 1.4,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progressRef.current = self.progress
            if (fillRef.current) {
              fillRef.current.style.transform = `scaleX(${self.progress})`
            }
          },
        })

        gsap.to(track, {
          x: getAmt,
          ease: 'none',
          scrollTrigger: {
            trigger: outer,
            start: 'top top',
            end: () => `+=${Math.abs(getAmt()) + 200}`,
            scrub: 1.4,
            invalidateOnRefresh: true,
          },
        })

        /* Individual cards animate as they enter the horizontal viewport */
        gsap.from('.proc-step', {
          y: 50, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power4.out',
          scrollTrigger: { trigger: outer, start: 'top 85%' },
        })

      } else {
        /* ── Mobile: vertical stagger ─────────────────── */
        gsap.from('.proc-step', {
          scrollTrigger: { trigger: track, start: 'top 80%' },
          y: 55, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power4.out',
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="process" className="section-base" style={{ background: 'var(--bg)' }}>
      <div className="noise-overlay" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="proc-header text-center mb-14">
          <div className="proc-label section-label justify-center mb-7" style={{ opacity: 0 }}>Our Process</div>
          <h2
            className="font-display font-bold"
            style={{ fontSize: 'clamp(28px, 4.2vw, 58px)', letterSpacing: '-0.025em', lineHeight: 1.07 }}
          >
            <div className="reveal-wrap">
              <span className="proc-line block text-white">From First Conversation</span>
            </div>
            <div className="reveal-wrap">
              <span className="proc-line block">
                <span className="text-white">to </span>
                <span className="gradient-text">Fully Connected</span>
              </span>
            </div>
          </h2>
          <p
            className="proc-sub font-body mt-5 max-w-lg mx-auto"
            style={{ color: 'var(--text-2)', fontSize: '15px', lineHeight: 1.75, opacity: 0 }}
          >
            A proven five-step process that removes guesswork and delivers a system your team actually loves using.
          </p>
        </div>
      </div>

      {/* Horizontal scroll pin zone */}
      <div ref={outerRef} className="relative overflow-hidden" style={{ paddingBottom: '64px' }}>

        {/* Progress bar */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8 hide-mobile">
          <div className="hscroll-track max-w-md">
            <div ref={fillRef} className="hscroll-fill" />
          </div>
        </div>

        <div
          ref={trackRef}
          className="process-track"
          style={{ paddingLeft: '7vw', paddingRight: '7vw', gap: '28px' }}
        >
          {steps.map(({ num, icon: Icon, title, desc, color }, i) => (
            <div
              key={num}
              className="proc-step glass flex-shrink-0 relative"
              style={{
                width: 'clamp(270px, 29vw, 310px)',
                padding: '36px 28px',
                borderRadius: '14px',
              }}
            >
              {/* Connector arrow */}
              {i < steps.length - 1 && (
                <div className="absolute hide-mobile" style={{
                  top: '54px', right: '-28px', width: '28px', height: '1px',
                  background: `linear-gradient(90deg, ${color}66, transparent)`,
                  zIndex: 2,
                }} />
              )}

              {/* Step number as a big bg numeral */}
              <div
                className="bg-numeral mb-2 select-none"
                style={{ fontSize: '72px', lineHeight: 1 }}
              >
                {num}
              </div>

              {/* Icon */}
              <div
                className="w-11 h-11 flex items-center justify-center rounded-xl mb-5"
                style={{ background: `${color}15`, border: `1px solid ${color}35` }}
              >
                <Icon size={20} style={{ color }} />
              </div>

              <h3
                className="font-display font-bold text-white mb-3"
                style={{ fontSize: '21px', letterSpacing: '-0.01em' }}
              >
                {title}
              </h3>
              <p className="font-body leading-relaxed" style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                {desc}
              </p>

              {/* Bottom accent */}
              <div
                className="mt-6 h-[2px] w-10 rounded-full"
                style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
