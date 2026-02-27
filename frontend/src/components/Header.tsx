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
    <header className="sticky top-0 z-40 border-b border-cosmic-gold/20 shadow-lg"
      style={{ background: 'linear-gradient(135deg, oklch(0.18 0.04 240) 0%, oklch(0.22 0.06 230) 60%, oklch(0.26 0.08 220) 100%)', boxShadow: '0 0 30px oklch(0.55 0.12 220 / 0.25)' }}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src="/assets/generated/astro-vastu-logo.dim_512x512.png"
            alt="Astro-Vastu Knowledge"
            className="h-10 w-10 rounded-full object-cover border border-cosmic-gold/40"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-cosmic-gold leading-tight">Astro-Vastu Knowledge</p>
            <p className="text-xs text-muted-foreground leading-tight">Vijay Sawkar</p>
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
        <div className="flex items-center gap-3">
          <button
            onClick={handleAuth}
            disabled={isLoggingIn}
            className={`hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              isAuthenticated
                ? 'bg-white/10 hover:bg-white/20 text-foreground/80'
                : 'bg-cosmic-gold/20 hover:bg-cosmic-gold/30 text-cosmic-gold border border-cosmic-gold/30'
            } disabled:opacity-50`}
          >
            {isLoggingIn ? (
              <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Logging in...</>
            ) : isAuthenticated ? (
              <><LogOut className="w-3.5 h-3.5" /> Logout</>
            ) : (
              <><LogIn className="w-3.5 h-3.5" /> Login</>
            )}
          </button>

          <button
            className="lg:hidden p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(v => !v)}
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
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
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
                className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-left flex items-center gap-2 ${
                  isAuthenticated
                    ? 'text-foreground/70 hover:bg-white/5'
                    : 'text-cosmic-gold hover:bg-cosmic-gold/10'
                } disabled:opacity-50`}
              >
                {isLoggingIn ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Logging in...</>
                ) : isAuthenticated ? (
                  <><LogOut className="w-4 h-4" /> Logout</>
                ) : (
                  <><LogIn className="w-4 h-4" /> Login</>
                )}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
