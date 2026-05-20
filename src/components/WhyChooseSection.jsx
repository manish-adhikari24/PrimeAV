import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle2, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const reasons = [
  { num: '01', title: 'Tailored AV Design',              desc: 'No off-the-shelf templates. Every system is custom-designed for your space, team, and budget.' },
  { num: '02', title: 'Professional Workplace Technology',desc: 'Corporate-grade equipment from industry-leading brands — not consumer products repurposed for business.' },
  { num: '03', title: 'Corporate, Public & Education',    desc: 'Hundreds of installations across offices, council chambers, educational facilities and government spaces.' },
  { num: '04', title: 'Simple User Experience',           desc: 'We design systems that anyone can walk in and use confidently — no IT team required for the basics.' },
  { num: '05', title: 'Clean, Professional Installation', desc: 'Our installs are tidy, cable-managed, and respectful of your space. No mess left behind.' },
  { num: '06', title: 'End-to-End Delivery',              desc: 'Consultation, design, supply, installation, commissioning and training — all under one roof.' },
  { num: '07', title: 'Long-Term Support',                desc: "Remote monitoring, maintenance contracts and rapid support — we're here after the project ends." },
  { num: '08', title: 'Trusted AV Technology Partnerships', desc: 'Authorised resellers and integrators of industry-leading AV brands you can rely on for years.' },
]

export default function WhyChooseSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Header */
      gsap.from('.why-label', {
        scrollTrigger: { trigger: '.why-header', start: 'top 86%' },
        y: 22, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
      gsap.from('.why-line', {
        scrollTrigger: { trigger: '.why-header', start: 'top 83%' },
        y: '110%', skewY: 1.5, duration: 1.3, ease: 'power4.out', stagger: 0.1,
      })
      gsap.from('.why-sub', {
        scrollTrigger: { trigger: '.why-sub', start: 'top 90%' },
        y: 35, opacity: 0, duration: 1.0, ease: 'power3.out',
      })

      /* Reason items — staggered slide-in from left */
      gsap.from('.why-item', {
        scrollTrigger: { trigger: '.why-grid', start: 'top 82%' },
        x: -50, opacity: 0,
        duration: 0.85,
        stagger: { amount: 0.9 },
        ease: 'power4.out',
      })

      /* CTA band */
      gsap.from('.why-cta', {
        scrollTrigger: { trigger: '.why-cta', start: 'top 88%' },
        y: 50, opacity: 0, duration: 1.1, ease: 'power3.out',
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="section-base" style={{ background: 'var(--bg-2)' }}>
      <div className="noise-overlay" />
      <div className="absolute inset-0 grid-bg opacity-25" />

      {/* Glow orb */}
      <div className="absolute pointer-events-none" style={{
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '700px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(26,107,255,0.065) 0%, transparent 70%)',
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">

        {/* Header */}
        <div className="why-header text-center mb-12">
          <div className="why-label section-label justify-center mb-7" style={{ opacity: 0 }}>Why PRIME</div>
          <h2
            className="font-display font-bold"
            style={{ fontSize: 'clamp(28px, 4.5vw, 60px)', letterSpacing: '-0.025em', lineHeight: 1.07 }}
          >
            <div className="reveal-wrap">
              <span className="why-line block text-white">Why Choose</span>
            </div>
            <div className="reveal-wrap">
              <span className="why-line block gradient-text">PRIME WORKSPACE AV</span>
            </div>
          </h2>
          <p
            className="why-sub font-body mt-5 max-w-xl mx-auto"
            style={{ color: 'var(--text-2)', fontSize: '15px', lineHeight: 1.75, opacity: 0 }}
          >
            We're not just an AV supplier — we're a long-term technology partner committed to the success of every space we touch.
          </p>
        </div>

        {/* Reasons Grid */}
        <div
          className="why-grid grid gap-4 mb-16"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
        >
          {reasons.map(({ num, title, desc }) => (
            <div
              key={num}
              className="why-item glass glass-hover group relative overflow-hidden cursor-default"
              style={{ padding: '26px 28px' }}
            >
              <div className="card-line" />
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 pt-0.5">
                  <span
                    className="font-mono font-bold block mb-1.5"
                    style={{ fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.12em' }}
                  >
                    {num}
                  </span>
                  <CheckCircle2 size={16} style={{ color: 'var(--blue)' }} />
                </div>
                <div>
                  <h3
                    className="font-display font-semibold text-white mb-2"
                    style={{ fontSize: '15px', letterSpacing: '-0.01em' }}
                  >
                    {title}
                  </h3>
                  <p className="font-body leading-relaxed" style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                    {desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA band */}
        <div
          className="why-cta glass text-center"
          style={{
            padding: '52px 32px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(26,107,255,0.08), rgba(0,201,255,0.04))',
            borderColor: 'rgba(26,107,255,0.28)',
            opacity: 0,
          }}
        >
          <h3
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: 'clamp(22px, 3vw, 36px)', letterSpacing: '-0.02em' }}
          >
            Ready to Upgrade Your Workspace?
          </h3>
          <p className="font-body mb-8 max-w-lg mx-auto" style={{ color: 'var(--text-2)', fontSize: '15px', lineHeight: 1.65 }}>
            Book a free consultation with our AV specialists and let's design the perfect system for your space.
          </p>
          <button onClick={scrollToContact} className="btn-primary">
            <span>Book Free Consultation</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  )
}
