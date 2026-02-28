import { useState, useRef } from 'react';
import { ArrowRight, Star, Clock, Users, CheckCircle, Phone, MessageCircle, Upload, Loader2, Trash2 } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { ExternalBlob } from '../backend';
import { toast } from 'sonner';

const services = [
  {
    id: 'astrology',
    title: 'Vedic Astrology',
    subtitle: 'Ancient Wisdom for Modern Life',
    icon: '⭐',
    description: 'Unlock the secrets of your destiny through the ancient science of Vedic astrology. Our comprehensive readings analyze your birth chart to provide insights into career, relationships, health, and spiritual growth.',
    includes: [
      'Complete birth chart analysis',
      'Planetary period (Dasha) predictions',
      'Transit analysis for current year',
      'Remedial measures and gemstone recommendations',
      'Career and financial guidance',
      'Relationship compatibility analysis'
    ],
    duration: '90 minutes',
    modes: ['In-Person (Margao Office)', 'Video Call', 'Phone Call'],
    price: 'Starting ₹2,100',
    popular: true
  },
  {
    id: 'vastu',
    title: 'Vastu Shastra',
    subtitle: 'Harmonize Your Living Space',
    icon: '🏛️',
    description: 'Transform your home or office into a sanctuary of positive energy with authentic Vastu Shastra consultation. We analyze the five elements, directional energies, and spatial arrangements to optimize your environment.',
    includes: [
      'Complete property analysis',
      'Room-by-room Vastu assessment',
      'Remedial measures without demolition',
      'Color and material recommendations',
      'Entrance and main door analysis',
      'Business premises optimization'
    ],
    duration: '2-3 hours on-site',
    modes: ['In-Person (Margao Office)', 'Video Consultation with floor plans'],
    price: 'Starting ₹5,100',
    popular: false
  },
  {
    id: 'vastu-advance',
    title: 'Vastu Advance Course',
    subtitle: 'Master the Science of Sacred Space',
    icon: '🎓',
    description: 'A comprehensive professional training program in Vastu Shastra for those who wish to practice as Vastu consultants or deepen their knowledge of this ancient science.',
    includes: [
      'Complete Vastu Shastra curriculum',
      'Practical case studies and site visits',
      'Advanced directional energy analysis',
      'Commercial and industrial Vastu',
      'Remedial techniques and tools',
      'Certificate of completion',
      'Ongoing mentorship support'
    ],
    duration: '3 months',
    modes: ['In-Person (Margao Office)', 'Online Live Sessions'],
    price: 'Contact for details',
    popular: false
  },
  {
    id: 'numerology',
    title: 'Numerology',
    subtitle: 'Decode Your Life Path Through Numbers',
    icon: '🔢',
    description: 'Discover the hidden patterns in your life through the mystical science of numbers. Numerology reveals your life path, destiny number, and personal year cycles to guide important decisions.',
    includes: [
      'Complete numerology profile',
      'Life path number analysis',
      'Destiny and soul urge numbers',
      'Personal year and month cycles',
      'Name correction recommendations',
      'Lucky numbers and dates'
    ],
    duration: '60 minutes',
    modes: ['In-Person (Margao Office)', 'Video Call', 'Phone Call'],
    price: 'Starting ₹1,500',
    popular: false
  },
  {
    id: 'gemstones',
    title: 'Gemstone Therapy',
    subtitle: 'Harness Planetary Energies',
    icon: '💎',
    description: 'Harness the healing and transformative power of precious and semi-precious gemstones. Each gemstone carries specific planetary energies that can enhance positive influences and mitigate challenging ones in your chart.',
    includes: [
      'Astrological gemstone analysis',
      'Personalized gemstone recommendations',
      'Wearing instructions and rituals',
      'Quality certification guidance',
      'Metal and finger recommendations',
      'Follow-up consultation'
    ],
    duration: '45 minutes',
    modes: ['In-Person (Margao Office)', 'Video Call'],
    price: 'Starting ₹800',
    popular: false
  },
  {
    id: 'kundali',
    title: 'New Kundali',
    subtitle: 'Birth Chart Creation & Analysis',
    icon: '📜',
    description: 'Get a professionally prepared Kundali (birth chart) with detailed analysis. Perfect for newborns, individuals who have never had their chart prepared, or those seeking a fresh comprehensive reading.',
    includes: [
      'Precise birth chart calculation',
      'Lagna (Ascendant) analysis',
      'Planetary positions and strengths',
      'Nakshatra and Pada analysis',
      'Yogas and Doshas identification',
      'Detailed written report'
    ],
    duration: '60 minutes',
    modes: ['In-Person (Margao Office)', 'Video Call', 'Phone Call'],
    price: 'Starting ₹1,800',
    popular: false
  }
];

// IDs used to store/retrieve course certificate photos in the gallery backend
const CERT_PHOTO_IDS = ['vastu-course-cert-photo-1', 'vastu-course-cert-photo-2'];

// Fallback static images if no uploaded photos exist
const FALLBACK_CERT_IMAGES = [
  {
    id: CERT_PHOTO_IDS[0],
    src: '/assets/generated/vastu-advance-cert-1.dim_1080x763.jpg',
    alt: 'Vastu Advance Course Certificate 1',
  },
  {
    id: CERT_PHOTO_IDS[1],
    src: '/assets/generated/vastu-advance-cert-2.dim_1080x763.jpg',
    alt: 'Vastu Advance Course Certificate 2',
  },
];

function useIsAdmin() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  return useQuery({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

function useGalleryItems() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['galleryItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGalleryItems();
    },
    enabled: !!actor && !isFetching,
  });
}

interface CertPhoto {
  id: string;
  src: string;
  alt: string;
  isUploaded?: boolean;
}

function VastuCertificates() {
  const { identity } = useInternetIdentity();
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { data: isAdmin } = useIsAdmin();
  const { data: galleryItems = [] } = useGalleryItems();

  const fileInputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  // Build the cert photos: prefer uploaded gallery items, fall back to static
  const certPhotos: CertPhoto[] = FALLBACK_CERT_IMAGES.map((fallback) => {
    const uploaded = galleryItems.find((item) => item.id === fallback.id);
    if (uploaded) {
      return {
        id: fallback.id,
        src: uploaded.blob.getDirectURL(),
        alt: fallback.alt,
        isUploaded: true,
      };
    }
    return { ...fallback, isUploaded: false };
  });

  const uploadMutation = useMutation({
    mutationFn: async ({ file, slotId }: { file: File; slotId: string }) => {
      if (!actor) throw new Error('Not connected');
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress((prev) => ({ ...prev, [slotId]: pct }));
      });
      await actor.addGalleryItem(slotId, blob, 'image');
    },
    onSuccess: (_data, variables) => {
      setUploadProgress((prev) => {
        const next = { ...prev };
        delete next[variables.slotId];
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ['galleryItems'] });
      toast.success('Certificate photo uploaded!');
    },
    onError: (_err, variables) => {
      setUploadProgress((prev) => {
        const next = { ...prev };
        delete next[variables.slotId];
        return next;
      });
      toast.error('Failed to upload photo.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Not connected');
      await actor.deleteGalleryItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryItems'] });
      toast.success('Photo removed. Fallback image restored.');
    },
    onError: () => {
      toast.error('Failed to remove photo.');
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, slotId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadMutation.mutate({ file, slotId });
    }
    if (e.target) e.target.value = '';
  };

  return (
    <div className="mt-8 pt-8 border-t border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-primary" />
          Certificates
        </h3>
        {isAdmin && identity && (
          <p className="text-xs text-muted-foreground italic">Admin: click the upload button on each photo to replace it</p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certPhotos.map((cert, idx) => {
          const isUploading = uploadMutation.isPending && uploadMutation.variables?.slotId === cert.id;
          const progress = uploadProgress[cert.id];
          return (
            <div key={cert.id} className="relative rounded-lg overflow-hidden border border-primary/20 shadow-md group">
              <img
                src={cert.src}
                alt={cert.alt}
                className="w-full h-auto object-contain"
                onError={(e) => {
                  // If static fallback also fails, show a placeholder
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.img-fallback')) {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'img-fallback flex items-center justify-center h-48 bg-muted text-muted-foreground text-sm';
                    placeholder.textContent = cert.alt;
                    parent.appendChild(placeholder);
                  }
                }}
              />

              {/* Upload overlay for admin */}
              {isAdmin && identity && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                      <span className="text-white text-sm">{progress != null ? `${progress}%` : 'Uploading...'}</span>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => fileInputRefs[idx].current?.click()}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        {cert.isUploaded ? 'Replace Photo' : 'Upload Photo'}
                      </button>
                      {cert.isUploaded && (
                        <button
                          onClick={() => deleteMutation.mutate(cert.id)}
                          disabled={deleteMutation.isPending}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}

              <input
                ref={fileInputRefs[idx]}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, cert.id)}
              />
            </div>
          );
        })}
      </div>
      {isAdmin && identity && (
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Hover over a certificate photo and click "Upload Photo" to replace it with your own image.
        </p>
      )}
    </div>
  );
}

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Our Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Sacred Sciences for <span className="text-primary">Modern Life</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our comprehensive range of Vedic services, each designed to bring clarity, harmony, and prosperity to your life journey.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className={`relative bg-card border rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 ${
                  selectedService === service.id
                    ? 'border-primary shadow-lg shadow-primary/20'
                    : 'border-border'
                }`}
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-display font-bold text-foreground mb-1">{service.title}</h3>
                <p className="text-sm text-primary mb-3">{service.subtitle}</p>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-semibold">{service.price}</span>
                  <ArrowRight className={`w-5 h-5 transition-transform ${selectedService === service.id ? 'rotate-90 text-primary' : 'text-muted-foreground'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail Panel */}
      {selectedServiceData && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="bg-card border border-primary/20 rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="flex items-start gap-6 mb-8">
                <div className="text-6xl">{selectedServiceData.icon}</div>
                <div className="flex-1">
                  <h2 className="text-3xl font-display font-bold text-foreground mb-2">{selectedServiceData.title}</h2>
                  <p className="text-primary mb-4">{selectedServiceData.subtitle}</p>
                  <p className="text-muted-foreground">{selectedServiceData.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {selectedServiceData.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground text-sm">
                        <span className="text-primary mt-0.5">✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Duration
                    </h3>
                    <p className="text-muted-foreground">{selectedServiceData.duration}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Available Modes
                    </h3>
                    <ul className="space-y-1">
                      {selectedServiceData.modes.map((mode, index) => (
                        <li key={index} className="text-muted-foreground text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                          {mode}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-2xl font-bold text-primary mb-4">{selectedServiceData.price}</p>
                    <div className="flex gap-3">
                      <a
                        href="https://wa.me/919850454549"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </a>
                      <a
                        href="tel:+919850454549"
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        Call Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate photos — shown only for Vastu Advance Course */}
              {selectedServiceData.id === 'vastu-advance' && <VastuCertificates />}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-muted-foreground mb-8">
              Book a consultation today and take the first step towards clarity, harmony, and prosperity.
            </p>
            <a
              href="/book-consultation"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Book Consultation
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
