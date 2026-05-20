import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef  = useRef(null)
  const videoRef    = useRef(null)
  const overlayRef  = useRef(null)
  const scanRef     = useRef(null)
  const labelRef    = useRef(null)
  const dividerRef  = useRef(null)
  const line1Ref    = useRef(null)
  const line2Ref    = useRef(null)
  const line3Ref    = useRef(null)
  const line4Ref    = useRef(null)
  const subtitleRef = useRef(null)
  const btnsRef     = useRef(null)
  const badge1Ref   = useRef(null)
  const badge2Ref   = useRef(null)
  const scrollRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Entrance timeline ─────────────────────────────────── */
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      // 1. Video zooms gently out and fades in
      tl.from(videoRef.current, {
        opacity: 0, scale: 1.07, duration: 3, ease: 'power2.out',
      }, 0)

      // 2. Overlay fades in behind video
      tl.from(overlayRef.current, { opacity: 0, duration: 2, ease: 'power2.out' }, 0)

      // 3. Scanline sweeps top → bottom once (cinematic boot effect)
      gsap.set(scanRef.current, { top: '0%', opacity: 1 })
      tl.to(scanRef.current, {
        top: '100%', opacity: 0, duration: 1.8, ease: 'power1.inOut',
      }, 0.1)

      // 4. Divider line draws left → right
      tl.from(dividerRef.current, {
        scaleX: 0, duration: 1.1, ease: 'power3.out', transformOrigin: 'left',
      }, 0.6)

      // 5. Tag line fades + slides up
      tl.from(labelRef.current, { y: 28, opacity: 0, duration: 0.9 }, 0.85)

      // 6. Heading lines — mask reveal with subtle skewY
      // skewY: 2 (not 3) suits Sora's clean geometry — enough drama, no distortion
      const headLines = [line1Ref, line2Ref, line3Ref, line4Ref]
      headLines.forEach((r, i) => {
        tl.from(r.current, {
          y: '110%',
          skewY: 2,
          duration: 1.4,
          ease: 'power4.out',
        }, 1.0 + i * 0.12)
      })

      // 7. Subtitle fades up with slight y offset
      tl.from(subtitleRef.current, { y: 40, opacity: 0, duration: 1.1, ease: 'power3.out' }, 1.65)

      // 8. Buttons stagger in
      tl.from(Array.from(btnsRef.current.children), {
        y: 32, opacity: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out',
      }, 1.85)

      // 9. Side badges float in
      tl.from([badge1Ref.current, badge2Ref.current], {
        x: 40, opacity: 0, duration: 1.0, stagger: 0.18, ease: 'power3.out',
      }, 2.1)

      // 10. Scroll indicator
      tl.from(scrollRef.current, { opacity: 0, duration: 0.7 }, 2.5)

      /* ── Scroll parallax ──────────────────────────────────── */
      // Text layer drifts up at 0.18× scroll speed
      gsap.to('.hero-text-layer', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
        y: -110,
        ease: 'none',
      })

      // Video drifts down (opposite direction) for depth
      gsap.to(videoRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2.5,
        },
        scale: 1.14,
        ease: 'none',
      })

      // Badges drift slightly faster than text
      gsap.to([badge1Ref.current, badge2Ref.current], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.8,
        },
        y: -60,
        ease: 'none',
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '680px' }}
    >
      {/* ── Background Video ─────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transformOrigin: 'center center', willChange: 'transform' }}
        >
          <source src="/videos/Home.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Overlays ─────────────────────────────────────── */}
      <div ref={overlayRef} className="absolute inset-0">
        {/* Primary darkening gradient — heavier at bottom */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(2,5,16,0.3) 0%, rgba(2,5,16,0.5) 45%, rgba(2,5,16,0.94) 100%)',
        }} />
        {/* Left vignette to push text forward */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 65% 100% at 8% 55%, rgba(2,5,16,0.7) 0%, transparent 65%)',
        }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 hero-grid-overlay" />
        {/* Bottom fade to section bg */}
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{
          background: 'linear-gradient(0deg, #020510 0%, transparent 100%)',
        }} />
      </div>

      {/* ── Scanline (one-time cinematic sweep) ──────────── */}
      <div ref={scanRef} className="hero-scanline" style={{ top: 0 }} />

      {/* ── Ambient circuit lines ─────────────────────────── */}
      <div className="circuit-line" style={{ top: '35%', left: 0, width: '28%', animationDelay: '0s' }} />
      <div className="circuit-line" style={{
        top: '65%', right: 0, width: '22%',
        background: 'linear-gradient(270deg, transparent, rgba(0,201,255,0.3), transparent)',
        animationDelay: '2.5s',
      }} />

      {/* ── Content ──────────────────────────────────────── */}
      <div
        className="hero-text-layer absolute inset-0 flex flex-col justify-center px-6 lg:px-16 max-w-7xl mx-auto w-full"
        style={{ willChange: 'transform' }}
      >
        {/* Divider accent line */}
        <div
          ref={dividerRef}
          className="mb-7 h-px"
          style={{
            width: '72px',
            background: 'linear-gradient(90deg, var(--cyan), var(--blue), transparent)',
            transformOrigin: 'left',
          }}
        />

        {/* Tag label */}
        <div ref={labelRef} className="section-label mb-9" style={{ opacity: 0 }}>
          Sound &nbsp;·&nbsp; Vision &nbsp;·&nbsp; Control
        </div>

        {/* Heading — each line individually masked */}
        <div
          className="font-display text-white mb-7"
          style={{
            fontSize: 'clamp(2.8rem, 6.8vw, 7rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.045em',
            fontWeight: 800,
          }}
        >
          <div className="reveal-wrap">
            <span ref={line1Ref} className="block" style={{ display: 'block' }}>
              Transform Every
            </span>
          </div>
          <div className="reveal-wrap">
            <span ref={line2Ref} className="block gradient-text">
              Meeting Room
            </span>
          </div>
          <div className="reveal-wrap">
            <span ref={line3Ref} className="block">
              Into a Seamless
            </span>
          </div>
          <div className="reveal-wrap">
            <span ref={line4Ref} className="block" style={{ color: 'rgba(255,255,255,0.52)' }}>
              Collaboration Space
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body max-w-lg mb-11"
          style={{
            fontSize: 'clamp(1rem, 1.15vw, 1.15rem)',
            lineHeight: 1.75,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.68)',
            opacity: 0,
          }}
        >
          Premium audio-visual systems for smarter boardrooms, huddle spaces,
          conferencing, signage and hybrid workplaces.
        </p>

        {/* CTAs */}
        <div ref={btnsRef} className="flex flex-wrap gap-4">
          <button onClick={() => scrollTo('#contact')} className="btn-primary">
            <span>Book Consultation</span>
            <ArrowRight size={15} />
          </button>
          <button onClick={() => scrollTo('#solutions')} className="btn-ghost">
            Explore Solutions
          </button>
        </div>
      </div>

      {/* ── Floating stats badges (bottom-right) ─────────── */}
      <div
        className="absolute bottom-14 right-6 lg:right-12 flex flex-col gap-4 items-end hide-mobile"
        style={{ willChange: 'transform' }}
      >
        <div
          ref={badge1Ref}
          className="glass"
          style={{ padding: '13px 20px', borderRadius: '10px', opacity: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className="status-dot" />
            <div>
              <p className="font-mono text-[10px] tracking-wider" style={{ color: 'var(--cyan)' }}>
                AV SYSTEM
              </p>
              <p className="font-body font-semibold text-xs text-white">Ready to Deploy</p>
            </div>
          </div>
        </div>

        <div
          ref={badge2Ref}
          className="glass"
          style={{ padding: '13px 20px', borderRadius: '10px', opacity: 0 }}
        >
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="font-display font-bold text-xl counter-text" style={{ color: 'var(--cyan)' }}>500+</p>
              <p className="font-mono text-[9px] tracking-wider" style={{ color: 'var(--text-muted)' }}>ROOMS DONE</p>
            </div>
            <div style={{ width: '1px', height: '32px', background: 'var(--border)' }} />
            <div className="text-center">
              <p className="font-display font-bold text-xl text-white counter-text">98%</p>
              <p className="font-mono text-[9px] tracking-wider" style={{ color: 'var(--text-muted)' }}>SATISFACTION</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────── */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span className="font-mono text-[9px] tracking-widest" style={{ color: 'var(--text-muted)' }}>SCROLL</span>
        <div
          className="w-5 h-9 border rounded-full flex justify-center pt-2"
          style={{ borderColor: 'rgba(255,255,255,0.18)' }}
        >
          <div className="scroll-dot w-1 h-1.5 rounded-full" style={{ background: 'var(--cyan)' }} />
        </div>
      </div>
    </section>
  )
}
