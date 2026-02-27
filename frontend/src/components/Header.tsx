import { useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Gemstones', path: '/gemstone-shop' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Book Consultation', path: '/book-consultation' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b shadow-cosmic"
      style={{ backgroundColor: 'rgba(6, 8, 24, 0.96)', borderColor: 'rgba(0, 204, 255, 0.2)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div
              className="h-14 w-14 flex items-center justify-center rounded-xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #0d2a6e 0%, #1a4fa8 50%, #0a3580 100%)',
                boxShadow: '0 0 12px rgba(30, 100, 220, 0.5)',
              }}
            >
              <img
                src="/assets/generated/astro-vastu-logo.dim_512x512.png"
                alt="Astro-Vastu Knowledge"
                className="h-12 w-12 object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-base leading-tight block"
                style={{ color: '#f5c842' }}>
                Astro-Vastu Knowledge
              </span>
              <span className="text-xs leading-tight block" style={{ color: '#00ccff' }}>
                Vijay Sawkar
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary/15 text-primary'
                    : 'hover:bg-secondary/50'
                }`}
                style={{
                  color: location.pathname === link.path ? '#f5c842' : '#d8cfc0',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth + Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleAuth}
              disabled={loginStatus === 'logging-in'}
              className={`hidden sm:flex px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                isAuthenticated
                  ? 'bg-secondary hover:bg-secondary/80'
                  : 'hover:opacity-90'
              } disabled:opacity-50`}
              style={
                isAuthenticated
                  ? { color: '#f5efe0' }
                  : { background: 'linear-gradient(135deg, #aa44ff, #dd00ff)', color: '#ffffff' }
              }
            >
              {loginStatus === 'logging-in' ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              style={{ color: '#d8cfc0' }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t py-3 space-y-1"
            style={{ borderColor: 'rgba(0, 204, 255, 0.2)' }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary/15'
                    : 'hover:bg-secondary/50'
                }`}
                style={{
                  color: location.pathname === link.path ? '#f5c842' : '#d8cfc0',
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 px-4">
              <button
                onClick={() => { handleAuth(); setMenuOpen(false); }}
                disabled={loginStatus === 'logging-in'}
                className={`w-full py-2 rounded-full text-sm font-medium transition-all ${
                  isAuthenticated
                    ? 'bg-secondary hover:bg-secondary/80'
                    : 'hover:opacity-90'
                } disabled:opacity-50`}
                style={
                  isAuthenticated
                    ? { color: '#f5efe0' }
                    : { background: 'linear-gradient(135deg, #aa44ff, #dd00ff)', color: '#ffffff' }
                }
              >
                {loginStatus === 'logging-in' ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
