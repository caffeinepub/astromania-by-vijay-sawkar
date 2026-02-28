import { Star, Phone, ChevronRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const credentials = [
  { icon: '🎓', title: 'Jyotish Visharad', org: 'Bharatiya Vidya Bhavan' },
  { icon: '🏛️', title: 'Vastu Shastra Acharya', org: 'All India Vastu Parishad' },
  { icon: '💎', title: 'Gemstone Therapy Cert.', org: 'Gem & Jewellery Institute' },
  { icon: '⭐', title: 'Vedic Astrology Expert', org: 'Indian Council of Astrological Sciences' },
  { icon: '🔯', title: 'Muhurta Specialist', org: 'Jyotish Sangh, Pune' },
  { icon: '📜', title: 'Kundali Matching Expert', org: 'Vedic Astrology Foundation' },
];

const stats = [
  { value: '25+', label: 'Years Experience' },
  { value: '10,000+', label: 'Consultations' },
  { value: '5,000+', label: 'Happy Clients' },
  { value: '98%', label: 'Accuracy Rate' },
];

const expertiseAreas = [
  { title: 'Vedic Astrology', desc: 'Birth chart analysis, planetary transits, dasha predictions, and life path guidance based on ancient Jyotish principles.' },
  { title: 'Vastu Shastra', desc: 'Home and office space alignment with cosmic energies for prosperity, health, and harmony.' },
  { title: 'Gemstone Therapy', desc: 'Personalized gemstone recommendations based on planetary positions to enhance positive energies.' },
  { title: 'Muhurta', desc: 'Auspicious timing selection for marriages, business launches, property purchases, and other life events.' },
  { title: 'Kundali Matching', desc: 'Comprehensive horoscope compatibility analysis for marriage using traditional Ashtakoot and Dashakoot methods.' },
  { title: 'New Kundali', desc: 'Preparation of detailed birth charts with complete planetary analysis, house interpretations, and life predictions.' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-navy via-background to-background" />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, oklch(0.75 0.18 55) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.65 0.15 200) 0%, transparent 50%)' }} />
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cosmic-gold/30 bg-cosmic-gold/10 text-cosmic-gold text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            About the Astrologer
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 bg-gradient-to-r from-cosmic-gold via-yellow-300 to-cosmic-gold bg-clip-text text-transparent">
            Vijay Sawkar
          </h1>
          <p className="text-xl text-cosmic-cyan font-medium mb-2">Vedic Astrologer · Vastu Consultant · Gemstone Therapist</p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Guiding thousands of lives through the ancient wisdom of Jyotish Shastra for over 25 years
          </p>
        </div>
      </section>

      {/* ── BIOGRAPHY SECTION ── */}
      <section className="py-16 bg-gradient-to-b from-background to-cosmic-navy/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Photo */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cosmic-gold via-cosmic-cyan to-cosmic-gold opacity-40 blur-sm" />
              <div className="relative rounded-2xl overflow-hidden border border-cosmic-gold/30">
                <img
                  src="/assets/generated/about-astrologer.dim_800x600.png"
                  alt="Vijay Sawkar – Vedic Astrologer"
                  className="w-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-cosmic-navy border border-cosmic-gold/40 rounded-xl px-4 py-3 shadow-lg">
                <p className="text-cosmic-gold font-bold text-2xl leading-none">25+</p>
                <p className="text-muted-foreground text-xs">Years of Practice</p>
              </div>
            </div>

            {/* Bio Text */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-display font-bold text-cosmic-gold mb-1">About Vijay Sawkar</h2>
                <div className="h-1 w-16 bg-gradient-to-r from-cosmic-gold to-cosmic-cyan rounded-full mb-4" />
              </div>

              {/* Pull quote */}
              <blockquote className="border-l-4 border-cosmic-gold pl-4 italic text-cosmic-cyan text-lg">
                "The stars do not compel — they incline. My mission is to help you understand those inclinations and make the most of your cosmic blueprint."
              </blockquote>

              <p className="text-foreground/90 leading-relaxed">
                Pandit Vijay Sawkar is a highly respected Vedic Astrologer, Vastu Shastra consultant, and Gemstone Therapist based in Pune, Maharashtra. Born into a family with deep roots in Vedic traditions, he was drawn to the ancient science of Jyotish from a very young age, spending his formative years studying Sanskrit texts and classical astrological treatises under the guidance of renowned scholars.
              </p>

              <p className="text-foreground/90 leading-relaxed">
                With over <strong className="text-cosmic-gold">25 years of dedicated practice</strong>, Vijay ji has conducted more than <strong className="text-cosmic-gold">10,000 consultations</strong> for clients ranging from individuals seeking personal guidance to business owners making critical decisions. His approach seamlessly blends classical Parashari and Jaimini systems of Vedic Astrology with practical, actionable advice tailored to modern life.
              </p>

              <p className="text-foreground/90 leading-relaxed">
                He holds the prestigious <strong className="text-cosmic-gold">Jyotish Visharad</strong> certification from Bharatiya Vidya Bhavan and is a certified <strong className="text-cosmic-gold">Vastu Shastra Acharya</strong> recognized by the All India Vastu Parishad. His expertise in Gemstone Therapy is backed by formal training from the Gem & Jewellery Institute of India, making him one of the few practitioners who can offer a truly holistic approach to cosmic well-being.
              </p>

              <p className="text-foreground/90 leading-relaxed">
                Vijay ji is known for his compassionate, non-judgmental approach and his ability to explain complex astrological concepts in simple, relatable terms. He has been featured in regional newspapers and has conducted workshops and seminars across Maharashtra, helping people understand and apply Vedic wisdom in their daily lives.
              </p>

              {/* Credential highlights */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { icon: '🎓', text: 'Jyotish Visharad – BVB' },
                  { icon: '🏛️', text: 'Vastu Acharya – AIVP' },
                  { icon: '💎', text: 'Gemstone Therapy Cert.' },
                  { icon: '⭐', text: 'ICAS Recognized Expert' },
                  { icon: '🔯', text: 'Muhurta Specialist' },
                  { icon: '📜', text: 'Kundali Matching Expert' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-cosmic-navy/50 border border-cosmic-gold/20 rounded-lg px-3 py-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm text-foreground/80">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-cosmic-navy/40 border-y border-cosmic-gold/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-cosmic-gold font-display">{stat.value}</p>
                <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-cosmic-gold mb-3">Certifications & Qualifications</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Formally trained and certified across multiple disciplines of Vedic sciences
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {credentials.map((cred, i) => (
              <div key={i} className="group relative bg-cosmic-navy/50 border border-cosmic-gold/20 rounded-xl p-6 hover:border-cosmic-gold/50 transition-all duration-300">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cosmic-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <span className="text-4xl mb-4 block">{cred.icon}</span>
                  <h3 className="font-semibold text-foreground mb-1">{cred.title}</h3>
                  <p className="text-sm text-muted-foreground">{cred.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-16 bg-cosmic-navy/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-cosmic-gold mb-3">Areas of Expertise</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive Vedic sciences for holistic life guidance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseAreas.map((area, i) => (
              <div key={i} className="bg-cosmic-navy/50 border border-cosmic-cyan/20 rounded-xl p-6 hover:border-cosmic-cyan/50 transition-all duration-300">
                <h3 className="font-semibold text-cosmic-cyan mb-2">{area.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-cosmic-navy/30 to-background">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-cosmic-gold mb-4">Begin Your Cosmic Journey</h2>
          <p className="text-muted-foreground mb-8">
            Book a personal consultation with Vijay Sawkar and discover the cosmic blueprint of your life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-consultation"
              className="inline-flex items-center gap-2 px-8 py-3 bg-cosmic-gold text-cosmic-navy font-semibold rounded-full hover:bg-yellow-400 transition-colors"
            >
              Book Consultation <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 border border-cosmic-gold/40 text-cosmic-gold rounded-full hover:bg-cosmic-gold/10 transition-colors"
            >
              <Phone className="w-4 h-4" /> Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
