import { Link } from '@tanstack/react-router';
import { Star, Phone, MessageCircle, ChevronRight, Sparkles, Users, Award, Clock } from 'lucide-react';

const SERVICES = [
  {
    icon: '🔮',
    title: 'Vedic Astrology',
    description: 'Ancient wisdom for modern life — birth chart analysis, planetary transits, and personalized predictions.',
    link: '/services',
  },
  {
    icon: '🏠',
    title: 'Vastu Shastra',
    description: 'Harmonize your living and working spaces with the cosmic energy flow for prosperity and peace.',
    link: '/services',
  },
  {
    icon: '💎',
    title: 'Gemstone Therapy',
    description: 'Certified natural gemstones prescribed based on your birth chart for positive planetary influence.',
    link: '/gemstone-shop',
  },
  {
    icon: '📅',
    title: 'Muhurta (Auspicious Timing)',
    description: 'Find the most auspicious dates and times for important life events and new beginnings.',
    link: '/services',
  },
  {
    icon: '🌙',
    title: 'Numerology',
    description: 'Unlock the hidden power of numbers in your name and birth date for deeper self-understanding.',
    link: '/services',
  },
  {
    icon: '⭐',
    title: 'Kundali Matching',
    description: 'Comprehensive horoscope compatibility analysis for marriage and partnerships.',
    link: '/services',
  },
];

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: "Vijay ji's predictions were incredibly accurate. His Vastu advice transformed our home's energy completely.",
  },
  {
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    text: 'The gemstone recommendation changed my business fortunes. Highly recommend his expertise.',
  },
  {
    name: 'Anita Patel',
    location: 'Pune',
    rating: 5,
    text: 'His Kundali analysis gave me clarity about my career path. Truly a gifted astrologer.',
  },
];

const STATS = [
  { icon: Users, value: '5 Lakh+', label: 'Clients Served' },
  { icon: Award, value: '25+', label: 'Years Experience' },
  { icon: Clock, value: '10,000+', label: 'Consultations' },
  { icon: Star, value: '4.9/5', label: 'Average Rating' },
];

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: '#060818' }}
    >
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(30,20,80,0.6) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(10,40,60,0.5) 0%, transparent 60%), #060818',
        }}
      >
        {/* Decorative stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                backgroundColor: i % 3 === 0 ? '#C9A84C' : i % 3 === 1 ? '#5BC8D4' : '#ffffff',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.7 + 0.3,
                animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                animationDelay: Math.random() * 3 + 's',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="/assets/generated/astro-vastu-logo.dim_512x512.png"
              alt="Astro-Vastu Knowledge"
              className="w-48 h-48 md:w-64 md:h-64 object-contain"
              style={{ filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.4))' }}
            />
          </div>

          <div className="mb-4">
            <span
              className="text-sm font-medium tracking-[0.3em] uppercase"
              style={{ color: '#5BC8D4' }}
            >
              ✦ Vedic Wisdom for Modern Life ✦
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-cinzel"
            style={{ color: '#C9A84C', textShadow: '0 0 30px rgba(201,168,76,0.4)' }}
          >
            Astro-Vastu
            <br />
            <span style={{ color: '#ffffff' }}>Knowledge</span>
          </h1>

          <p
            className="text-xl md:text-2xl mb-4 font-cormorant italic"
            style={{ color: '#e8d5a3' }}
          >
            Vijay Sawkar — Astrology &amp; Vastu Expert
          </p>

          <p
            className="text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#b8c8d8' }}
          >
            Unlock the secrets of the cosmos and harmonize your living spaces with 25+ years of expertise in Vedic Astrology, Vastu Shastra, and Gemstone Therapy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-consultation"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #C9A84C, #a07830)',
                color: '#060818',
                boxShadow: '0 4px 20px rgba(201,168,76,0.4)',
              }}
            >
              <Sparkles className="w-5 h-5" />
              Book Consultation
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
              style={{
                border: '2px solid #C9A84C',
                color: '#C9A84C',
                backgroundColor: 'transparent',
              }}
            >
              Explore Services
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Quick contact */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 text-sm transition-colors"
              style={{ color: '#5BC8D4' }}
            >
              <Phone className="w-4 h-4" />
              +91 98765 43210
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm transition-colors"
              style={{ color: '#5BC8D4' }}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #060818)' }}
        />
      </section>

      {/* Stats Bar */}
      <section
        className="py-12 border-y"
        style={{
          backgroundColor: 'rgba(201,168,76,0.06)',
          borderColor: 'rgba(201,168,76,0.2)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon
                  className="w-8 h-8 mx-auto mb-2"
                  style={{ color: '#C9A84C' }}
                />
                <div
                  className="text-2xl md:text-3xl font-bold font-cinzel"
                  style={{ color: '#C9A84C' }}
                >
                  {stat.value}
                </div>
                <div className="text-sm mt-1" style={{ color: '#b8c8d8' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="text-sm font-medium tracking-[0.3em] uppercase"
              style={{ color: '#5BC8D4' }}
            >
              ✦ Our Offerings ✦
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold mt-3 mb-4 font-cinzel"
              style={{ color: '#C9A84C' }}
            >
              Sacred Services
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#b8c8d8' }}>
              Ancient Vedic sciences applied with modern understanding to guide your life journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.title}
                to={service.link}
                className="group block p-6 rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(20,25,60,0.8)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.5)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(201,168,76,0.15)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.2)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3
                  className="text-xl font-bold mb-2 font-cinzel"
                  style={{ color: '#C9A84C' }}
                >
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#b8c8d8' }}>
                  {service.description}
                </p>
                <div
                  className="mt-4 flex items-center gap-1 text-sm font-medium"
                  style={{ color: '#5BC8D4' }}
                >
                  Learn More <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              style={{
                border: '2px solid #C9A84C',
                color: '#C9A84C',
                backgroundColor: 'transparent',
              }}
            >
              View All Services <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: 'rgba(10,15,40,0.6)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="text-sm font-medium tracking-[0.3em] uppercase"
              style={{ color: '#5BC8D4' }}
            >
              ✦ Client Stories ✦
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold mt-3 mb-4 font-cinzel"
              style={{ color: '#C9A84C' }}
            >
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.name}
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: 'rgba(20,25,60,0.8)',
                  border: '1px solid rgba(201,168,76,0.2)',
                }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current"
                      style={{ color: '#C9A84C' }}
                    />
                  ))}
                </div>
                {/* Fixed: removed conflicting text-sm alongside text-base */}
                <p
                  className="text-base leading-relaxed mb-4 italic font-cormorant"
                  style={{ color: '#d4c5a0' }}
                >
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <div className="font-semibold" style={{ color: '#C9A84C' }}>
                    {testimonial.name}
                  </div>
                  <div className="text-xs" style={{ color: '#7a9ab0' }}>
                    {testimonial.location}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              style={{
                border: '2px solid #5BC8D4',
                color: '#5BC8D4',
                backgroundColor: 'transparent',
              }}
            >
              Read All Testimonials <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 text-center"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(30,20,80,0.5) 0%, #060818 70%)',
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-6">🌟</div>
          <h2
            className="text-3xl md:text-5xl font-bold mb-6 font-cinzel"
            style={{ color: '#C9A84C' }}
          >
            Begin Your Cosmic Journey
          </h2>
          <p className="text-lg mb-10 leading-relaxed" style={{ color: '#b8c8d8' }}>
            Let the stars guide you to clarity, prosperity, and harmony. Book a personalized consultation with Vijay Sawkar today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-consultation"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #C9A84C, #a07830)',
                color: '#060818',
                boxShadow: '0 4px 20px rgba(201,168,76,0.4)',
              }}
            >
              <Sparkles className="w-5 h-5" />
              Book Now
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
              style={{
                border: '2px solid #5BC8D4',
                color: '#5BC8D4',
                backgroundColor: 'transparent',
              }}
            >
              <Phone className="w-5 h-5" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
