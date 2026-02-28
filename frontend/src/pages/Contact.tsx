import { useState, useRef } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, Upload, Trash2, Image, Loader2, Video, Building2 } from 'lucide-react';
import { SiInstagram, SiFacebook } from 'react-icons/si';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { ExternalBlob } from '../backend';
import { toast } from 'sonner';

const MAPS_URL = 'https://maps.app.goo.gl/i32yhyBr9B47Sg9T7?g_st=aw';

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

          {/* Office Address */}
          <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Building2 className="h-3.5 w-3.5 text-primary/70" />
              <h3 className="font-semibold text-foreground">Office Address</h3>
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-2"
            >
              Margao, Goa, India
            </a>
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

        {/* Contact Form — full width */}
        <div className="max-w-2xl mx-auto mb-16">
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
        </div>

        {/* Media Gallery Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground">Media Gallery</h2>
            {isAdmin && identity && (
              <div className="flex items-center gap-3">
                {uploadProgress !== null && (
                  <span className="text-sm text-muted-foreground">Uploading… {uploadProgress}%</span>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadMutation.isPending}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {uploadMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  Upload Media
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>

          {galleryLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Image className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>No media uploaded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {galleryItems.map((item) => (
                <div key={item.id} className="relative group rounded-xl overflow-hidden aspect-square bg-muted">
                  {item.type === 'video' ? (
                    <video
                      src={item.blob.getDirectURL()}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={item.blob.getDirectURL()}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {item.type === 'video' ? (
                      <Video className="h-6 w-6 text-white" />
                    ) : (
                      <Image className="h-6 w-6 text-white" />
                    )}
                    {isAdmin && identity && (
                      <button
                        onClick={() => deleteMutation.mutate(item.id)}
                        disabled={deleteMutation.isPending}
                        className="absolute top-2 right-2 p-1.5 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
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
