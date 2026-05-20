import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Monitor, Briefcase, Box, GraduationCap, Layers, Tv, CalendarCheck, CheckCircle2, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const modes = [
  { id: 'meeting-room', label: 'Meeting Rooms',  icon: Monitor,      color: '#1a6bff', heading: 'Productive Meeting Rooms',    desc: 'Transform every meeting room into a seamless collaboration hub with crystal-clear audio, 4K video, and one-touch control.',                                                    features: ['4K Commercial Display', 'AI-Framing 4K Camera', 'Ceiling Microphone Array', 'Wireless Presentation', 'One-Touch Meeting Launch'] },
  { id: 'boardroom',    label: 'Boardrooms',      icon: Briefcase,    color: '#00c9ff', heading: 'Premium Boardroom AV',         desc: 'Impress clients and leadership with a fully integrated boardroom — multiple displays, PTZ cameras, lighting control and one-touch automation.',                          features: ['Dual or Triple Display Setup', 'PTZ Pan-Tilt-Zoom Cameras', 'Microphone Array System', 'Lighting & Blind Control', 'Premium One-Touch Panel'] },
  { id: 'huddle',       label: 'Huddle Spaces',   icon: Box,          color: '#9b6bff', heading: 'Quick-Start Huddle Spaces',    desc: 'Small teams need fast, reliable tech. Huddle spaces get purpose-built all-in-one systems that work the moment you walk in.',                                              features: ['All-in-One Bar System', 'Plug-and-Play Wireless', 'Compact Display Solutions', 'Simple App-Based Control', 'Microsoft Teams / Zoom Certified'] },
  { id: 'training',     label: 'Training Rooms',  icon: GraduationCap,color: '#00e5b0', heading: 'Dynamic Training Rooms',       desc: 'Flexible rooms for learning, workshops, and hybrid sessions — with audience microphones, document cameras, and multi-zone display.',                                features: ['Multi-Zone Display Layout', 'Wireless & Wired Presentation', 'Audience Microphone System', 'Document Camera', 'Recording Integration'] },
  { id: 'multi-use',    label: 'Multi-Use Spaces',icon: Layers,       color: '#3d8bff', heading: 'Flexible Multi-Use Spaces',    desc: 'Rooms that change purpose need AV that adapts. Scene-based presets let one space serve as a boardroom, training room, or event space.',                              features: ['Preset Scene Control', 'Retractable Screens', 'Distributed Audio Zones', 'Room Divider Integration', 'Custom Control UI'] },
  { id: 'signage',      label: 'Digital Signage', icon: Tv,           color: '#00c9ff', heading: 'Compelling Digital Signage',   desc: 'Reception screens, video walls, wayfinding kiosks — digital signage that reinforces your brand and communicates in real time.',                                     features: ['Reception & Lobby Displays', 'Video Wall Systems', 'Wayfinding Kiosks', 'Cloud Content Management', 'Live Data & Feed Integration'] },
  { id: 'scheduling',   label: 'Room Scheduling', icon: CalendarCheck,color: '#ff9f43', heading: 'Intelligent Room Scheduling',  desc: 'Eliminate double bookings with touch-screen scheduling panels that sync with Microsoft 365, Google Workspace, and more.',                                         features: ['Door-mount Touch Panels', 'Microsoft 365 Integration', 'Google Workspace Sync', 'Real-Time Availability', 'Occupancy Sensing'] },
]

export default function WorkspaceModesSection() {
  const [active, setActive]   = useState(0)
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.wm-label', {
        scrollTrigger: { trigger: '.wm-header', start: 'top 86%' },
        y: 22, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
      gsap.from('.wm-line', {
        scrollTrigger: { trigger: '.wm-header', start: 'top 83%' },
        y: '110%', skewY: 1.5, duration: 1.3, ease: 'power4.out', stagger: 0.1,
      })
      gsap.from('.wm-sub', {
        scrollTrigger: { trigger: '.wm-sub', start: 'top 90%' },
        y: 35, opacity: 0, duration: 1.0, ease: 'power3.out',
      })
      gsap.from('.wm-tabs-row', {
        scrollTrigger: { trigger: '.wm-tabs-row', start: 'top 90%' },
        y: 25, opacity: 0, duration: 0.8, ease: 'power3.out',
      })
      gsap.from('.wm-card', {
        scrollTrigger: { trigger: '.wm-card', start: 'top 85%' },
        y: 50, opacity: 0, duration: 1.0, ease: 'power4.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* Animate content on tab switch */
  useEffect(() => {
    if (!contentRef.current) return
    gsap.fromTo(
      contentRef.current.querySelectorAll('.wm-anim'),
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out', overwrite: true }
    )
  }, [active])

  const mode = modes[active]
  const Icon = mode.icon

  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="section-base" style={{ background: 'var(--bg)' }}>
      <div className="noise-overlay" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="wm-header text-center mb-10">
          <div className="wm-label section-label justify-center mb-7" style={{ opacity: 0 }}>Workspace Modes</div>
          <h2
            className="font-display font-bold"
            style={{ fontSize: 'clamp(30px, 4.5vw, 60px)', letterSpacing: '-0.025em', lineHeight: 1.07 }}
          >
            <div className="reveal-wrap">
              <span className="wm-line block text-white">Every Space,</span>
            </div>
            <div className="reveal-wrap">
              <span className="wm-line block gradient-text">Perfectly Designed</span>
            </div>
          </h2>
          <p
            className="wm-sub font-body mt-4 max-w-xl mx-auto"
            style={{ color: 'var(--text-2)', fontSize: '15px', lineHeight: 1.75, opacity: 0 }}
          >
            From intimate huddle rooms to executive boardrooms — we design AV systems tailored to how your team actually works.
          </p>
        </div>

        {/* Tab bar */}
        <div className="wm-tabs-row flex flex-wrap justify-center gap-2 mb-12">
          {modes.map((m, i) => {
            const TabIcon = m.icon
            return (
              <button
                key={m.id}
                onClick={() => setActive(i)}
                className={`tab-btn flex items-center gap-1.5 ${active === i ? 'active' : ''}`}
              >
                <TabIcon size={12} />
                {m.label}
              </button>
            )
          })}
        </div>

        {/* Content card */}
        <div
          ref={contentRef}
          className="wm-card glass grid md:grid-cols-2 overflow-hidden"
          style={{ borderRadius: '16px', borderColor: `${mode.color}33` }}
        >
          {/* Left: info */}
          <div className="p-8 lg:p-12 flex flex-col justify-between gap-8">
            <div>
              <div
                className="wm-anim inline-flex items-center gap-3 mb-6"
                style={{
                  padding: '7px 14px',
                  background: `${mode.color}12`,
                  border: `1px solid ${mode.color}30`,
                  borderRadius: '6px',
                }}
              >
                <Icon size={14} style={{ color: mode.color }} />
                <span className="font-mono text-[10px] tracking-widest" style={{ color: mode.color }}>
                  {mode.label.toUpperCase()}
                </span>
              </div>

              <div className="reveal-wrap wm-anim">
                <h3
                  className="font-display font-bold text-white"
                  style={{ fontSize: 'clamp(22px, 3vw, 38px)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
                >
                  {mode.heading}
                </h3>
              </div>

              <p
                className="wm-anim font-body mt-4 mb-8 leading-relaxed"
                style={{ color: 'var(--text-2)', fontSize: '15px', lineHeight: 1.7 }}
              >
                {mode.desc}
              </p>

              <ul className="flex flex-col gap-3 mb-8">
                {mode.features.map((f, fi) => (
                  <li key={f} className="wm-anim flex items-center gap-3">
                    <CheckCircle2 size={13} style={{ color: mode.color, flexShrink: 0 }} />
                    <span className="font-body text-sm" style={{ color: 'var(--text-2)' }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={scrollToContact}
              className="wm-anim btn-primary self-start"
              style={{
                background: `linear-gradient(135deg, ${mode.color}, ${mode.color}bb)`,
                borderColor: `${mode.color}55`,
              }}
            >
              <span>Design My Space</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Right: visual */}
          <div
            className="relative min-h-[280px] md:min-h-0 flex items-center justify-center overflow-hidden"
            style={{ background: `radial-gradient(ellipse 65% 65% at 50% 50%, ${mode.color}14 0%, transparent 70%)` }}
          >
            <div className="absolute inset-0 grid-bg opacity-40" />

            {/* Large faded numeral */}
            <div
              className="absolute font-display font-black select-none pointer-events-none"
              style={{
                fontSize: 'clamp(130px, 18vw, 220px)',
                color: `${mode.color}0c`,
                lineHeight: 1,
                right: '-8px', bottom: '-16px',
                letterSpacing: '-0.06em',
              }}
            >
              {String(active + 1).padStart(2, '0')}
            </div>

            {/* Centre icon */}
            <div
              className="relative z-10 flex items-center justify-center rounded-2xl transition-all duration-500"
              style={{
                width: '110px', height: '110px',
                background: `${mode.color}10`,
                border: `1px solid ${mode.color}38`,
                boxShadow: `0 0 50px ${mode.color}20`,
              }}
            >
              <Icon size={44} style={{ color: mode.color }} strokeWidth={1.2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
