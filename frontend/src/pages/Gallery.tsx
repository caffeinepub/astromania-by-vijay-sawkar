import { useState, useRef } from 'react';
import { Image, Video, Upload, Trash2, Loader2, X, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { ExternalBlob } from '../backend';
import { toast } from 'sonner';
import CertificateCard from '../components/CertificateCard';

type FilterType = 'all' | 'photos' | 'videos' | 'certificates';

interface GalleryEntry {
  id: string;
  name: string;
  url: string;
  type: string; // 'image' | 'video' | 'certificate'
  isStatic?: boolean;
  certificateType?: 'astrology' | 'vastu';
}

// Static pre-seeded gallery items (astrologer photo)
const STATIC_PHOTO_ITEMS: GalleryEntry[] = [
  {
    id: 'static-astrologer-photo',
    name: 'Vijay Sawkar – Vedic Astrologer',
    url: '/assets/generated/about-astrologer.dim_800x600.png',
    type: 'image',
    isStatic: true,
  },
];

// Static certificate entries (rendered as HTML components, not images)
const STATIC_CERTIFICATE_ITEMS: GalleryEntry[] = [
  {
    id: 'static-astrology-certificate',
    name: 'Astrology Advance Course (Vedic+KP+Nadi)',
    url: '',
    type: 'certificate',
    isStatic: true,
    certificateType: 'astrology',
  },
  {
    id: 'static-vastu-certificate',
    name: 'Vastu Advance Course',
    url: '',
    type: 'certificate',
    isStatic: true,
    certificateType: 'vastu',
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

export default function Gallery() {
  const { identity } = useInternetIdentity();
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: isAdmin } = useIsAdmin();
  const { data: backendItems = [], isLoading: galleryLoading } = useGalleryItems();

  const [filter, setFilter] = useState<FilterType>('all');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Combine static items with backend-uploaded items
  const backendEntries: GalleryEntry[] = backendItems.map(item => ({
    id: item.id,
    name: item.name,
    url: item.blob.getDirectURL(),
    type: item.type,
    isStatic: false,
  }));

  const allItems: GalleryEntry[] = [
    ...STATIC_PHOTO_ITEMS,
    ...STATIC_CERTIFICATE_ITEMS,
    ...backendEntries,
  ];

  const filteredItems = allItems.filter(item => {
    if (filter === 'photos') return item.type === 'image';
    if (filter === 'videos') return item.type === 'video';
    if (filter === 'certificates') return item.type === 'certificate';
    return true; // 'all'
  });

  // For lightbox, only show non-certificate items (images/videos)
  const lightboxItems = filteredItems.filter(item => item.type !== 'certificate');

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
    if (file) uploadMutation.mutate(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const openLightbox = (item: GalleryEntry) => {
    const idx = lightboxItems.findIndex(i => i.id === item.id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const prevItem = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length);
  };

  const nextItem = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % lightboxItems.length);
  };

  const currentLightboxItem = lightboxIndex !== null ? lightboxItems[lightboxIndex] : null;

  const filterTabs: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'photos', label: 'Photos' },
    { key: 'certificates', label: 'Certificates' },
    { key: 'videos', label: 'Videos' },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-primary">Gallery</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A visual journey through our consultations, certifications, and sacred spaces.
          </p>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            {filterTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
                  filter === tab.key
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Admin Upload */}
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

        {/* Gallery Grid */}
        {galleryLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <Image className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No media found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="relative group">
                {item.type === 'certificate' ? (
                  /* Certificate card — rendered as HTML, no lightbox */
                  <div className="rounded-xl overflow-hidden border border-cosmic-gold/30 shadow-lg hover:shadow-cosmic-gold/20 hover:border-cosmic-gold/60 transition-all duration-300">
                    <CertificateCard type={item.certificateType!} />
                    <div className="bg-cosmic-navy/80 px-4 py-2 flex items-center gap-2">
                      <Award className="h-4 w-4 text-cosmic-gold shrink-0" />
                      <span className="text-sm text-foreground/90 font-medium truncate">{item.name}</span>
                    </div>
                  </div>
                ) : (
                  /* Photo / video card — opens lightbox */
                  <div
                    className="relative rounded-xl overflow-hidden bg-muted cursor-pointer"
                    onClick={() => openLightbox(item)}
                  >
                    {item.type === 'video' ? (
                      <video
                        src={item.url}
                        className="w-full h-full object-contain"
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-auto object-contain"
                      />
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.type === 'video' && (
                      <div className="absolute top-2 left-2 bg-black/60 rounded-full p-1">
                        <Video className="h-3.5 w-3.5 text-white" />
                      </div>
                    )}
                    {/* Delete button for non-static backend items */}
                    {isAdmin && identity && !item.isStatic && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMutation.mutate(item.id);
                        }}
                        disabled={deleteMutation.isPending}
                        className="absolute top-2 right-2 p-1.5 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox — images/videos only */}
      {currentLightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </button>

          {lightboxItems.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={(e) => { e.stopPropagation(); prevItem(); }}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={(e) => { e.stopPropagation(); nextItem(); }}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div
            className="max-w-5xl max-h-[90vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {currentLightboxItem.type === 'video' ? (
              <video
                src={currentLightboxItem.url}
                controls
                autoPlay
                className="max-h-[88vh] max-w-full rounded-lg"
              />
            ) : (
              <img
                src={currentLightboxItem.url}
                alt={currentLightboxItem.name}
                className="max-h-[88vh] max-w-full object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
}
