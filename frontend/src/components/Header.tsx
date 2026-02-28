import { useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Menu, X, LogIn, LogOut, Loader2 } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Gemstones', path: '/gemstones' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const location = useLocation();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: unknown) {
        const err = error as Error;
        if (err?.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <header
      className="sticky top-0 z-40 border-b border-cosmic-gold/20"
      style={{
        background: 'linear-gradient(135deg, oklch(0.18 0.04 240) 0%, oklch(0.22 0.06 230) 60%, oklch(0.26 0.08 220) 100%)',
        boxShadow: '0 2px 24px oklch(0.55 0.12 220 / 0.3), 0 0 0 1px oklch(0.75 0.18 55 / 0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-cosmic-gold/20 blur-md group-hover:bg-cosmic-gold/30 transition-all duration-300" />
            <img
              src="/assets/generated/astro-vastu-logo.dim_512x512.png"
              alt="Astro-Vastu Knowledge"
              className="relative h-11 w-11 rounded-full object-cover border-2 border-cosmic-gold/50 shadow-lg group-hover:border-cosmic-gold/80 transition-all duration-300"
              style={{ boxShadow: '0 0 12px oklch(0.75 0.18 55 / 0.35)' }}
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-cosmic-gold leading-tight tracking-wide">Astro-Vastu Knowledge</p>
            <p className="text-xs text-muted-foreground leading-tight tracking-wider uppercase">Vijay Sawkar</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cosmic-gold/20 text-cosmic-gold'
                    : 'text-foreground/70 hover:text-foreground hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleAuth}
            disabled={isLoggingIn}
            className={`hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors disabled:opacity-50 ${
              isAuthenticated
                ? 'bg-white/10 hover:bg-white/20 text-foreground border border-white/20'
                : 'bg-cosmic-gold text-cosmic-navy hover:bg-yellow-400 border border-cosmic-gold'
            }`}
          >
            {isLoggingIn ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isAuthenticated ? (
              <LogOut className="w-4 h-4" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            {isLoggingIn ? 'Logging in…' : isAuthenticated ? 'Logout' : 'Login'}
          </button>

          <button
            onClick={() => setMobileOpen(v => !v)}
            className="lg:hidden p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-cosmic-gold/10 bg-cosmic-navy/95 backdrop-blur-sm">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-cosmic-gold/20 text-cosmic-gold'
                      : 'text-foreground/70 hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-cosmic-gold/10 mt-1">
              <button
                onClick={() => { handleAuth(); setMobileOpen(false); }}
                disabled={isLoggingIn}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors disabled:opacity-50 ${
                  isAuthenticated
                    ? 'bg-white/10 hover:bg-white/20 text-foreground border border-white/20'
                    : 'bg-cosmic-gold text-cosmic-navy hover:bg-yellow-400'
                }`}
              >
                {isLoggingIn ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isAuthenticated ? (
                  <LogOut className="w-4 h-4" />
                ) : (
                  <LogIn className="w-4 h-4" />
                )}
                {isLoggingIn ? 'Logging in…' : isAuthenticated ? 'Logout' : 'Login'}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
