import { Link } from '@tanstack/react-router';
import { ChevronRight, Sparkles, Video, Phone, MapPin, Clock } from 'lucide-react';

const SERVICE_CATEGORIES = [
  {
    icon: '🔮',
    title: 'Vedic Astrology',
    subtitle: 'Jyotish Shastra',
    description: 'Comprehensive birth chart analysis using ancient Vedic principles to illuminate your life path, karmic patterns, and future possibilities.',
    services: [
      'Janam Kundali (Birth Chart) Analysis',
      'Dasha & Antardasha Predictions',
      'Annual Horoscope (Varshaphal)',
      'Career & Finance Guidance',
      'Health & Wellness Astrology',
      'Spiritual Growth Consultation',
    ],
    color: '#C9A84C',
  },
  {
    icon: '🏠',
    title: 'Vastu Shastra',
    subtitle: 'Sacred Space Science',
    description: 'Transform your living and working environments by aligning them with cosmic energy principles for harmony, prosperity, and well-being.',
    services: [
      'Home Vastu Analysis & Correction',
      'Office & Commercial Space Vastu',
      'Plot & Land Selection',
      'New Construction Vastu Planning',
      'Vastu Remedies (Without Demolition)',
      'Factory & Industrial Vastu',
    ],
    color: '#5BC8D4',
  },
  {
    icon: '💎',
    title: 'Gemstone Therapy',
    subtitle: 'Ratna Shastra',
    description: 'Harness the healing and amplifying power of natural gemstones, prescribed based on your unique birth chart for maximum planetary benefit.',
    services: [
      'Personalized Gemstone Prescription',
      'Certified Natural Gemstones',
      'Gemstone Energization Rituals',
      'Planetary Remedy Stones',
      'Gemstone Quality Assessment',
      'Wearing Guidance & Protocols',
    ],
    color: '#C9A84C',
  },
  {
    icon: '📅',
    title: 'Muhurta',
    subtitle: 'Auspicious Timing',
    description: 'Identify the most favorable cosmic windows for your important life events, ensuring they begin under the most auspicious planetary alignments.',
    services: [
      'Marriage Muhurta Selection',
      'Business Launch Timing',
      'Property Purchase Muhurta',
      'Travel & Journey Timing',
      'Medical Procedure Timing',
      'Naming Ceremony Muhurta',
    ],
    color: '#5BC8D4',
  },
  {
    icon: '🔢',
    title: 'Numerology',
    subtitle: 'Anka Shastra',
    description: 'Discover the hidden numerical patterns in your name and birth date that shape your personality, destiny, and life opportunities.',
    services: [
      'Life Path Number Analysis',
      'Name Numerology & Correction',
      'Business Name Numerology',
      'Lucky Numbers & Dates',
      'Compatibility Analysis',
      'Personal Year Forecast',
    ],
    color: '#C9A84C',
  },
  {
    icon: '⭐',
    title: 'Kundali Matching',
    subtitle: 'Vivah Compatibility',
    description: 'Thorough horoscope compatibility analysis for marriage, examining all 36 gunas and beyond for a harmonious and lasting union.',
    services: [
      '36 Guna Milan Analysis',
      'Mangal Dosha Assessment',
      'Nadi Dosha Evaluation',
      'Compatibility Report',
      'Remedies for Doshas',
      'Auspicious Wedding Dates',
    ],
    color: '#5BC8D4',
  },
];

const CONSULTATION_MODES = [
  {
    icon: MapPin,
    title: 'In-Person',
    description: 'Visit our Goa office for a face-to-face consultation in a serene, sacred environment.',
    detail: 'Goa, India',
  },
  {
    icon: Video,
    title: 'Video Call',
    description: 'Connect from anywhere in the world via Zoom, Google Meet, or WhatsApp video.',
    detail: 'Worldwide',
  },
  {
    icon: Phone,
    title: 'Phone Call',
    description: 'Convenient telephonic consultation for quick guidance and follow-up sessions.',
    detail: 'Available Daily',
  },
  {
    icon: Clock,
    title: 'Flexible Timing',
    description: 'Morning, afternoon, and evening slots available to suit your schedule.',
    detail: '9 AM – 8 PM IST',
  },
];

export default function Services() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#060818' }}>
      {/* Hero */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 text-center"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(30,20,80,0.6) 0%, #060818 60%)',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <span
            className="text-sm font-medium tracking-[0.3em] uppercase"
            style={{ color: '#5BC8D4' }}
          >
            ✦ Sacred Services ✦
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold mt-4 mb-6 font-cinzel"
            style={{ color: '#C9A84C', textShadow: '0 0 30px rgba(201,168,76,0.3)' }}
          >
            Our Offerings
          </h1>
          <p className="text-xl font-cormorant italic mb-4" style={{ color: '#e8d5a3' }}>
            Vijay Sawkar — Astrology and Vastu Expert
          </p>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#b8c8d8' }}>
            Ancient Vedic sciences applied with modern understanding to guide every aspect of your life journey.
          </p>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {SERVICE_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="rounded-2xl p-8 transition-all duration-300"
              style={{
                backgroundColor: 'rgba(20,25,60,0.8)',
                border: `1px solid ${category.color}33`,
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{category.icon}</span>
                    <div>
                      <h2
                        className="text-2xl md:text-3xl font-bold font-cinzel"
                        style={{ color: category.color }}
                      >
                        {category.title}
                      </h2>
                      <p className="text-sm italic" style={{ color: '#7a9ab0' }}>
                        {category.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="leading-relaxed" style={{ color: '#c8d8e8' }}>
                    {category.description}
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/book-consultation"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 text-sm"
                      style={{
                        background: `linear-gradient(135deg, ${category.color}, ${category.color}99)`,
                        color: '#060818',
                      }}
                    >
                      <Sparkles className="w-4 h-4" />
                      Book This Service
                    </Link>
                  </div>
                </div>
                <div>
                  <h3
                    className="text-sm font-medium tracking-wider uppercase mb-4"
                    style={{ color: category.color }}
                  >
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-2">
                    {category.services.map((service) => (
                      <li
                        key={service}
                        className="flex items-center gap-3 text-sm"
                        style={{ color: '#c8d8e8' }}
                      >
                        {/* Fixed: flex-shrink-0 → shrink-0 */}
                        <ChevronRight
                          className="w-4 h-4 shrink-0"
                          style={{ color: category.color }}
                        />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consultation Modes */}
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
              ✦ How We Connect ✦
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold mt-3 mb-4 font-cinzel"
              style={{ color: '#C9A84C' }}
            >
              Consultation Modes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONSULTATION_MODES.map((mode) => (
              <div
                key={mode.title}
                className="p-6 rounded-xl text-center"
                style={{
                  backgroundColor: 'rgba(20,25,60,0.8)',
                  border: '1px solid rgba(201,168,76,0.2)',
                }}
              >
                <mode.icon
                  className="w-10 h-10 mx-auto mb-4"
                  style={{ color: '#C9A84C' }}
                />
                <h3
                  className="text-lg font-bold mb-2 font-cinzel"
                  style={{ color: '#C9A84C' }}
                >
                  {mode.title}
                </h3>
                <p className="text-sm mb-3 leading-relaxed" style={{ color: '#b8c8d8' }}>
                  {mode.description}
                </p>
                <span
                  className="text-xs font-medium px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: 'rgba(91,200,212,0.15)',
                    color: '#5BC8D4',
                    border: '1px solid rgba(91,200,212,0.3)',
                  }}
                >
                  {mode.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 text-center"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(30,20,80,0.5) 0%, #060818 70%)',
        }}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl md:text-5xl font-bold mb-6 font-cinzel"
            style={{ color: '#C9A84C' }}
          >
            Ready to Begin?
          </h2>
          <p className="text-lg mb-10" style={{ color: '#b8c8d8' }}>
            Vijay Sawkar — Astrology and Vastu Expert — is here to guide you. Book your personalized consultation today.
          </p>
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
            Book Your Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
