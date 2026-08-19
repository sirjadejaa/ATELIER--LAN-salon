export type ServiceCategory =
  | "CUT"
  | "STYLING"
  | "COLOUR"
  | "BALAYAGE"
  | "TREATMENT"
  | "GROOMING";

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  duration: number; // in minutes
  imageUrl: string;
  active: boolean;
  order: number;
  featured?: boolean;
}

export interface StaffItem {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  specialties: string[] | string;
  experience: string;
  imageUrl: string;
  instagram?: string | null;
  active: boolean;
  order: number;
}

export interface PackageItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  duration: number;
  description: string;
  includedServices: string[] | string;
  active: boolean;
  order: number;
}

export interface BookingItem {
  id: string;
  bookingNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  timeSlot: string;
  serviceId?: string | null;
  service?: { name: string; price: number } | null;
  staffId?: string | null;
  staff?: { name: string; role: string } | null;
  packageId?: string | null;
  notes?: string | null;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | string;
  createdAt: string | Date;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: "ALL" | "CUT" | "COLOUR" | "STYLE" | "TRANSFORMATION" | string;
  stylistId?: string | null;
  stylist?: { name: string } | null;
  stylistName?: string;
  serviceName: string;
  technique?: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  description?: string | null;
  active: boolean;
  order: number;
}

export interface GalleryImageItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  aspectRatio: "portrait" | "landscape" | "square" | string;
  caption?: string | null;
  active: boolean;
  order: number;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole?: string | null;
  quote: string;
  rating: number;
  clientImageUrl?: string | null;
  serviceName?: string | null;
  active: boolean;
  order: number;
}

export interface StudioSettingsItem {
  id: string;
  salonName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  openingHours: string;
  instagram: string;
  googleMapsUrl: string;
}
