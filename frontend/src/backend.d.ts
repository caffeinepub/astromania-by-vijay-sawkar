import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface SocialMediaLinks {
    instagram: string;
    facebook: string;
    youtube: string;
}
export interface BookingRequest {
    status: string;
    name: string;
    email: string;
    preferredDate: string;
    timestamp: Time;
    phone: string;
    consultationType: string;
}
export interface Gemstone {
    id: string;
    sanskritName: string;
    name: string;
    description: string;
    imageUrl?: string;
    certification: boolean;
    price: bigint;
    weightOptions: Array<string>;
}
export interface CartItem {
    weight: string;
    productId: string;
    quantity: bigint;
}
export interface GalleryItem {
    id: string;
    blob: ExternalBlob;
    name: string;
    type: string;
}
export interface Review {
    productId: string;
    reviewerName: string;
    comment: string;
    timestamp: Time;
    rating: bigint;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addGalleryItem(name: string, blob: ExternalBlob, type: string): Promise<void>;
    addGemstone(gemstone: Gemstone): Promise<void>;
    addReview(review: Review): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteGalleryItem(id: string): Promise<void>;
    deleteGemstone(id: string): Promise<void>;
    getAllBookingRequests(): Promise<Array<BookingRequest>>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAllGemstones(): Promise<Array<Gemstone>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(sessionId: string): Promise<Array<CartItem>>;
    getGalleryItems(): Promise<Array<GalleryItem>>;
    getReviewsByProduct(productId: string): Promise<Array<Review>>;
    getSocialMediaLinks(): Promise<SocialMediaLinks>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitBookingRequest(request: BookingRequest): Promise<void>;
    submitContactForm(submission: ContactSubmission): Promise<void>;
    updateCart(sessionId: string, items: Array<CartItem>): Promise<void>;
    updateGemstone(gemstone: Gemstone): Promise<void>;
    updateSocialMediaLinks(links: SocialMediaLinks): Promise<void>;
}
