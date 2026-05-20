import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Lightbulb, Video, Briefcase, Box, CalendarCheck, Tv, Wrench, Puzzle, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { icon: Lightbulb,    title: 'AV Consultation & Strategy', desc: 'We assess your space, workflow and budget — then design the exact AV system your team needs.', color: '#00c9ff' },
  { icon: Video,        title: 'Video Conferencing',         desc: 'Microsoft Teams, Zoom and Google Meet certified rooms. Reliable, HD video every call.',           color: '#1a6bff' },
  { icon: Briefcase,    title: 'Boardroom AV',               desc: 'Premium systems with multi-display, PTZ cameras, lighting control and one-touch panels.',         color: '#9b6bff' },
  { icon: Box,          title: 'Huddle Room Setup',          desc: 'Compact, all-in-one systems for small collaboration spaces. Ready in minutes, not hours.',        color: '#00e5b0' },
  { icon: CalendarCheck,title: 'Room Scheduling',            desc: 'Touch-screen scheduling panels synced with Microsoft 365 or Google Workspace.',                   color: '#ff9f43' },
  { icon: Tv,           title: 'Digital Signage',            desc: 'Cloud-managed displays for reception, wayfinding, video walls and internal communications.',      color: '#00c9ff' },
  { icon: Wrench,       title: 'Support & Maintenance',      desc: 'Ongoing system health checks, remote monitoring, training and rapid response support.',           color: '#3d8bff' },
  { icon: Puzzle,       title: 'Installation & Integration', desc: 'Clean cable management, system integration and end-to-end commissioning.',                       color: '#1a6bff' },
]

export default function ServicesSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Label */
      gsap.from('.svc-label', {
        scrollTrigger: { trigger: '.svc-header', start: 'top 86%' },
        y: 22, opacity: 0, duration: 0.9, ease: 'power3.out',
      })

      /* Heading lines */
      gsap.from('.svc-line', {
        scrollTrigger: { trigger: '.svc-header', start: 'top 83%' },
        y: '110%', skewY: 1.5,
        duration: 1.3, ease: 'power4.out', stagger: 0.1,
      })

      /* Sub */
      gsap.from('.svc-sub', {
        scrollTrigger: { trigger: '.svc-sub', start: 'top 90%' },
        y: 35, opacity: 0, duration: 1.0, ease: 'power3.out',
      })

      /* Cards — 2-column stagger (column-first) */
      gsap.from('.svc-card', {
        scrollTrigger: { trigger: '.svc-grid', start: 'top 82%' },
        y: 70, opacity: 0,
        duration: 1.0,
        stagger: { amount: 1.0, grid: [2, 4], from: 'start' },
        ease: 'power4.out',
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="section-base" style={{ background: 'var(--bg-2)' }}>
      <div className="noise-overlay" />
      <div className="absolute inset-0 grid-bg opacity-35" />

      {/* Glow orb */}
      <div className="absolute pointer-events-none" style={{
        top: '30%', left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(26,107,255,0.06) 0%, transparent 70%)',
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">

        {/* Header */}
        <div className="svc-header text-center mb-5">
          <div className="svc-label section-label justify-center mb-7" style={{ opacity: 0 }}>What We Do</div>
          <h2
            className="font-display font-bold"
            style={{ fontSize: 'clamp(30px, 4.5vw, 60px)', letterSpacing: '-0.025em', lineHeight: 1.08 }}
          >
            <div className="reveal-wrap">
              <span className="svc-line block text-white">Full-Service AV,</span>
            </div>
            <div className="reveal-wrap">
              <span className="svc-line block gradient-text">Start to Finish</span>
            </div>
          </h2>
        </div>

        <p
          className="svc-sub text-center font-body mb-14 max-w-xl mx-auto"
          style={{ color: 'var(--text-2)', fontSize: '15px', lineHeight: 1.75, opacity: 0 }}
        >
          From initial consultation through to ongoing support, PRIME WORKSPACE AV handles every part of your AV journey.
        </p>

        {/* Grid */}
        <div
          className="svc-grid grid gap-5"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}
        >
          {services.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="svc-card glass glass-hover group cursor-default relative overflow-hidden"
              style={{ padding: '28px' }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
              />

              <div
                className="mb-5 w-11 h-11 flex items-center justify-center rounded-lg transition-transform duration-400 group-hover:scale-110"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}
              >
                <Icon size={19} style={{ color }} />
              </div>

              <h3
                className="font-display font-semibold mb-3 text-white"
                style={{ fontSize: '15.5px', letterSpacing: '-0.01em' }}
              >
                {title}
              </h3>
              <p className="font-body leading-relaxed mb-5" style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                {desc}
              </p>

              <div className="flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300">
                <span className="font-mono text-[11px] tracking-wider transition-colors" style={{ color }}>
                  Learn More
                </span>
                <ArrowUpRight size={12} style={{ color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
