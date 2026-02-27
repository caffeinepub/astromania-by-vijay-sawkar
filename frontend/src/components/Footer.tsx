import { Link } from '@tanstack/react-router';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';
import { SiInstagram, SiFacebook } from 'react-icons/si';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(window.location.hostname || 'vijay-sawkar-astrology');

  return (
    <footer className="border-t mt-auto"
      style={{ backgroundColor: '#060818', borderColor: 'rgba(0, 204, 255, 0.2)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-14 w-14 flex items-center justify-center">
                <img
                  src="/assets/generated/astro-vastu-logo.dim_512x512.png"
                  alt="Astro-Vastu Knowledge"
                  className="h-14 w-14 object-contain"
                  style={{ background: 'transparent' }}
                />
              </div>
              <div>
                <p className="font-display font-bold text-sm leading-tight" style={{ color: '#f5c842' }}>
                  Astro-Vastu Knowledge
                </p>
                <p className="text-xs" style={{ color: '#00ccff' }}>Vijay Sawkar</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#b8b0a0' }}>
              Guiding lives through the ancient wisdom of Vedic astrology and Vastu Shastra. Based in Margao, Goa.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/sawkar.v"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: 'rgba(0, 204, 255, 0.15)', color: '#00ccff' }}
              >
                <SiInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com/VijayS.Sawkar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: 'rgba(170, 68, 255, 0.15)', color: '#aa44ff' }}
              >
                <SiFacebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider" style={{ color: '#f5c842' }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'About', path: '/about' },
                { label: 'Services', path: '/services' },
                { label: 'Testimonials', path: '/testimonials' },
                { label: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors hover:text-primary"
                    style={{ color: '#b8b0a0' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider" style={{ color: '#f5c842' }}>
              Services
            </h3>
            <ul className="space-y-2">
              {[
                'Kundali Analysis',
                'Vastu Shastra',
                'Gemstone Therapy',
                'Marriage Compatibility',
                'Book Consultation',
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm transition-colors hover:text-primary"
                    style={{ color: '#b8b0a0' }}
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider" style={{ color: '#f5c842' }}>
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+919850454549"
                  className="flex items-center gap-2 text-sm transition-colors hover:text-primary"
                  style={{ color: '#b8b0a0' }}
                >
                  <Phone className="h-4 w-4 shrink-0" style={{ color: '#00ccff' }} />
                  +91 98504 54549
                </a>
              </li>
              <li>
                <a
                  href="mailto:sawkarv15@gmail.com"
                  className="flex items-center gap-2 text-sm transition-colors hover:text-primary break-all"
                  style={{ color: '#b8b0a0' }}
                >
                  <Mail className="h-4 w-4 shrink-0" style={{ color: '#00ccff' }} />
                  sawkarv15@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm" style={{ color: '#b8b0a0' }}>
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" style={{ color: '#00ccff' }} />
                Margao, Goa, India
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider my-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: '#7a7060' }}>
          <p>© {year} Astro-Vastu Knowledge — Vijay Sawkar. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-3 w-3 fill-current" style={{ color: '#dd00ff' }} /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-colors"
              style={{ color: '#f5c842' }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
