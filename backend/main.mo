import Time "mo:core/Time";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile
  type UserProfile = {
    name : Text;
    // Other user metadata if needed
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Data Types
  type Gemstone = {
    id : Text;
    name : Text;
    sanskritName : Text;
    price : Nat;
    description : Text;
    weightOptions : [Text];
    certification : Bool;
    imageUrl : ?Text;
  };

  type Review = {
    productId : Text;
    reviewerName : Text;
    rating : Nat;
    comment : Text;
    timestamp : Time.Time;
  };

  type CartItem = {
    productId : Text;
    weight : Text;
    quantity : Nat;
  };

  type BookingRequest = {
    name : Text;
    phone : Text;
    email : Text;
    preferredDate : Text;
    consultationType : Text;
    status : Text;
    timestamp : Time.Time;
  };

  type ContactSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type SocialMediaLinks = {
    instagram : Text;
    facebook : Text;
    youtube : Text;
  };

  type GalleryItem = {
    id : Text;
    name : Text;
    blob : Storage.ExternalBlob;
    type_ : Text; // "image" or "video"
  };

  // State
  let gemstones = Map.empty<Text, Gemstone>();
  let reviews = Map.empty<Text, Review>();
  let cart = Map.empty<Text, [CartItem]>();
  let bookingRequests = Map.empty<Text, BookingRequest>();
  let contactSubmissions = Map.empty<Text, ContactSubmission>();
  let gallery = Map.empty<Text, GalleryItem>();

  var socialMediaLinks : SocialMediaLinks = {
    instagram = "sawkar.v";
    facebook = "Vijay Sawkar";
    youtube = "";
  };

  // Gemstone Management - public read, admin write
  public query func getAllGemstones() : async [Gemstone] {
    gemstones.values().toArray();
  };

  public shared ({ caller }) func addGemstone(gemstone : Gemstone) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add gemstones");
    };
    gemstones.add(gemstone.id, gemstone);
  };

  public shared ({ caller }) func updateGemstone(gemstone : Gemstone) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update gemstones");
    };
    gemstones.add(gemstone.id, gemstone);
  };

  public shared ({ caller }) func deleteGemstone(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete gemstones");
    };
    gemstones.remove(id);
  };

  // Review Management - public read, authenticated users write
  public query func getReviewsByProduct(productId : Text) : async [Review] {
    reviews.values().toArray().filter(func(r : Review) : Bool { r.productId == productId });
  };

  public shared ({ caller }) func addReview(review : Review) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can add reviews");
    };
    let key = review.productId # review.reviewerName # Int.toText(review.timestamp);
    reviews.add(key, review);
  };

  // Shopping Cart Management - authenticated users only
  public shared ({ caller }) func updateCart(sessionId : Text, items : [CartItem]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update cart");
    };
    cart.add(sessionId, items);
  };

  public query ({ caller }) func getCart(sessionId : Text) : async [CartItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view cart");
    };
    switch (cart.get(sessionId)) {
      case (null) { [] };
      case (?items) { items };
    };
  };

  // Booking Requests - anyone can submit (public form), admin can read all
  public shared func submitBookingRequest(request : BookingRequest) : async () {
    let key = Int.toText(request.timestamp) # request.phone;
    bookingRequests.add(key, request);
  };

  public query ({ caller }) func getAllBookingRequests() : async [BookingRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all booking requests");
    };
    bookingRequests.values().toArray();
  };

  // Contact Submissions - anyone can submit (public form), admin can read all
  public shared func submitContactForm(submission : ContactSubmission) : async () {
    let key = Int.toText(submission.timestamp) # submission.email;
    contactSubmissions.add(key, submission);
  };

  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all contact submissions");
    };
    contactSubmissions.values().toArray();
  };

  // Social Media Links - public read, admin write
  public shared ({ caller }) func updateSocialMediaLinks(links : SocialMediaLinks) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update social media links");
    };
    socialMediaLinks := links;
  };

  public query func getSocialMediaLinks() : async SocialMediaLinks {
    socialMediaLinks;
  };

  // Media Gallery - public read, admin write
  public shared ({ caller }) func addGalleryItem(name : Text, blob : Storage.ExternalBlob, type_ : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add gallery items");
    };
    let item : GalleryItem = {
      id = name;
      name;
      blob;
      type_;
    };
    gallery.add(name, item);
  };

  public shared ({ caller }) func deleteGalleryItem(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete gallery items");
    };
    gallery.remove(id);
  };

  public query func getGalleryItems() : async [GalleryItem] {
    gallery.values().toArray();
  };
};
