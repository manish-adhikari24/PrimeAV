import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Services',  href: '#services'  },
  { label: 'Process',   href: '#process'   },
  { label: 'Contact',   href: '#contact'   },
]

export default function Navigation() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeLink, setActiveLink] = useState('')
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveLink(href)
    }
    setMenuOpen(false)
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-scrolled' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center gap-3 group"
          >
            {/* Icon mark */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded bg-prime-blue opacity-20 group-hover:opacity-30 transition-opacity" />
              <div
                className="w-5 h-5 border-2 rounded-sm"
                style={{ borderColor: 'var(--blue)', transform: 'rotate(45deg)' }}
              />
              <div
                className="absolute w-2 h-2 rounded-full"
                style={{ background: 'var(--cyan)' }}
              />
            </div>
            <div>
              <span
                className="font-display font-semibold text-sm uppercase text-white"
                style={{ letterSpacing: '0.10em', fontSize: '13px' }}
              >
                PRIME
              </span>
              <span
                className="font-display font-semibold text-sm uppercase"
                style={{ color: '#22D3EE', letterSpacing: '0.10em', fontSize: '13px' }}
              >
                {' '}WORKSPACE AV
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <button
                  onClick={() => scrollTo(href)}
                  className={`font-body font-medium text-sm px-4 py-2 rounded transition-all duration-200 ${
                    activeLink === href
                      ? 'text-white'
                      : 'text-prime-muted hover:text-white'
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo('#contact')}
              className="hidden sm:block btn-primary text-xs py-2.5 px-5"
              style={{ fontSize: '12px', letterSpacing: '0.08em' }}
            >
              <span>Book Consultation</span>
            </button>
            <button
              className="md:hidden text-prime-muted hover:text-white transition-colors p-1"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-400 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'rgba(4,13,31,0.97)', backdropFilter: 'blur(20px)', borderTop: '1px solid var(--border)' }}
      >
        <div className="px-6 py-6 flex flex-col gap-2">
          {navLinks.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className="text-left text-prime-muted hover:text-white font-body font-medium py-3 border-b transition-colors"
              style={{ borderColor: 'rgba(26,107,255,0.1)', fontSize: '15px' }}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="btn-primary mt-4 justify-center"
          >
            <span>Book Consultation</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
