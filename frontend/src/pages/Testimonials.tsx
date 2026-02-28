import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    service: 'Kundali Reading',
    rating: 5,
    text: "Vijay ji's Kundali reading was incredibly accurate. He predicted my career change and promotion within 3 months — it happened exactly as he said! His guidance on remedies was practical and easy to follow. I'm truly grateful.",
    serviceColor: '#c9a84c',
  },
  {
    name: 'Rajesh Mehta',
    location: 'Pune',
    service: 'Vastu Consultancy',
    rating: 5,
    text: 'After Vastu correction of my office, business improved dramatically within 2 months. The constant disputes among staff stopped, and we landed three major contracts. The negative energy is completely gone. Highly recommend!',
    serviceColor: '#40bcd8',
  },
  {
    name: 'Anita Patel',
    location: 'Ahmedabad',
    service: 'Gemstone',
    rating: 5,
    text: 'The Yellow Sapphire recommended by Vijay ji brought amazing results in my career within just 2 months. I got a promotion I had been waiting for years. The gemstone was genuine and certified. Excellent service!',
    serviceColor: '#9b6fd4',
  },
  {
    name: 'Suresh Kumar',
    location: 'Delhi',
    service: 'Business Consultation',
    rating: 5,
    text: 'My business was struggling for 2 years. After consulting Vijay ji for both Kundali and Vastu, things turned around completely. Revenue doubled in 6 months. His predictions about the right time to expand were spot on.',
    serviceColor: '#c9a84c',
  },
  {
    name: 'Meera Joshi',
    location: 'Bangalore',
    service: 'Kundali Reading',
    rating: 5,
    text: 'I was facing marriage delays for years. Vijay ji analyzed my chart and suggested specific remedies. Within 8 months of following his advice, I found my life partner. His accuracy is unmatched. Forever thankful!',
    serviceColor: '#c9a84c',
  },
  {
    name: 'Vikram Singh',
    location: 'Jaipur',
    service: 'Vastu Consultancy',
    rating: 5,
    text: 'Our new home had constant health issues and family disputes. After Vijay ji\'s Vastu consultation, we made the suggested corrections. Within 3 months, the atmosphere at home completely changed. Peace and harmony restored!',
    serviceColor: '#40bcd8',
  },
  {
    name: 'Kavita Desai',
    location: 'Surat',
    service: 'Gemstone',
    rating: 5,
    text: 'I was skeptical about gemstones initially, but after wearing the Blue Sapphire recommended by Vijay ji, my career took off. Got a job offer from a top company within 45 days. The stone was lab-certified and authentic.',
    serviceColor: '#9b6fd4',
  },
  {
    name: 'Arun Nair',
    location: 'Chennai',
    service: 'Business Consultation',
    rating: 5,
    text: 'Vijay ji helped me identify the right time to launch my startup. His Kundali analysis was precise, and the Vastu corrections for my office space made a huge difference. Business is thriving now. Best investment I ever made!',
    serviceColor: '#c9a84c',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4"
          style={{ color: i < rating ? '#c9a84c' : '#2a3a55' }}
          fill={i < rating ? '#c9a84c' : 'none'}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <div style={{ backgroundColor: '#0a1628' }}>
      {/* Page Header */}
      <section
        className="py-20 px-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a1628 0%, #0f1f3d 100%)',
          borderBottom: '1px solid rgba(201, 168, 76, 0.2)',
        }}
      >
        <div className="container mx-auto text-center relative z-10">
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: '#40bcd8' }}>
            Client Stories
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4" style={{ color: '#c9a84c' }}>
            Testimonials
          </h1>
          <div className="section-divider w-32 mx-auto mb-6" />
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#8a9bb5' }}>
            Real stories from real people whose lives have been transformed through authentic Vedic guidance.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <div
        className="py-8 px-4"
        style={{ backgroundColor: 'rgba(15, 31, 61, 0.8)', borderBottom: '1px solid rgba(201, 168, 76, 0.15)' }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '500,000+', label: 'Happy Clients' },
              { value: '20+', label: 'Years Experience' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '50+', label: 'Cities Served' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-serif text-3xl font-bold" style={{ color: '#c9a84c' }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: '#8a9bb5' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: 'rgba(15, 31, 61, 0.8)',
                  border: '1px solid rgba(201, 168, 76, 0.12)',
                }}
              >
                {/* Rating */}
                <StarRating rating={t.rating} />

                {/* Quote */}
                <p
                  className="text-sm leading-relaxed mt-4 mb-5 flex-1 italic"
                  style={{ color: '#a8b8cc' }}
                >
                  "{t.text}"
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'rgba(201, 168, 76, 0.1)' }}>
                  <div>
                    <p className="font-medium text-sm" style={{ color: '#f0e8d0' }}>
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: '#5a6b80' }}>
                      {t.location}
                    </p>
                  </div>
                  <span
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{
                      backgroundColor: `${t.serviceColor}18`,
                      color: t.serviceColor,
                      border: `1px solid ${t.serviceColor}30`,
                    }}
                  >
                    {t.service}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 px-4"
        style={{ backgroundColor: 'rgba(6, 14, 28, 0.6)', borderTop: '1px solid rgba(201, 168, 76, 0.1)' }}
      >
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: '#c9a84c' }}>
            Ready to Write Your Success Story?
          </h2>
          <p className="text-base mb-8" style={{ color: '#8a9bb5' }}>
            Join thousands of satisfied clients who have transformed their lives with authentic Vedic guidance.
          </p>
          <a
            href="/book-consultation"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base"
            style={{
              background: 'linear-gradient(135deg, #c9a84c, #f0d080)',
              color: '#0a1628',
            }}
          >
            <Star className="w-5 h-5" fill="currentColor" />
            Book Your Consultation
          </a>
        </div>
      </section>
    </div>
  );
}
