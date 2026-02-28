import { Link } from '@tanstack/react-router';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';
import { SiInstagram, SiFacebook, SiYoutube } from 'react-icons/si';

const services = [
  { label: 'Vedic Astrology', path: '/services' },
  { label: 'Vastu Shastra', path: '/services' },
  { label: 'Gemstone Therapy', path: '/services' },
  { label: 'Muhurta', path: '/services' },
  { label: 'Kundali Matching', path: '/services' },
  { label: 'New Kundali', path: '/services' },
];

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Gemstone Shop', path: '/gemstones' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Book Consultation', path: '/book-consultation' },
  { label: 'Contact', path: '/contact' },
];

// Specific Google Maps location URL provided by the site owner
const MAPS_URL = 'https://maps.app.goo.gl/i32yhyBr9B47Sg9T7';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'astro-vastu-knowledge');

  return (
    <footer className="bg-cosmic-navy/80 border-t border-cosmic-gold/20 text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-3 mb-4">
            <img
              src="/assets/generated/astro-vastu-logo.dim_512x512.png"
              alt="Astro-Vastu Knowledge"
              className="h-12 w-12 rounded-full object-cover border border-cosmic-gold/40"
            />
            <div>
              <p className="font-bold text-cosmic-gold leading-tight">Astro-Vastu Knowledge</p>
            </div>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            Guiding lives through the ancient wisdom of Vedic Astrology, Vastu Shastra, and Gemstone Therapy for over 25 years.
          </p>
          <div className="flex items-center gap-3">
            <a href="https://instagram.com/sawkar.v" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cosmic-gold/20 hover:border-cosmic-gold/40 transition-colors">
              <SiInstagram className="w-4 h-4 text-muted-foreground hover:text-cosmic-gold" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cosmic-gold/20 hover:border-cosmic-gold/40 transition-colors">
              <SiFacebook className="w-4 h-4 text-muted-foreground hover:text-cosmic-gold" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cosmic-gold/20 hover:border-cosmic-gold/40 transition-colors">
              <SiYoutube className="w-4 h-4 text-muted-foreground hover:text-cosmic-gold" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-cosmic-gold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map(link => (
              <li key={link.path + link.label}>
                <Link to={link.path} className="text-sm text-muted-foreground hover:text-cosmic-gold transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold text-cosmic-gold mb-4 text-sm uppercase tracking-wider">Services</h3>
          <ul className="space-y-2">
            {services.map(s => (
              <li key={s.label}>
                <Link to={s.path} className="text-sm text-muted-foreground hover:text-cosmic-gold transition-colors">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-cosmic-gold mb-4 text-sm uppercase tracking-wider">Contact</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 shrink-0 mt-0.5 text-cosmic-gold" />
              <span>+91 98504 54549</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-muted-foreground">
              <Mail className="w-4 h-4 shrink-0 mt-0.5 text-cosmic-gold" />
              <span>sawkarv15@gmail.com</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-cosmic-gold" />
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cosmic-gold transition-colors underline underline-offset-2"
              >
                Margao, Goa, India
              </a>
            </li>
          </ul>
          <div className="mt-5">
            <Link
              to="/book-consultation"
              className="inline-flex items-center gap-2 px-5 py-2 bg-cosmic-gold text-cosmic-navy text-sm font-semibold rounded-full hover:bg-yellow-400 transition-colors"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cosmic-gold/10 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {year} Astro-Vastu Knowledge. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-cosmic-gold fill-cosmic-gold" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cosmic-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
