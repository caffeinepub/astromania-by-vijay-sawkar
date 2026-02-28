import { Star, ChevronRight, Users, Clock, Award, MapPin } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const services = [
  { emoji: '🔭', title: 'Vedic Astrology', desc: 'Birth chart analysis, dasha predictions, and life path guidance.' },
  { emoji: '🏠', title: 'Vastu Shastra', desc: 'Align your spaces with cosmic energies for prosperity and peace.' },
  { emoji: '💎', title: 'Gemstone Therapy', desc: 'Personalized gemstone recommendations based on your chart.' },
  { emoji: '⏰', title: 'Muhurta', desc: 'Auspicious timing for weddings, business launches, and more.' },
  { emoji: '💑', title: 'Kundali Matching', desc: 'Comprehensive horoscope compatibility for marriage.' },
  { emoji: '📜', title: 'New Kundali', desc: 'Detailed birth chart preparation with full planetary analysis.' },
];

const stats = [
  { icon: Users, value: '500,000+', label: 'Happy Clients' },
  { icon: Clock, value: '25+', label: 'Years Experience' },
  { icon: Award, value: '98%', label: 'Accuracy Rate' },
  { icon: MapPin, value: 'Margao', label: 'Goa, India' },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    text: 'Vijay ji\'s predictions were incredibly accurate. His guidance helped me make the right career decision.',
    rating: 5,
    service: 'Vedic Astrology',
  },
  {
    name: 'Rahul Mehta',
    text: 'The Vastu consultation transformed our home. We\'ve seen remarkable improvements in family harmony.',
    rating: 5,
    service: 'Vastu Shastra',
  },
  {
    name: 'Sunita Patel',
    text: 'The gemstone recommendation was spot on. I\'ve been wearing it for 6 months and the results are amazing.',
    rating: 5,
    service: 'Gemstone Therapy',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-navy/80 via-background/60 to-background" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, oklch(0.75 0.18 55) 0%, transparent 40%), radial-gradient(circle at 80% 70%, oklch(0.65 0.15 200) 0%, transparent 40%)',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cosmic-gold/30 bg-cosmic-gold/10 text-cosmic-gold text-sm font-medium mb-8">
            <Star className="w-4 h-4 fill-cosmic-gold" />
            25+ Years of Vedic Wisdom
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cosmic-gold via-yellow-300 to-cosmic-gold bg-clip-text text-transparent">
              Vijay Sawkar
            </span>
            <br />
            <span className="text-foreground text-3xl md:text-4xl font-normal">
              Vedic Astrologer & Vastu Consultant
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Unlock the cosmic blueprint of your life. Expert guidance in Vedic Astrology, Vastu Shastra, and Gemstone Therapy from Margao's most trusted astrologer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-consultation"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-cosmic-gold text-cosmic-navy font-semibold rounded-full hover:bg-yellow-400 transition-colors text-lg"
            >
              Book Consultation <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-cosmic-gold/40 text-cosmic-gold rounded-full hover:bg-cosmic-gold/10 transition-colors text-lg"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 bg-cosmic-navy/40 border-y border-cosmic-gold/20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="w-6 h-6 text-cosmic-gold mx-auto mb-2" />
              <p className="text-2xl font-bold text-cosmic-gold font-display">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-cosmic-gold mb-3">Our Services</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive Vedic sciences for every aspect of your life
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="group bg-cosmic-navy/40 border border-cosmic-gold/20 rounded-2xl p-6 hover:border-cosmic-gold/50 hover:bg-cosmic-navy/60 transition-all duration-300"
              >
                <span className="text-4xl mb-4 block">{service.emoji}</span>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-cosmic-gold transition-colors">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-cosmic-gold/40 text-cosmic-gold rounded-full hover:bg-cosmic-gold/10 transition-colors"
            >
              View All Services <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 bg-cosmic-navy/20 border-t border-cosmic-gold/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-cosmic-gold mb-3">What Clients Say</h2>
            <p className="text-muted-foreground">Trusted by thousands across India and beyond</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-cosmic-navy/50 border border-cosmic-gold/20 rounded-2xl p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-cosmic-gold text-cosmic-gold" />
                  ))}
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-cosmic-cyan">{t.service}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-cosmic-gold/40 text-cosmic-gold rounded-full hover:bg-cosmic-gold/10 transition-colors"
            >
              Read All Testimonials <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-cosmic-gold mb-4">
            Begin Your Cosmic Journey
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Book a personal consultation with Vijay Sawkar and discover what the stars have in store for you.
          </p>
          <Link
            to="/book-consultation"
            className="inline-flex items-center gap-2 px-10 py-4 bg-cosmic-gold text-cosmic-navy font-bold rounded-full hover:bg-yellow-400 transition-colors text-lg"
          >
            Book Your Consultation <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
