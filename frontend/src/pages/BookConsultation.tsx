import { useState } from 'react';
import { Star, Phone, MessageCircle, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { useSubmitBookingRequest } from '../hooks/useQueries';

const consultationTypes = [
  { value: 'vedic-astrology', label: '🔭 Vedic Astrology' },
  { value: 'vastu-shastra', label: '🏠 Vastu Shastra' },
  { value: 'gemstone-therapy', label: '💎 Gemstone Therapy' },
  { value: 'muhurta', label: '⏰ Muhurta (Auspicious Timing)' },
  { value: 'kundali-matching', label: '💑 Kundali Matching' },
  { value: 'new-kundali', label: '📜 New Kundali Preparation' },
];

const consultationModes = [
  { value: 'online-video', label: '📹 Online Video Call' },
  { value: 'online-phone', label: '📞 Online Phone Call' },
  { value: 'offline', label: '🏛️ In-Person (Pune Office)' },
];

export default function BookConsultation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    consultationType: '',
    consultationMode: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useSubmitBookingRequest();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitMutation.mutateAsync({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        preferredDate: formData.preferredDate,
        consultationType: `${formData.consultationType} (${formData.consultationMode})`,
        status: 'pending',
        timestamp: BigInt(Date.now()) * BigInt(1_000_000),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Booking submission error:', err);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-cosmic-navy/60 border border-cosmic-gold/30 rounded-2xl p-10">
          <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-display font-bold text-cosmic-gold mb-3">Booking Received!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you, <strong className="text-foreground">{formData.name}</strong>! Your consultation request has been submitted. Vijay ji will contact you within 24 hours to confirm your appointment.
          </p>
          <button
            onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', email: '', preferredDate: '', consultationType: '', consultationMode: '', message: '' }); }}
            className="px-6 py-2.5 bg-cosmic-gold text-cosmic-navy font-semibold rounded-full hover:bg-yellow-400 transition-colors"
          >
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-navy via-background to-background" />
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cosmic-gold/30 bg-cosmic-gold/10 text-cosmic-gold text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Book a Consultation
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-cosmic-gold via-yellow-300 to-cosmic-gold bg-clip-text text-transparent">
            Schedule Your Session
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Fill in the form below and Vijay ji will personally reach out to confirm your appointment.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-cosmic-navy/40 border border-cosmic-gold/20 rounded-2xl p-8 space-y-6">
              <h2 className="text-xl font-semibold text-cosmic-gold mb-2">Consultation Details</h2>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full bg-background/50 border border-cosmic-gold/20 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cosmic-gold/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-background/50 border border-cosmic-gold/20 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cosmic-gold/60 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full bg-background/50 border border-cosmic-gold/20 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cosmic-gold/60 transition-colors"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1.5">Consultation Type *</label>
                  <select
                    name="consultationType"
                    required
                    value={formData.consultationType}
                    onChange={handleChange}
                    className="w-full bg-background/50 border border-cosmic-gold/20 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-cosmic-gold/60 transition-colors"
                  >
                    <option value="">Select service...</option>
                    {consultationTypes.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1.5">Consultation Mode *</label>
                  <select
                    name="consultationMode"
                    required
                    value={formData.consultationMode}
                    onChange={handleChange}
                    className="w-full bg-background/50 border border-cosmic-gold/20 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-cosmic-gold/60 transition-colors"
                  >
                    <option value="">Select mode...</option>
                    {consultationModes.map(m => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">Preferred Date *</label>
                <input
                  type="date"
                  name="preferredDate"
                  required
                  value={formData.preferredDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-background/50 border border-cosmic-gold/20 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-cosmic-gold/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">Additional Message (Optional)</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Briefly describe your concern or question..."
                  className="w-full bg-background/50 border border-cosmic-gold/20 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cosmic-gold/60 transition-colors resize-none"
                />
              </div>

              {submitMutation.isError && (
                <p className="text-red-400 text-sm">Something went wrong. Please try again or contact us directly.</p>
              )}

              <button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full py-3 bg-cosmic-gold text-cosmic-navy font-semibold rounded-xl hover:bg-yellow-400 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitMutation.isPending ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                ) : (
                  'Submit Booking Request'
                )}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div className="bg-cosmic-navy/40 border border-cosmic-gold/20 rounded-2xl p-6">
              <h3 className="font-semibold text-cosmic-gold mb-4">Quick Contact</h3>
              <div className="space-y-3">
                <a href="tel:+919876543210" className="flex items-center gap-3 text-foreground/80 hover:text-cosmic-gold transition-colors">
                  <Phone className="w-5 h-5 shrink-0 text-cosmic-gold" />
                  <span className="text-sm">+91 98765 43210</span>
                </a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground/80 hover:text-green-400 transition-colors">
                  <MessageCircle className="w-5 h-5 shrink-0 text-green-400" />
                  <span className="text-sm">WhatsApp Us</span>
                </a>
              </div>
            </div>

            {/* Consultation Hours */}
            <div className="bg-cosmic-navy/40 border border-cosmic-gold/20 rounded-2xl p-6">
              <h3 className="font-semibold text-cosmic-gold mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Consultation Hours
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Mon – Fri</span>
                  <span className="text-foreground/80">9:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-foreground/80">9:00 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-foreground/80">By Appointment</span>
                </div>
              </div>
            </div>

            {/* Available Services */}
            <div className="bg-cosmic-navy/40 border border-cosmic-gold/20 rounded-2xl p-6">
              <h3 className="font-semibold text-cosmic-gold mb-4">Available Services</h3>
              <ul className="space-y-2">
                {[
                  '🔭 Vedic Astrology',
                  '🏠 Vastu Shastra',
                  '💎 Gemstone Therapy',
                  '⏰ Muhurta',
                  '💑 Kundali Matching',
                  '📜 New Kundali',
                ].map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0 text-cosmic-gold" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
