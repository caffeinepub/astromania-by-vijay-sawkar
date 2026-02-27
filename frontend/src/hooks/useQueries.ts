import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type {
  Gemstone,
  Review,
  CartItem,
  BookingRequest,
  ContactSubmission,
  SocialMediaLinks,
  GalleryItem,
  UserProfile,
} from '../backend';
import { ExternalBlob } from '../backend';

// ─── User Profile ────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// ─── Gemstones ───────────────────────────────────────────────────────────────

export function useGetAllGemstones() {
  const { actor, isFetching } = useActor();

  return useQuery<Gemstone[]>({
    queryKey: ['gemstones'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGemstones();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddGemstone() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (gemstone: Gemstone) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addGemstone(gemstone);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gemstones'] });
    },
  });
}

export function useUpdateGemstone() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (gemstone: Gemstone) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateGemstone(gemstone);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gemstones'] });
    },
  });
}

export function useDeleteGemstone() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteGemstone(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gemstones'] });
    },
  });
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export function useGetReviewsByProduct(productId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Review[]>({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReviewsByProduct(productId);
    },
    enabled: !!actor && !isFetching && !!productId,
  });
}

export function useAddReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (review: Review) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addReview(review);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.productId] });
    },
  });
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export function useGetCart(sessionId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<CartItem[]>({
    queryKey: ['cart', sessionId],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getCart(sessionId);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!sessionId,
  });
}

export function useUpdateCart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ sessionId, items }: { sessionId: string; items: CartItem[] }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateCart(sessionId, items);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cart', variables.sessionId] });
    },
  });
}

// ─── Booking Requests ─────────────────────────────────────────────────────────

export function useSubmitBookingRequest() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (request: BookingRequest) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitBookingRequest(request);
    },
  });
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

export function useSubmitContactForm() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (submission: ContactSubmission) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitContactForm(submission);
    },
  });
}

// ─── Social Media Links ───────────────────────────────────────────────────────

export function useGetSocialMediaLinks() {
  const { actor, isFetching } = useActor();

  return useQuery<SocialMediaLinks>({
    queryKey: ['socialMediaLinks'],
    queryFn: async () => {
      if (!actor) return { instagram: '', facebook: '', youtube: '' };
      return actor.getSocialMediaLinks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateSocialMediaLinks() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (links: SocialMediaLinks) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateSocialMediaLinks(links);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socialMediaLinks'] });
    },
  });
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

export function useGetGalleryItems() {
  const { actor, isFetching } = useActor();

  return useQuery<GalleryItem[]>({
    queryKey: ['galleryItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGalleryItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddGalleryItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      blob,
      type,
    }: {
      name: string;
      blob: ExternalBlob;
      type: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addGalleryItem(name, blob, type);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryItems'] });
    },
  });
}

export function useDeleteGalleryItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteGalleryItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryItems'] });
    },
  });
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching,
  });
}
