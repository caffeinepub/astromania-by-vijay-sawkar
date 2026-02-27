import { useState, useRef } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, Upload, Trash2, Image, Loader2, Video } from 'lucide-react';
import { SiInstagram, SiFacebook } from 'react-icons/si';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { ExternalBlob } from '../backend';
import { toast } from 'sonner';

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

export default function Contact() {
  const { identity } = useInternetIdentity();
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: isAdmin } = useIsAdmin();
  const { data: galleryItems = [], isLoading: galleryLoading } = useGalleryItems();

  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Upload gallery item
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      if (!actor) throw new Error('Not connected');
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });
      const type = file.type.startsWith('video/') ? 'video' : 'image';
      await actor.addGalleryItem(file.name, blob, type);
    },
    onSuccess: () => {
      setUploadProgress(null);
      queryClient.invalidateQueries({ queryKey: ['galleryItems'] });
      toast.success('Media uploaded successfully!');
    },
    onError: () => {
      setUploadProgress(null);
      toast.error('Failed to upload media.');
    },
  });

  // Delete gallery item
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Not connected');
      await actor.deleteGalleryItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryItems'] });
      toast.success('Item deleted.');
    },
    onError: () => {
      toast.error('Failed to delete item.');
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadMutation.mutate(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setFormSubmitting(true);
    try {
      await actor.submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        timestamp: BigInt(Date.now()) * BigInt(1_000_000),
      });
      setFormSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reach out for consultations, gemstone enquiries, or any questions about Vedic astrology and Vastu Shastra.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Phone */}
          <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Phone</h3>
            <a href="tel:+919850454549" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              +91 98504 54549
            </a>
          </div>

          {/* WhatsApp */}
          <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
            <a
              href="https://wa.me/919850454549"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-green-600 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Email */}
          <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Email</h3>
            <a
              href="mailto:sawkarv15@gmail.com"
              className="text-sm text-muted-foreground hover:text-primary transition-colors break-all"
            >
              sawkarv15@gmail.com
            </a>
          </div>

          {/* Location */}
          <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Location</h3>
            <p className="text-sm text-muted-foreground">Margao, Goa, India</p>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <a
            href="https://instagram.com/sawkar.v"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <SiInstagram className="h-5 w-5" />
            <span className="text-sm">@sawkar.v</span>
          </a>
          <a
            href="https://facebook.com/VijayS.Sawkar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <SiFacebook className="h-5 w-5" />
            <span className="text-sm">Vijay Sawkar</span>
          </a>
        </div>

        {/* Main Grid: Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send a Message</h2>
            {formSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">Message Sent!</h3>
                <p className="text-muted-foreground mb-4">Thank you for reaching out. We'll get back to you soon.</p>
                <button
                  onClick={() => setFormSuccess(false)}
                  className="text-primary hover:underline text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {formSubmitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="h-4 w-4" /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Map */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="font-display text-2xl font-bold text-foreground">Find Us</h2>
              <p className="text-muted-foreground text-sm mt-1">Margao, Goa, India</p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3843.5!2d74.0!3d15.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfb5a0b0b0b0b0%3A0x0!2sMargao%2C+Goa!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Margao, Goa Location"
            />
          </div>
        </div>

        {/* Media Gallery */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Media <span className="text-primary">Gallery</span>
              </h2>
              <p className="text-muted-foreground text-sm mt-1">Photos and videos from our consultations and events</p>
            </div>
            {/* Admin Upload Button */}
            {isAdmin && (
              <div className="flex items-center gap-3">
                {uploadProgress !== null && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span>{uploadProgress}%</span>
                  </div>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadMutation.isPending}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {uploadMutation.isPending ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Uploading...</>
                  ) : (
                    <><Upload className="h-4 w-4" /> Upload Media</>
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {galleryLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <Image className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">
                {isAdmin ? 'No media yet. Upload photos or videos to get started.' : 'No media available yet.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="relative group bg-card border border-border rounded-xl overflow-hidden aspect-square"
                >
                  {item.type === 'video' ? (
                    <video
                      src={item.blob.getDirectURL()}
                      className="w-full h-full object-cover"
                      controls={false}
                      muted
                      loop
                      onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
                      onMouseLeave={(e) => {
                        const v = e.currentTarget as HTMLVideoElement;
                        v.pause();
                        v.currentTime = 0;
                      }}
                    />
                  ) : (
                    <img
                      src={item.blob.getDirectURL()}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}

                  {/* Type badge */}
                  <div className="absolute top-2 left-2">
                    {item.type === 'video' ? (
                      <span className="flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                        <Video className="h-3 w-3" /> Video
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                        <Image className="h-3 w-3" /> Photo
                      </span>
                    )}
                  </div>

                  {/* Admin delete button */}
                  {isAdmin && (
                    <button
                      onClick={() => deleteMutation.mutate(item.id)}
                      disabled={deleteMutation.isPending}
                      className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}

                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs truncate">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
