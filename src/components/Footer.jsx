import { Mail, MapPin, Clock } from 'lucide-react'

const navLinks = [
  { label: 'Solutions',  href: '#solutions' },
  { label: 'Services',   href: '#services'  },
  { label: 'Process',    href: '#process'   },
  { label: 'Contact',    href: '#contact'   },
]

const services = [
  'AV Consultation & Strategy',
  'Video Conferencing',
  'Boardroom AV',
  'Huddle Room Setup',
  'Room Scheduling',
  'Digital Signage',
  'Support & Maintenance',
  'Installation & Integration',
]

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ background: '#010309', borderTop: '1px solid rgba(26,107,255,0.1)' }}>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <span className="font-display font-bold text-white" style={{ fontSize: '15px', letterSpacing: '0.1em' }}>PRIME</span>
              <span className="font-display font-bold" style={{ fontSize: '15px', letterSpacing: '0.1em', color: 'var(--cyan)' }}> WORKSPACE AV</span>
            </div>
            <p className="font-mono text-xs tracking-widest mb-6" style={{ color: 'var(--text-muted)' }}>
              SOUND · VISION · CONTROL
            </p>
            <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Premium audio-visual technology for modern workplaces. Smarter boardrooms. Better meetings. Happier teams.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-[10px] tracking-widest mb-5" style={{ color: 'var(--blue-light)' }}>NAVIGATE</p>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="font-body text-sm transition-colors hover:text-white"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-mono text-[10px] tracking-widest mb-5" style={{ color: 'var(--blue-light)' }}>SERVICES</p>
            <ul className="flex flex-col gap-3">
              {services.map(s => (
                <li key={s}>
                  <span className="font-body text-sm" style={{ color: 'var(--text-muted)' }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[10px] tracking-widest mb-5" style={{ color: 'var(--blue-light)' }}>CONTACT US</p>
            <div className="flex flex-col gap-5">
              {[
                { icon: Mail,    text: 'sales@workspaceav.com.au', href: 'mailto:sales@workspaceav.com.au' },
                { icon: MapPin,  text: '14/58 Box Road, Taren Point NSW 2229', href: null },
                { icon: Clock,   text: 'Mon – Fri, 8:30am – 4:30pm', href: null },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon size={14} style={{ color: 'var(--blue)', flexShrink: 0, marginTop: 2 }} />
                  {href ? (
                    <a href={href} className="font-body text-sm hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>
                      {text}
                    </a>
                  ) : (
                    <span className="font-body text-sm" style={{ color: 'var(--text-muted)' }}>{text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(26,107,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[10px] tracking-wider" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} PRIME WORKSPACE AV. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono text-[10px] tracking-wider" style={{ color: 'var(--text-muted)' }}>
            ABN · TAREN POINT NSW
          </p>
        </div>
      </div>
    </footer>
  )
}
