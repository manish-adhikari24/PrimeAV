import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Volume2, Eye, Sliders, CheckCircle2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const panels = [
  {
    id: 'sound',
    num: '01',
    icon: Volume2,
    title: 'Sound',
    tagline: 'Every voice heard clearly.',
    description:
      'From ceiling microphone arrays to distributed speaker systems, we design audio that captures every voice — no dead zones, no echo, no strain.',
    features: [
      'Ceiling & tabletop microphone arrays',
      'Distributed speaker systems',
      'Echo cancellation & noise suppression',
      'Speaker amplifiers & DSP processing',
      'Crystal-clear conferencing audio',
    ],
    accent: '#1a6bff',
    bgColor: 'rgba(26,107,255,0.055)',
    bg: 'radial-gradient(ellipse 70% 55% at 80% 50%, rgba(26,107,255,0.14) 0%, transparent 70%)',
  },
  {
    id: 'vision',
    num: '02',
    icon: Eye,
    title: 'Vision',
    tagline: 'Every screen, camera and display working beautifully.',
    description:
      'Ultra-sharp 4K displays, AI-framing cameras and video walls that make remote participants feel present and your brand shine.',
    features: [
      '4K commercial displays & video walls',
      'PTZ & AI-framing cameras',
      'Wireless presentation systems',
      'Digital signage & wayfinding',
      'Multi-screen boardroom layouts',
    ],
    accent: '#00c9ff',
    bgColor: 'rgba(0,201,255,0.045)',
    bg: 'radial-gradient(ellipse 70% 55% at 20% 50%, rgba(0,201,255,0.12) 0%, transparent 70%)',
  },
  {
    id: 'control',
    num: '03',
    icon: Sliders,
    title: 'Control',
    tagline: 'One-touch control for the entire room.',
    description:
      'Unified control systems bring lighting, blinds, displays, cameras and scheduling into a single touch panel — start any meeting in seconds.',
    features: [
      'One-touch meeting launch',
      'Lighting & blind automation',
      'Room scheduling panels',
      'Microsoft 365 & Google Calendar sync',
      'Remote monitoring & support',
    ],
    accent: '#9b6bff',
    bgColor: 'rgba(107,66,255,0.05)',
    bg: 'radial-gradient(ellipse 70% 55% at 80% 50%, rgba(107,66,255,0.13) 0%, transparent 70%)',
  },
]

export default function SolutionSection() {
  const outerRef  = useRef(null)
  const stickyRef = useRef(null)
  const bgFillRef = useRef(null)
  const panel1Ref = useRef(null)
  const panel2Ref = useRef(null)
  const panel3Ref = useRef(null)
  const panelRefs = [panel1Ref, panel2Ref, panel3Ref]
  const [active, setActive] = useState(0)

  /* Panel content re-animates each time the active panel changes */
  useEffect(() => {
    const panel = panelRefs[active]?.current
    if (!panel) return
    gsap.fromTo(
      panel.querySelectorAll('.panel-item'),
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.07, ease: 'power3.out', overwrite: true }
    )
  }, [active]) // eslint-disable-line

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Section header reveal (before pin starts) ─────── */
      gsap.from('.sol-label', {
        scrollTrigger: { trigger: '.sol-header', start: 'top 85%' },
        y: 24, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
      gsap.from('.sol-h2-line', {
        scrollTrigger: { trigger: '.sol-header', start: 'top 82%' },
        y: '110%', skewY: 1.5, duration: 1.3, ease: 'power4.out', stagger: 0.1,
      })

      /* ── Initial panel states ──────────────────────────── */
      gsap.set(panel2Ref.current, { opacity: 0, y: 50 })
      gsap.set(panel3Ref.current, { opacity: 0, y: 50 })

      /* ── Scrub timeline (drives panel transitions) ──────── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: 'top top',
          end: '+=280%',         // ≈ 3× viewport of extra scroll space
          pin: stickyRef.current,
          scrub: 1.6,            // silky lag between scroll and animation
          onUpdate: (self) => {
            const p = self.progress
            const next = p < 0.34 ? 0 : p < 0.67 ? 1 : 2
            setActive(prev => prev !== next ? next : prev)
          },
        },
      })

      /* Panel 0 → 1 */
      tl.to(panel1Ref.current, { opacity: 0, y: -55, duration: 1 }, 0.5)
      tl.to(panel2Ref.current, { opacity: 1, y:   0, duration: 1 }, 0.5)
      /* Bg color shift */
      tl.to(bgFillRef.current, { backgroundColor: panels[1].bgColor, duration: 0.8 }, 0.5)

      /* Panel 1 → 2 */
      tl.to(panel2Ref.current, { opacity: 0, y: -55, duration: 1 }, 2.2)
      tl.to(panel3Ref.current, { opacity: 1, y:   0, duration: 1 }, 2.2)
      /* Bg color shift */
      tl.to(bgFillRef.current, { backgroundColor: panels[2].bgColor, duration: 0.8 }, 2.2)

    }, outerRef)

    return () => ctx.revert()
  }, []) // eslint-disable-line

  return (
    <div ref={outerRef} id="solutions" style={{ height: '420vh', position: 'relative' }}>
      <div
        ref={stickyRef}
        className="w-full overflow-hidden relative"
        style={{ height: '100vh' }}
      >
        {/* Dynamic bg fill — colour shifts between panels */}
        <div
          ref={bgFillRef}
          className="absolute inset-0 transition-colors"
          style={{ backgroundColor: panels[0].bgColor }}
        />
        {/* Grid texture */}
        <div className="absolute inset-0 grid-bg opacity-50" />
        {/* Top fade-in from section above */}
        <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{
          background: 'linear-gradient(180deg, var(--bg) 0%, transparent 100%)',
        }} />

        {/* ── Pinned header ──────────────────────────────── */}
        <div
          className="sol-header absolute top-0 left-0 right-0 z-20 text-center px-6 lg:px-16"
          style={{
            paddingTop: '88px',
            paddingBottom: '24px',
            background: 'linear-gradient(180deg, rgba(4,13,31,0.95) 65%, transparent)',
          }}
        >
          <div className="sol-label section-label justify-center mb-4">Our Approach</div>
          <h2
            className="font-display font-bold"
            style={{ fontSize: 'clamp(1.7rem, 3.6vw, 3.2rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
          >
            <span className="reveal-wrap inline-block">
              <span className="sol-h2-line inline-block text-white">Sound &nbsp;·&nbsp; </span>
            </span>
            <span className="reveal-wrap inline-block">
              <span className="sol-h2-line inline-block gradient-text">Vision</span>
            </span>
            <span className="text-white"> &nbsp;·&nbsp; </span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>Control</span>
          </h2>

          {/* Progress pills */}
          <div className="flex justify-center gap-2.5 mt-5">
            {panels.map((p, i) => (
              <div
                key={p.id}
                className="rounded-full transition-all duration-700"
                style={{
                  width: active === i ? '32px' : '8px',
                  height: '8px',
                  background: active === i ? p.accent : 'rgba(255,255,255,0.15)',
                  boxShadow: active === i ? `0 0 10px ${p.accent}88` : 'none',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Panel stack ────────────────────────────────── */}
        {panels.map(({ id, num, icon: Icon, title, tagline, description, features, accent, bg }, i) => (
          <div
            key={id}
            ref={panelRefs[i]}
            className="absolute inset-0 flex items-center justify-center px-6 lg:px-16"
            style={{ paddingTop: '180px', paddingBottom: '40px' }}
          >
            {/* Panel radial glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: bg }} />

            <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* LEFT — number + headline */}
              <div>
                {/* Big background number */}
                <div
                  className="panel-item bg-numeral mb-1 select-none pointer-events-none"
                  style={{ fontSize: 'clamp(80px, 11vw, 140px)' }}
                >
                  {num}
                </div>

                <div
                  className="panel-item w-12 h-12 flex items-center justify-center rounded-xl mb-5"
                  style={{ background: `${accent}1a`, border: `1px solid ${accent}44` }}
                >
                  <Icon size={22} style={{ color: accent }} />
                </div>

                <div className="reveal-wrap panel-item">
                  <h3
                    className="font-display font-bold"
                    style={{
                      fontSize: 'clamp(3rem, 6.5vw, 5.5rem)',
                      color: accent,
                      letterSpacing: '-0.045em',
                      lineHeight: 1,
                      fontWeight: 700,
                    }}
                  >
                    {title}
                  </h3>
                </div>

                <p
                  className="panel-item font-display font-medium mt-3 mb-4"
                  style={{ fontSize: 'clamp(15px, 1.6vw, 20px)', color: 'rgba(255,255,255,0.65)' }}
                >
                  {tagline}
                </p>
                <p className="panel-item font-body leading-relaxed" style={{ color: 'var(--text-2)', fontSize: '15px' }}>
                  {description}
                </p>
              </div>

              {/* RIGHT — feature list */}
              <div className="panel-item glass" style={{ padding: '28px 30px' }}>
                <p
                  className="font-mono text-[10px] tracking-widest mb-5"
                  style={{ color: accent }}
                >
                  KEY CAPABILITIES
                </p>
                <ul className="flex flex-col gap-4">
                  {features.map((f, fi) => (
                    <li key={f} className={`panel-item flex items-start gap-3`}>
                      <CheckCircle2 size={14} style={{ color: accent, flexShrink: 0, marginTop: 3 }} />
                      <span className="font-body" style={{ color: 'var(--text-2)', fontSize: '14px' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {/* Bottom scroll cue */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center pointer-events-none">
          <span className="font-mono text-[9px] tracking-widest" style={{ color: 'var(--text-muted)' }}>
            SCROLL TO EXPLORE
          </span>
        </div>
      </div>
    </div>
  )
}
