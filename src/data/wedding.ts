/**
 * Central wedding configuration.
 * Update names, dates, venue, events, gallery, and messages here —
 * components read from this file and should not need to change.
 *
 * Anything marked PENDING is a known gap. Do not invent values for these;
 * leave them as-is until the real information is supplied.
 */

export interface WeddingEvent {
  id: string;
  name: string;
  nameMarathi?: string;
  /** ISO date, e.g. "2026-11-26" */
  date: string | null;
  startTime: string | null;
  endTime: string | null;
  venue: string | null;
  description: string;
  dressCode?: string;
  image?: string;
  directionsUrl?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  date?: string;
}

export const couple = {
  groom: {
    name: "Omkar",
    fullName: "Omkar", // PENDING: full name with surname if desired
  },
  bride: {
    name: "Vrushali",
    fullName: "Vrushali", // PENDING: full name with surname if desired
  },
  coupleStory:
    "", // PENDING: short story / how-they-met text, optional
  photos: {
    groomPortrait: null as string | null, // PENDING: path under /public/images once supplied
    bridePortrait: null as string | null, // PENDING
    couplePhoto: "/images/gallery/1.jpg",
  },
};

export const wedding = {
  /** ISO date for the main wedding ceremony */
  date: "2026-11-26",
  /**
   * PENDING: the actual muhurat (ceremony time) has not been confirmed by the family.
   * This is NOT a confirmed time — it exists only so the countdown has a reference
   * point. The UI must always label it as provisional/unconfirmed, never as the
   * real ceremony time. Update once the muhurat is confirmed.
   */
  referenceCeremonyTime: "10:00",
  ceremonyTimeConfirmed: false,
  timezone: "Asia/Kolkata",
  venue: {
    name: "Shivratna Mangal Karyalay",
    fullAddress: "Shivratna Mangal Karyalay, Satara Road Koregaon Road (Via Khed), Koregaon, Maharashtra 415501",
    mapUrl: "https://share.google/2WEG9dqUAK0wwWG33",
    photo: null as string | null, // PENDING: a photo of the actual venue, if supplied
    travelInfo: "", // PENDING
    parkingInfo: "", // PENDING
  },
};

/**
 * Event schedule. Empty by default — add entries once functions are
 * confirmed. Each event is fully optional/configurable.
 */
export const events: WeddingEvent[] = [
  // Example shape (left commented intentionally — do not display fabricated events):
  // {
  //   id: "haldi",
  //   name: "Haldi",
  //   nameMarathi: "हळद",
  //   date: "2026-11-24",
  //   startTime: "10:00",
  //   endTime: "13:00",
  //   venue: "Koregaon",
  //   description: "",
  //   dressCode: "Yellow",
  // },
];

export const gallery: GalleryImage[] = [
  { id: "1", src: "/images/gallery/1.jpg", alt: "Omkar and Vrushali by the river, rose petals falling", caption: "" },
  { id: "2", src: "/images/gallery/2.jpg", alt: "Omkar and Vrushali at a temple courtyard", caption: "" },
  { id: "3", src: "/images/gallery/3.jpg", alt: "Omkar and Vrushali on stone steps", caption: "" },
  { id: "4", src: "/images/gallery/4.jpg", alt: "Omkar and Vrushali against a carved temple wall", caption: "" },
  { id: "5", src: "/images/gallery/5.jpg", alt: "Vrushali in a saree twirl, Omkar smiling nearby", caption: "" },
];

export const family = {
  // PENDING: family names and contact details not yet provided.
  groomSide: [] as { name: string; relation: string; phone?: string }[],
  brideSide: [] as { name: string; relation: string; phone?: string }[],
};

export const rsvp = {
  // PENDING: RSVP / contact details not yet provided.
  contactName: null as string | null,
  contactPhone: null as string | null,
  contactEmail: null as string | null,
};

export const music = {
  /** Path under /public/audio. Leave null until a licensed track is supplied. */
  src: null as string | null,
  title: "",
};

export const messages = {
  openingBlessing: "॥ श्री गणेशाय नमः ॥",
  invitationTitle: "लग्न पत्रिका",
  invitationSubtitle: "Wedding Invitation",
  openInstruction: "Tap to open the invitation",
  scratchInstruction: "आमंत्रण उलगडण्यासाठी येथे स्क्रॅच करा",
  scratchRevealMessage: "आपल्या उपस्थितीने आमचा आनंद द्विगुणित होईल",
  welcomeMessage:
    "With the blessings of our families, we joyfully invite you to celebrate our wedding.",
  mandalaEyebrow: "शुभ मंगल सावधान",
  mandalaCaption: "A union blessed, a journey begun",
  landscapeCaption: "Koregaon, with love",
  eventsEmptyState: "लग्नसोहळ्याचा सविस्तर कार्यक्रम लवकरच कळविण्यात येईल",
  eventsEmptyStateEnglish: "The full function schedule will be shared soon",
  ceremonyTimeProvisionalNote: "Time shown is a placeholder only — the muhurat is not yet confirmed.",
  closingBlessing: "सहपरिवार विवाह सोहळ्यास अवश्य उपस्थित रहावे",
  closingNote: "Looking forward to celebrating with you",
};

export const shareConfig = {
  shareTitle: "Omkar & Vrushali's Wedding Invitation",
  shareText: "Join us in celebrating the wedding of Omkar and Vrushali!",
};
