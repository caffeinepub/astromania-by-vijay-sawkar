import { Star, CheckCircle, Clock, Monitor, Users, ChevronRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const services = [
  {
    id: 'vedic-astrology',
    emoji: '🔭',
    title: 'Vedic Astrology',
    subtitle: 'Jyotish Shastra',
    description:
      'Unlock the secrets of your birth chart with classical Parashari and Jaimini Vedic Astrology. Get precise predictions on career, relationships, health, and finances.',
    includes: [
      'Birth Chart (Kundali) Analysis',
      'Planetary Dasha & Antardasha',
      'Transit (Gochar) Predictions',
      'Remedial Measures',
      'Annual Horoscope (Varshaphal)',
    ],
    modes: ['Online', 'Offline'],
    duration: '60–90 min',
    color: 'from-yellow-500/20 to-orange-500/10',
    border: 'border-yellow-500/30',
    accent: 'text-yellow-400',
  },
  {
    id: 'vastu-shastra',
    emoji: '🏠',
    title: 'Vastu Shastra',
    subtitle: 'Space Energy Alignment',
    description:
      'Harmonize your living and working spaces with the five elements and directional energies of Vastu Shastra for prosperity, health, and peace.',
    includes: [
      'Home / Office Vastu Audit',
      'Floor Plan Analysis',
      'Directional Corrections',
      'Remedies Without Demolition',
      'New Property Guidance',
    ],
    modes: ['Online', 'Offline', 'Site Visit'],
    duration: '90–120 min',
    color: 'from-green-500/20 to-emerald-500/10',
    border: 'border-green-500/30',
    accent: 'text-green-400',
  },
  {
    id: 'gemstone-therapy',
    emoji: '💎',
    title: 'Gemstone Therapy',
    subtitle: 'Ratna Shastra',
    description:
      'Harness the healing and energizing power of natural gemstones prescribed according to your unique planetary configuration for maximum benefit.',
    includes: [
      'Personalized Gemstone Recommendation',
      'Planetary Strength Analysis',
      'Wearing Procedure & Mantras',
      'Certification Guidance',
      'Follow-up Consultation',
    ],
    modes: ['Online', 'Offline'],
    duration: '45–60 min',
    color: 'from-cyan-500/20 to-blue-500/10',
    border: 'border-cyan-500/30',
    accent: 'text-cyan-400',
  },
  {
    id: 'muhurta',
    emoji: '⏰',
    title: 'Muhurta',
    subtitle: 'Auspicious Timing',
    description:
      'Choose the most auspicious date and time for your important life events — weddings, business launches, property purchases, travel, and more.',
    includes: [
      'Marriage Muhurta',
      'Business Launch Timing',
      'Property Purchase Date',
      'Naming Ceremony (Namkaran)',
      'Travel & Journey Muhurta',
    ],
    modes: ['Online', 'Offline'],
    duration: '30–45 min',
    color: 'from-purple-500/20 to-violet-500/10',
    border: 'border-purple-500/30',
    accent: 'text-purple-400',
  },
  {
    id: 'kundali-matching',
    emoji: '💑',
    title: 'Kundali Matching',
    subtitle: 'Vivah Milan',
    description:
      'Ensure a harmonious and prosperous marriage with comprehensive horoscope compatibility analysis using traditional Ashtakoot and Dashakoot methods.',
    includes: [
      'Ashtakoot Guna Milan (36 Points)',
      'Mangal Dosha Analysis',
      'Nadi Dosha Check',
      'Longevity & Compatibility',
      'Remedies for Doshas',
    ],
    modes: ['Online', 'Offline'],
    duration: '60 min',
    color: 'from-pink-500/20 to-rose-500/10',
    border: 'border-pink-500/30',
    accent: 'text-pink-400',
  },
  {
    id: 'new-kundali',
    emoji: '📜',
    title: 'New Kundali',
    subtitle: 'Kundali Preparation',
    description:
      'Get a detailed, hand-crafted birth chart (Kundali) prepared with complete planetary positions, house analysis, and a comprehensive astrological report for your lifetime reference.',
    includes: [
      'Complete Birth Chart Preparation',
      'All 16 Divisional Charts (Shodasvarga)',
      'Planetary Strength (Shadbala)',
      'Dasha Timeline for Life',
      'Written Astrological Report',
    ],
    modes: ['Online', 'Offline'],
    duration: '45–60 min',
    color: 'from-amber-500/20 to-yellow-500/10',
    border: 'border-amber-500/30',
    accent: 'text-amber-400',
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-navy via-background to-background" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 40%, oklch(0.75 0.18 55) 0%, transparent 50%), radial-gradient(circle at 70% 60%, oklch(0.65 0.15 200) 0%, transparent 50%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cosmic-gold/30 bg-cosmic-gold/10 text-cosmic-gold text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Our Services
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 bg-gradient-to-r from-cosmic-gold via-yellow-300 to-cosmic-gold bg-clip-text text-transparent">
            Vedic Sciences for Modern Life
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ancient wisdom, practical guidance. Explore our comprehensive range of Vedic consultation services.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className={`group relative bg-gradient-to-br ${service.color} border ${service.border} rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 flex flex-col`}
              >
                {/* Header */}
                <div className="mb-4">
                  <span className="text-5xl mb-3 block">{service.emoji}</span>
                  <h2 className={`text-xl font-bold ${service.accent} mb-1`}>{service.title}</h2>
                  <p className="text-sm text-muted-foreground italic">{service.subtitle}</p>
                </div>

                {/* Description */}
                <p className="text-foreground/80 text-sm leading-relaxed mb-5">{service.description}</p>

                {/* Includes */}
                <div className="mb-5 flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Includes</p>
                  <ul className="space-y-1.5">
                    {service.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${service.accent}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Monitor className="w-4 h-4 shrink-0" />
                    <span>{service.modes.join(' · ')}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to="/book-consultation"
                  className={`mt-4 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border ${service.border} ${service.accent} text-sm font-medium hover:bg-white/5 transition-colors`}
                >
                  Book This Service <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-cosmic-navy/20 border-t border-cosmic-gold/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-cosmic-gold mb-3">Why Choose Vijay Sawkar?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              25+ years of authentic Vedic practice with thousands of satisfied clients
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🎓', title: 'Certified Expert', desc: 'Formally certified in Vedic Astrology, Vastu, and Gemstone Therapy' },
              { icon: '⭐', title: '98% Accuracy', desc: 'Consistently high accuracy rate validated by thousands of clients' },
              { icon: '🌐', title: 'Online & Offline', desc: 'Flexible consultation modes to suit your convenience' },
              { icon: '🔒', title: 'Confidential', desc: 'All consultations are strictly private and confidential' },
            ].map((item, i) => (
              <div key={i} className="bg-cosmic-navy/50 border border-cosmic-gold/20 rounded-xl p-5 text-center">
                <span className="text-4xl mb-3 block">{item.icon}</span>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-cosmic-gold mb-4">Ready to Begin?</h2>
          <p className="text-muted-foreground mb-8">
            Book your consultation today and take the first step towards cosmic clarity.
          </p>
          <Link
            to="/book-consultation"
            className="inline-flex items-center gap-2 px-8 py-3 bg-cosmic-gold text-cosmic-navy font-semibold rounded-full hover:bg-yellow-400 transition-colors"
          >
            Book a Consultation <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
