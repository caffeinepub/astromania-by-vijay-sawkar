import { useState, useRef } from 'react';
import { Upload, Trash2, Loader2, Image as ImageIcon, Video, X, Plus } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { ExternalBlob } from '../backend';

function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
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

function useAddGalleryItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, blob, type }: { name: string; blob: ExternalBlob; type: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addGalleryItem(name, blob, type);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['galleryItems'] }),
  });
}

function useDeleteGalleryItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteGalleryItem(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['galleryItems'] }),
  });
}

type MediaItem = {
  id: string;
  name: string;
  url: string;
  type: string;
};

export default function Gallery() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: isAdmin } = useIsAdmin();
  const { data: galleryItems, isLoading } = useGalleryItems();
  const addMutation = useAddGalleryItem();
  const deleteMutation = useDeleteGalleryItem();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');

  const mediaItems: MediaItem[] = (galleryItems ?? []).map(item => ({
    id: item.id,
    name: item.name,
    url: item.blob.getDirectURL(),
    type: item.type,
  }));

  const filtered = filter === 'all' ? mediaItems : mediaItems.filter(m => m.type === filter);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    const type = isVideo ? 'video' : 'image';
    const name = `${Date.now()}-${file.name}`;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });
      await addMutation.mutateAsync({ name, blob, type });
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item from the gallery?')) return;
    await deleteMutation.mutateAsync(id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-navy via-background to-background" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 50%, oklch(0.75 0.18 55) 0%, transparent 50%), radial-gradient(circle at 75% 30%, oklch(0.65 0.15 200) 0%, transparent 50%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cosmic-gold/30 bg-cosmic-gold/10 text-cosmic-gold text-sm font-medium mb-6">
            <ImageIcon className="w-4 h-4" />
            Photo & Video Gallery
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 bg-gradient-to-r from-cosmic-gold via-yellow-300 to-cosmic-gold bg-clip-text text-transparent">
            Gallery
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Moments from consultations, events, and the cosmic journey of Vijay Sawkar's practice.
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="py-8 border-b border-cosmic-gold/10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-cosmic-navy/40 border border-cosmic-gold/20 rounded-xl p-1">
            {(['all', 'image', 'video'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                  filter === f
                    ? 'bg-cosmic-gold text-cosmic-navy'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {f === 'all' ? '🌟 All' : f === 'image' ? '🖼️ Photos' : '🎬 Videos'}
              </button>
            ))}
          </div>

          {/* Upload Button (admin only) */}
          {isAuthenticated && isAdmin && (
            <div className="flex items-center gap-3">
              {uploadProgress !== null && (
                <div className="flex items-center gap-2 text-sm text-cosmic-cyan">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading {uploadProgress}%
                </div>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={addMutation.isPending || uploadProgress !== null}
                className="inline-flex items-center gap-2 px-5 py-2 bg-cosmic-gold text-cosmic-navy font-semibold rounded-xl hover:bg-yellow-400 transition-colors disabled:opacity-60"
              >
                <Plus className="w-4 h-4" />
                Upload Media
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-cosmic-gold" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 rounded-full bg-cosmic-navy/60 border border-cosmic-gold/20 flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg mb-2">No media yet</p>
              {isAuthenticated && isAdmin && (
                <p className="text-sm text-muted-foreground">
                  Click <strong className="text-cosmic-gold">Upload Media</strong> to add photos or videos.
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map(item => (
                <div
                  key={item.id}
                  className="group relative bg-cosmic-navy/40 border border-cosmic-gold/10 rounded-xl overflow-hidden hover:border-cosmic-gold/40 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedMedia(item)}
                >
                  {item.type === 'video' ? (
                    <div className="relative aspect-square bg-cosmic-navy/60 flex items-center justify-center">
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        muted
                        preload="metadata"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-12 h-12 rounded-full bg-cosmic-gold/90 flex items-center justify-center">
                          <Video className="w-5 h-5 text-cosmic-navy ml-0.5" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-xs truncate">{item.name}</p>
                    </div>
                  </div>

                  {/* Delete button (admin only) */}
                  {isAuthenticated && isAdmin && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                      disabled={deleteMutation.isPending}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-white" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={() => setSelectedMedia(null)}
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div
            className="max-w-4xl max-h-[85vh] w-full"
            onClick={e => e.stopPropagation()}
          >
            {selectedMedia.type === 'video' ? (
              <video
                src={selectedMedia.url}
                controls
                autoPlay
                className="w-full max-h-[85vh] rounded-xl"
              />
            ) : (
              <img
                src={selectedMedia.url}
                alt={selectedMedia.name}
                className="w-full max-h-[85vh] object-contain rounded-xl"
              />
            )}
            <p className="text-white/60 text-sm text-center mt-3">{selectedMedia.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}
