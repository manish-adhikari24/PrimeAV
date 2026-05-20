import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MicOff, Wifi, Cable, LayoutDashboard, Camera, Calendar, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const problems = [
  {
    icon: MicOff,
    title: 'Poor Audio Clarity',
    desc: 'Voices cut out, echo haunts every call. Participants strain to hear, losing focus and wasting time.',
  },
  {
    icon: Wifi,
    title: 'Calls Dropping & Freezing',
    desc: 'Video conferencing freezes at critical moments, damaging client relationships and team morale.',
  },
  {
    icon: Cable,
    title: 'Cable Connection Chaos',
    desc: 'Guests waste the first 10 minutes hunting for adapters instead of presenting ideas.',
  },
  {
    icon: LayoutDashboard,
    title: 'Confusing Controls',
    desc: 'Multiple remotes, different interfaces — nobody knows how to run the room quickly and confidently.',
  },
  {
    icon: Camera,
    title: 'Outdated Cameras & Screens',
    desc: 'Blurry cameras and dull displays make your brand look second-rate to every visitor.',
  },
  {
    icon: Calendar,
    title: 'No Room Scheduling',
    desc: 'Double bookings cause chaos. Teams show up to occupied rooms with no visibility on availability.',
  },
  {
    icon: Users,
    title: 'Remote Staff Disconnected',
    desc: "Hybrid teams feel excluded when remote participants can't be seen or heard properly.",
  },
]

export default function ProblemSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Section label */
      gsap.from('.prob-label', {
        scrollTrigger: { trigger: '.prob-header', start: 'top 86%' },
        y: 22, opacity: 0, duration: 0.9, ease: 'power3.out',
      })

      /* Heading — line-by-line mask reveal with skewY */
      gsap.from('.prob-line', {
        scrollTrigger: { trigger: '.prob-header', start: 'top 83%' },
        y: '110%', skewY: 1.5,
        duration: 1.3, ease: 'power4.out', stagger: 0.1,
      })

      /* Sub-text */
      gsap.from('.prob-sub', {
        scrollTrigger: { trigger: '.prob-sub', start: 'top 88%' },
        y: 38, opacity: 0, duration: 1.0, ease: 'power3.out',
      })

      /* Cards — staggered reveal, left-to-right wave */
      gsap.from('.prob-card', {
        scrollTrigger: { trigger: '.prob-grid', start: 'top 82%', end: 'top 30%' },
        y: 75, opacity: 0,
        duration: 1.0,
        stagger: { amount: 0.85, from: 'start' },
        ease: 'power4.out',
      })

      /* Top divider line draws left → right */
      gsap.from('.prob-divider', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 92%' },
        scaleX: 0, duration: 1.2, ease: 'power2.out', transformOrigin: 'left',
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-base grid-bg" style={{ background: 'var(--bg)' }}>
      <div className="noise-overlay" />

      {/* Section top accent line */}
      <div
        className="prob-divider absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, var(--blue), var(--cyan), transparent)', opacity: 0.3 }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="prob-header text-center mb-12">
          <div className="prob-label section-label justify-center mb-7" style={{ opacity: 0 }}>
            The Challenge
          </div>
          <h2
            className="font-display font-bold"
            style={{ fontSize: 'clamp(30px, 5vw, 64px)', letterSpacing: '-0.025em', lineHeight: 1.07 }}
          >
            <div className="reveal-wrap">
              <span className="prob-line block text-white">When Your Technology</span>
            </div>
            <div className="reveal-wrap">
              <span className="prob-line block gradient-text">Works Against You</span>
            </div>
          </h2>
        </div>

        <p
          className="prob-sub text-center font-body mb-16 max-w-xl mx-auto"
          style={{ color: 'var(--text-2)', fontSize: '15.5px', lineHeight: 1.75, opacity: 0 }}
        >
          Poor AV systems don't just frustrate — they cost you deals, time, and credibility.
          These are the seven most common problems we solve every day.
        </p>

        {/* Cards grid */}
        <div
          className="prob-grid grid gap-5"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
        >
          {problems.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="prob-card glass glass-hover group cursor-default relative overflow-hidden"
              style={{ padding: '28px' }}
            >
              {/* Bottom glow line on hover */}
              <div className="card-line" />

              <div
                className="mb-5 w-11 h-11 flex items-center justify-center rounded-lg transition-all duration-400 group-hover:scale-110"
                style={{
                  background: 'rgba(26,107,255,0.1)',
                  border: '1px solid rgba(26,107,255,0.2)',
                }}
              >
                <Icon size={19} style={{ color: 'var(--blue-light)' }} />
              </div>

              <h3
                className="font-display font-semibold mb-3 text-white"
                style={{ fontSize: '15.5px', letterSpacing: '-0.01em' }}
              >
                {title}
              </h3>
              <p className="font-body leading-relaxed" style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
