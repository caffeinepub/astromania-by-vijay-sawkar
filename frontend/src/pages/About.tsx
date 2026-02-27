import { Link } from '@tanstack/react-router';
import { Award, Star, Users, Clock, MapPin, Phone, MessageCircle, ChevronRight, Sparkles } from 'lucide-react';

const EXPERTISE = [
  { icon: '🔮', title: 'Vedic Astrology', desc: 'Birth chart analysis, planetary transits, dasha predictions, and life guidance.' },
  { icon: '🏠', title: 'Vastu Shastra', desc: 'Home and office space harmonization for positive energy flow and prosperity.' },
  { icon: '💎', title: 'Gemstone Therapy', desc: 'Certified natural gemstones prescribed for planetary remedies and healing.' },
  { icon: '📅', title: 'Muhurta', desc: 'Auspicious timing for marriages, business launches, and important life events.' },
  { icon: '🔢', title: 'Numerology', desc: 'Name and birth date analysis for deeper self-understanding and guidance.' },
  { icon: '⭐', title: 'Kundali Matching', desc: 'Comprehensive compatibility analysis for marriage and partnerships.' },
];

const STATS = [
  { icon: Users, value: '5 Lakh+', label: 'Clients Served' },
  { icon: Award, value: '25+', label: 'Years Experience' },
  { icon: Clock, value: '10,000+', label: 'Consultations' },
  { icon: Star, value: '4.9/5', label: 'Average Rating' },
];

const CREDENTIALS = [
  'Certified Vedic Astrologer — Bharatiya Vidya Bhavan',
  'Vastu Shastra Expert — All India Federation of Astrologers',
  'Gemologist — Gemological Institute of India',
  'Member — Indian Council of Astrological Sciences',
];

export default function About() {
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
            ✦ About the Expert ✦
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold mt-4 mb-6 font-cinzel"
            style={{ color: '#C9A84C', textShadow: '0 0 30px rgba(201,168,76,0.3)' }}
          >
            Vijay Sawkar
          </h1>
          <p className="text-xl font-cormorant italic" style={{ color: '#e8d5a3' }}>
            Astrology &amp; Vastu Expert with 25+ Years of Experience
          </p>
        </div>
      </section>

      {/* Credentials Bar */}
      <section
        className="py-6 px-4 border-y overflow-x-auto"
        style={{
          backgroundColor: 'rgba(201,168,76,0.06)',
          borderColor: 'rgba(201,168,76,0.2)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {CREDENTIALS.map((cred) => (
              <div
                key={cred}
                className="flex items-center gap-2 text-sm whitespace-nowrap px-4 py-2 rounded-full"
                style={{
                  backgroundColor: 'rgba(201,168,76,0.1)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  color: '#e8d5a3',
                }}
              >
                {/* Fixed: flex-shrink-0 → shrink-0 */}
                <Award className="w-4 h-4 shrink-0" style={{ color: '#C9A84C' }} />
                {cred}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="flex justify-center">
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  border: '2px solid rgba(201,168,76,0.4)',
                  boxShadow: '0 0 40px rgba(201,168,76,0.2)',
                }}
              >
                <img
                  src="/assets/generated/about-astrologer.dim_800x600.png"
                  alt="Vijay Sawkar"
                  className="w-full max-w-md object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(6,8,24,0.6) 0%, transparent 50%)',
                  }}
                />
              </div>
            </div>

            {/* Bio Text */}
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6 font-cinzel"
                style={{ color: '#C9A84C' }}
              >
                A Life Dedicated to Vedic Sciences
              </h2>
              <div className="space-y-4">
                <p className="leading-relaxed" style={{ color: '#c8d8e8' }}>
                  Vijay Sawkar is a renowned Vedic astrologer and Vastu expert based in Goa, India. With over 25 years of dedicated practice, he has guided thousands of individuals, families, and businesses toward clarity, harmony, and prosperity.
                </p>
                <p className="leading-relaxed" style={{ color: '#c8d8e8' }}>
                  His journey began under the tutelage of revered Vedic scholars, where he mastered the intricate systems of Jyotish (Vedic Astrology), Vastu Shastra, and gemstone therapy. He combines this classical knowledge with a compassionate, practical approach tailored to each client's unique circumstances.
                </p>
                <p className="leading-relaxed" style={{ color: '#c8d8e8' }}>
                  Vijay ji is known for his precise predictions, actionable remedies, and deep understanding of how cosmic energies influence everyday life. His clients span across India and the globe, seeking guidance on career, relationships, health, finances, and spiritual growth.
                </p>
                <p className="leading-relaxed" style={{ color: '#c8d8e8' }}>
                  Beyond consultations, he is a passionate educator who conducts workshops and seminars to spread awareness of Vedic sciences, making ancient wisdom accessible to the modern world.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/book-consultation"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #C9A84C, #a07830)',
                    color: '#060818',
                    boxShadow: '0 4px 20px rgba(201,168,76,0.3)',
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  Book Consultation
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    border: '2px solid #5BC8D4',
                    color: '#5BC8D4',
                    backgroundColor: 'transparent',
                  }}
                >
                  Get in Touch <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: 'rgba(10,15,40,0.6)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon
                  className="w-10 h-10 mx-auto mb-3"
                  style={{ color: '#C9A84C' }}
                />
                <div
                  className="text-3xl font-bold font-cinzel"
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

      {/* Expertise Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="text-sm font-medium tracking-[0.3em] uppercase"
              style={{ color: '#5BC8D4' }}
            >
              ✦ Areas of Expertise ✦
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold mt-3 mb-4 font-cinzel"
              style={{ color: '#C9A84C' }}
            >
              Sacred Knowledge
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPERTISE.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(20,25,60,0.8)',
                  border: '1px solid rgba(201,168,76,0.2)',
                }}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3
                  className="text-lg font-bold mb-2 font-cinzel"
                  style={{ color: '#C9A84C' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#b8c8d8' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Visit Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: 'rgba(10,15,40,0.6)' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6 font-cinzel"
            style={{ color: '#C9A84C' }}
          >
            Visit or Connect
          </h2>
          <p className="text-lg mb-10" style={{ color: '#b8c8d8' }}>
            Consultations available in-person at our Goa office or online via video call.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: 'rgba(20,25,60,0.8)',
                border: '1px solid rgba(201,168,76,0.2)',
              }}
            >
              <MapPin className="w-8 h-8 mx-auto mb-3" style={{ color: '#C9A84C' }} />
              <h3 className="font-bold mb-2 font-cinzel" style={{ color: '#C9A84C' }}>Location</h3>
              <p className="text-sm" style={{ color: '#b8c8d8' }}>Goa, India</p>
            </div>
            <div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: 'rgba(20,25,60,0.8)',
                border: '1px solid rgba(201,168,76,0.2)',
              }}
            >
              <Phone className="w-8 h-8 mx-auto mb-3" style={{ color: '#C9A84C' }} />
              <h3 className="font-bold mb-2 font-cinzel" style={{ color: '#C9A84C' }}>Phone</h3>
              <a
                href="tel:+919876543210"
                className="text-sm transition-colors"
                style={{ color: '#5BC8D4' }}
              >
                +91 98765 43210
              </a>
            </div>
            <div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: 'rgba(20,25,60,0.8)',
                border: '1px solid rgba(201,168,76,0.2)',
              }}
            >
              <MessageCircle className="w-8 h-8 mx-auto mb-3" style={{ color: '#C9A84C' }} />
              <h3 className="font-bold mb-2 font-cinzel" style={{ color: '#C9A84C' }}>WhatsApp</h3>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors"
                style={{ color: '#5BC8D4' }}
              >
                Chat with Us
              </a>
            </div>
          </div>

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
            Book a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
