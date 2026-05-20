import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const spaceOptions    = ['Meeting Room','Boardroom','Huddle Space','Training Room','Multi-use Space','Digital Signage','Room Scheduling','Other']
const timelineOptions = ['ASAP','Within 1 month','1–3 months','3–6 months','Planning stage']

export default function ContactSection() {
  const sectionRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name:'', company:'', email:'', phone:'', space:'', timeline:'', message:'', date:'' })

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from('.ct-label', {
        scrollTrigger: { trigger: '.ct-header', start: 'top 86%' },
        y: 22, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
      gsap.from('.ct-line', {
        scrollTrigger: { trigger: '.ct-header', start: 'top 83%' },
        y: '110%', skewY: 1.5, duration: 1.3, ease: 'power4.out', stagger: 0.1,
      })
      gsap.from('.ct-sub', {
        scrollTrigger: { trigger: '.ct-sub', start: 'top 90%' },
        y: 35, opacity: 0, duration: 1.0, ease: 'power3.out',
      })
      gsap.from('.ct-info', {
        scrollTrigger: { trigger: '.ct-grid', start: 'top 82%' },
        x: -55, opacity: 0, duration: 1.1, ease: 'power4.out',
      })
      gsap.from('.ct-form', {
        scrollTrigger: { trigger: '.ct-grid', start: 'top 82%' },
        x: 55, opacity: 0, duration: 1.1, ease: 'power4.out',
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }

  return (
    <section ref={sectionRef} id="contact" className="section-base" style={{ background: 'var(--bg)' }}>
      <div className="noise-overlay" />
      <div className="absolute inset-0 grid-bg opacity-35" />

      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(26,107,255,0.5), var(--cyan), rgba(26,107,255,0.5), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">

        {/* Header */}
        <div className="ct-header text-center mb-14">
          <div className="ct-label section-label justify-center mb-7" style={{ opacity: 0 }}>Get In Touch</div>
          <h2
            className="font-display font-bold"
            style={{ fontSize: 'clamp(28px, 4.5vw, 58px)', letterSpacing: '-0.025em', lineHeight: 1.07 }}
          >
            <div className="reveal-wrap">
              <span className="ct-line block text-white">Let's Design Your</span>
            </div>
            <div className="reveal-wrap">
              <span className="ct-line block gradient-text">Perfect Space</span>
            </div>
          </h2>
          <p
            className="ct-sub font-body mt-5 max-w-lg mx-auto"
            style={{ color: 'var(--text-2)', fontSize: '15px', lineHeight: 1.75, opacity: 0 }}
          >
            Tell us about your project and our AV specialists will be in touch within one business day.
          </p>
        </div>

        <div className="ct-grid grid lg:grid-cols-[1fr_1.6fr] gap-10 items-start">

          {/* ── Info panel ─────────────────────────────── */}
          <div className="ct-info flex flex-col gap-6">
            <div className="glass" style={{ padding: '32px' }}>
              <h3 className="font-display font-bold text-white mb-1" style={{ fontSize: '21px', letterSpacing: '-0.01em' }}>
                PRIME WORKSPACE AV
              </h3>
              <p className="font-mono text-[10px] tracking-widest mb-8" style={{ color: 'var(--cyan)' }}>
                PREMIUM AV SOLUTIONS
              </p>

              {[
                { icon: Mail,   label: 'Email',        value: 'sales@workspaceav.com.au', href: 'mailto:sales@workspaceav.com.au' },
                { icon: MapPin, label: 'Address',      value: '14/58 Box Road, Taren Point NSW 2229', href: null },
                { icon: Clock,  label: 'Office Hours', value: 'Monday – Friday, 8:30am – 4:30pm', href: null },
              ].map(({ icon: I, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 mb-6 last:mb-0">
                  <div
                    className="w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(26,107,255,0.1)', border: '1px solid rgba(26,107,255,0.2)' }}
                  >
                    <I size={14} style={{ color: 'var(--blue-light)' }} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                      {label.toUpperCase()}
                    </p>
                    {href
                      ? <a href={href} className="font-body text-sm text-white hover:text-prime-cyan transition-colors">{value}</a>
                      : <p className="font-body text-sm text-white">{value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div
              className="glass"
              style={{ padding: '24px', background: 'linear-gradient(135deg,rgba(26,107,255,0.07),rgba(0,201,255,0.04))', borderColor: 'rgba(26,107,255,0.28)' }}
            >
              <p className="font-mono text-[10px] tracking-widest mb-4" style={{ color: 'var(--cyan)' }}>OUR PROMISE</p>
              {['Response within 1 business day','No obligation consultation','Transparent pricing','Tailored recommendation'].map(p => (
                <div key={p} className="flex items-center gap-3 mb-3 last:mb-0">
                  <CheckCircle2 size={13} style={{ color: 'var(--cyan)', flexShrink: 0 }} />
                  <span className="font-body text-sm" style={{ color: 'var(--text-2)' }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Form ───────────────────────────────────── */}
          <div className="ct-form">
            {submitted ? (
              <div
                className="glass text-center flex flex-col items-center justify-center"
                style={{ padding: '80px 40px', borderColor: 'rgba(0,201,255,0.3)', minHeight: '500px' }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ background: 'rgba(0,201,255,0.1)', border: '1px solid rgba(0,201,255,0.3)' }}
                >
                  <CheckCircle2 size={30} style={{ color: 'var(--cyan)' }} />
                </div>
                <h3 className="font-display font-bold text-white text-2xl mb-3">Request Received</h3>
                <p className="font-body" style={{ color: 'var(--text-2)', fontSize: '15px', maxWidth: '360px', lineHeight: 1.65 }}>
                  Thank you for reaching out. Our team will contact you within one business day to discuss your AV project.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass" style={{ padding: '36px 40px' }}>
                <h3 className="font-display font-semibold text-white mb-8" style={{ fontSize: '19px' }}>
                  Request Consultation
                </h3>

                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { name:'name',    label:'FULL NAME',     type:'text',  req:true,  ph:'Your full name' },
                    { name:'company', label:'COMPANY NAME',  type:'text',  req:false, ph:'Your company' },
                    { name:'email',   label:'EMAIL ADDRESS', type:'email', req:true,  ph:'you@company.com' },
                    { name:'phone',   label:'PHONE NUMBER',  type:'tel',   req:false, ph:'+61 4xx xxx xxx' },
                  ].map(({ name, label, type, req, ph }) => (
                    <div key={name}>
                      <label className="font-mono text-[10px] tracking-wider block mb-2" style={{ color: 'var(--text-muted)' }}>
                        {label}{req && ' *'}
                      </label>
                      <input
                        name={name} type={type} required={req}
                        value={form[name]} onChange={handleChange}
                        placeholder={ph} className="input-field"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="font-mono text-[10px] tracking-wider block mb-2" style={{ color: 'var(--text-muted)' }}>
                      TYPE OF SPACE *
                    </label>
                    <select name="space" required value={form.space} onChange={handleChange} className="input-field">
                      <option value="">Select space type</option>
                      {spaceOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] tracking-wider block mb-2" style={{ color: 'var(--text-muted)' }}>
                      PROJECT TIMELINE
                    </label>
                    <select name="timeline" value={form.timeline} onChange={handleChange} className="input-field">
                      <option value="">Select timeline</option>
                      {timelineOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                <div className="mt-5">
                  <label className="font-mono text-[10px] tracking-wider block mb-2" style={{ color: 'var(--text-muted)' }}>MESSAGE</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    rows={4} placeholder="Tell us about your project..." className="input-field resize-none"
                  />
                </div>

                <div className="mt-5">
                  <label className="font-mono text-[10px] tracking-wider block mb-2" style={{ color: 'var(--text-muted)' }}>
                    PREFERRED CONSULTATION DATE
                  </label>
                  <input
                    name="date" type="date" value={form.date} onChange={handleChange}
                    className="input-field" style={{ colorScheme: 'dark' }}
                  />
                </div>

                <button type="submit" className="btn-primary w-full mt-8 justify-center">
                  <span>Request Consultation</span>
                  <ArrowRight size={14} />
                </button>

                <p className="text-center mt-4 font-body text-xs" style={{ color: 'var(--text-muted)' }}>
                  We respect your privacy. Your information is never shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
