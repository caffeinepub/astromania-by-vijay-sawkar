import { useState } from 'react';
import { Phone, MessageCircle, Calendar, User, Mail, Sparkles, CheckCircle } from 'lucide-react';
import { useSubmitBookingRequest } from '../hooks/useQueries';

const CONSULTATION_TYPES = [
  { value: 'vedic-astrology', label: '🔮 Vedic Astrology' },
  { value: 'vastu-shastra', label: '🏠 Vastu Shastra' },
  { value: 'gemstone-therapy', label: '💎 Gemstone Therapy' },
  { value: 'muhurta', label: '📅 Muhurta (Auspicious Timing)' },
  { value: 'numerology', label: '🔢 Numerology' },
  { value: 'kundali-matching', label: '⭐ Kundali Matching' },
  { value: 'general', label: '🌟 General Consultation' },
];

export default function BookConsultation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    consultationType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useSubmitBookingRequest();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitMutation.mutateAsync({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        preferredDate: formData.preferredDate,
        consultationType: formData.consultationType,
        status: 'pending',
        timestamp: BigInt(Date.now()) * BigInt(1_000_000),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Booking submission error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: '#060818' }}
      >
        <div
          className="max-w-md w-full text-center p-10 rounded-2xl"
          style={{
            backgroundColor: 'rgba(20,25,60,0.9)',
            border: '1px solid rgba(201,168,76,0.3)',
            boxShadow: '0 20px 60px rgba(201,168,76,0.15)',
          }}
        >
          <CheckCircle className="w-16 h-16 mx-auto mb-6" style={{ color: '#C9A84C' }} />
          <h2 className="text-2xl font-bold mb-4 font-cinzel" style={{ color: '#C9A84C' }}>
            Booking Confirmed!
          </h2>
          <p className="mb-6" style={{ color: '#b8c8d8' }}>
            Thank you for booking a consultation with Vijay Sawkar. We will contact you within 24 hours to confirm your appointment.
          </p>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: '#25D366',
              color: '#ffffff',
            }}
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    );
  }

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
            ✦ Schedule Your Session ✦
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold mt-4 mb-6 font-cinzel"
            style={{ color: '#C9A84C', textShadow: '0 0 30px rgba(201,168,76,0.3)' }}
          >
            Book a Consultation
          </h1>
          <p className="text-xl font-cormorant italic mb-4" style={{ color: '#e8d5a3' }}>
            Vijay Sawkar — Astrology and Vastu Expert
          </p>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#b8c8d8' }}>
            Take the first step toward cosmic clarity. Fill in your details and we&apos;ll confirm your appointment within 24 hours.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <div
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: 'rgba(20,25,60,0.8)',
                  border: '1px solid rgba(201,168,76,0.2)',
                }}
              >
                <h3 className="font-bold mb-4 font-cinzel" style={{ color: '#C9A84C' }}>
                  Quick Contact
                </h3>
                <div className="space-y-3">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-3 text-sm transition-colors"
                    style={{ color: '#b8c8d8' }}
                  >
                    {/* Fixed: flex-shrink-0 → shrink-0 */}
                    <Phone className="w-4 h-4 shrink-0" style={{ color: '#C9A84C' }} />
                    +91 98765 43210
                  </a>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm transition-colors"
                    style={{ color: '#b8c8d8' }}
                  >
                    {/* Fixed: flex-shrink-0 → shrink-0 */}
                    <MessageCircle className="w-4 h-4 shrink-0" style={{ color: '#25D366' }} />
                    WhatsApp Us
                  </a>
                </div>
              </div>

              {/* Timing */}
              <div
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: 'rgba(20,25,60,0.8)',
                  border: '1px solid rgba(201,168,76,0.2)',
                }}
              >
                <h3 className="font-bold mb-4 font-cinzel" style={{ color: '#C9A84C' }}>
                  Consultation Hours
                </h3>
                <div className="space-y-2">
                  {[
                    { day: 'Mon – Fri', time: '9 AM – 7 PM' },
                    { day: 'Saturday', time: '9 AM – 5 PM' },
                    { day: 'Sunday', time: 'By Appointment' },
                  ].map((slot) => (
                    <div key={slot.day} className="flex justify-between text-sm">
                      <span style={{ color: '#b8c8d8' }}>{slot.day}</span>
                      <span style={{ color: '#C9A84C' }}>{slot.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: 'rgba(20,25,60,0.8)',
                  border: '1px solid rgba(201,168,76,0.2)',
                }}
              >
                <h3 className="font-bold mb-4 font-cinzel" style={{ color: '#C9A84C' }}>
                  Available Services
                </h3>
                <ul className="space-y-2">
                  {CONSULTATION_TYPES.map((type) => (
                    <li key={type.value} className="text-sm" style={{ color: '#b8c8d8' }}>
                      {type.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div
                className="p-8 rounded-2xl"
                style={{
                  backgroundColor: 'rgba(20,25,60,0.8)',
                  border: '1px solid rgba(201,168,76,0.2)',
                }}
              >
                <h2 className="text-2xl font-bold mb-6 font-cinzel" style={{ color: '#C9A84C' }}>
                  Your Consultation Details
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: '#e8d5a3' }}
                    >
                      <User className="w-4 h-4 inline mr-2" style={{ color: '#C9A84C' }} />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200"
                      style={{
                        backgroundColor: 'rgba(10,15,40,0.8)',
                        border: '1px solid rgba(201,168,76,0.3)',
                        color: '#ffffff',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#C9A84C')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.3)')}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: '#e8d5a3' }}
                    >
                      <Phone className="w-4 h-4 inline mr-2" style={{ color: '#C9A84C' }} />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200"
                      style={{
                        backgroundColor: 'rgba(10,15,40,0.8)',
                        border: '1px solid rgba(201,168,76,0.3)',
                        color: '#ffffff',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#C9A84C')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.3)')}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: '#e8d5a3' }}
                    >
                      <Mail className="w-4 h-4 inline mr-2" style={{ color: '#C9A84C' }} />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200"
                      style={{
                        backgroundColor: 'rgba(10,15,40,0.8)',
                        border: '1px solid rgba(201,168,76,0.3)',
                        color: '#ffffff',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#C9A84C')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.3)')}
                    />
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: '#e8d5a3' }}
                    >
                      <Calendar className="w-4 h-4 inline mr-2" style={{ color: '#C9A84C' }} />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200"
                      style={{
                        backgroundColor: 'rgba(10,15,40,0.8)',
                        border: '1px solid rgba(201,168,76,0.3)',
                        color: '#ffffff',
                        colorScheme: 'dark',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#C9A84C')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.3)')}
                    />
                  </div>

                  {/* Consultation Type */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: '#e8d5a3' }}
                    >
                      <Sparkles className="w-4 h-4 inline mr-2" style={{ color: '#C9A84C' }} />
                      Consultation Type *
                    </label>
                    <select
                      name="consultationType"
                      value={formData.consultationType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200"
                      style={{
                        backgroundColor: 'rgba(10,15,40,0.8)',
                        border: '1px solid rgba(201,168,76,0.3)',
                        color: formData.consultationType ? '#ffffff' : '#7a9ab0',
                        colorScheme: 'dark',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#C9A84C')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.3)')}
                    >
                      <option value="" disabled style={{ backgroundColor: '#0a0f28', color: '#7a9ab0' }}>
                        Select consultation type
                      </option>
                      {CONSULTATION_TYPES.map((type) => (
                        <option
                          key={type.value}
                          value={type.value}
                          style={{ backgroundColor: '#0a0f28', color: '#ffffff' }}
                        >
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: '#e8d5a3' }}
                    >
                      Additional Notes
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Any specific questions or areas you'd like to focus on..."
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 resize-none"
                      style={{
                        backgroundColor: 'rgba(10,15,40,0.8)',
                        border: '1px solid rgba(201,168,76,0.3)',
                        color: '#ffffff',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#C9A84C')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.3)')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{
                      background: 'linear-gradient(135deg, #C9A84C, #a07830)',
                      color: '#060818',
                      boxShadow: '0 4px 20px rgba(201,168,76,0.4)',
                    }}
                  >
                    {submitMutation.isPending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Book Consultation
                      </>
                    )}
                  </button>

                  {submitMutation.isError && (
                    <p className="text-sm text-center" style={{ color: '#ff6b6b' }}>
                      Something went wrong. Please try again or contact us via WhatsApp.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
