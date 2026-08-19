/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");

const INITIAL_SERVICES = [
  {
    id: "srv-1",
    name: "PRECISION CUT & ARCHITECTURE",
    slug: "precision-cut",
    category: "CUT",
    description: "Architectural scissors technique tailored to your natural bone structure, hair growth vectors, and movement.",
    price: 4500,
    duration: 60,
    imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80",
    active: true,
    order: 1,
    featured: true,
  },
  {
    id: "srv-2",
    name: "SIGNATURE BESPOKE STYLING",
    slug: "signature-style",
    category: "STYLING",
    description: "Effortless, tactile texture shaping with thermal protection and organic botanical finishing elixirs.",
    price: 3800,
    duration: 45,
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
    active: true,
    order: 2,
    featured: true,
  },
  {
    id: "srv-3",
    name: "HAUTE COUTURE COLOUR",
    slug: "couture-colour",
    category: "COLOUR",
    description: "Dimensional tonal mapping, root blending, and ammonia-free gloss formulation for sublime luminosity.",
    price: 8500,
    duration: 120,
    imageUrl: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1200&q=80",
    active: true,
    order: 3,
    featured: true,
  },
  {
    id: "srv-4",
    name: "FRENCH BALAYAGE MELT",
    slug: "french-balayage",
    category: "BALAYAGE",
    description: "Freehand hand-painted gradient ribbons designed for seamless regrowth and soft daylight dimension.",
    price: 12000,
    duration: 180,
    imageUrl: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=80",
    active: true,
    order: 4,
    featured: true,
  },
  {
    id: "srv-5",
    name: "CELLULAR KERATIN & SCALP ELIXIR",
    slug: "cellular-treatment",
    category: "TREATMENT",
    description: "Micro-peptide reconstruction mask, botanical steam infusion, and deep lymphatic scalp rejuvenation.",
    price: 6500,
    duration: 75,
    imageUrl: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80",
    active: true,
    order: 5,
    featured: true,
  },
  {
    id: "srv-6",
    name: "SCULPTED EDITORIAL BLOW DRY",
    slug: "editorial-blowdry",
    category: "STYLING",
    description: "Volumetric brushwork and cold-blast setting creating airy bounce, fluid sway, and high gloss finish.",
    price: 3200,
    duration: 45,
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=80",
    active: true,
    order: 6,
    featured: false,
  },
  {
    id: "srv-7",
    name: "MASCULINE GROOMING & TEXTURE",
    slug: "masculine-grooming",
    category: "GROOMING",
    description: "Tailored scissor-over-comb silhouette, hot towel conditioning, neck taper, and matte clay finish.",
    price: 3500,
    duration: 50,
    imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80",
    active: true,
    order: 7,
    featured: false,
  },
];

const INITIAL_STAFF = [
  {
    id: "stf-1",
    name: "AARAV SHAH",
    slug: "aarav-shah",
    role: "CREATIVE DIRECTOR & FOUNDER",
    bio: "Formally trained in London and Milan with over a decade shaping signature silhouettes for global fashion weeks and private clients.",
    specialties: "Precision Cuts, Structural Bobs, Editorial Styling",
    experience: "12+ Years",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    instagram: "https://instagram.com",
    active: true,
    order: 1,
  },
  {
    id: "stf-2",
    name: "ELÉNA VANCE",
    slug: "elena-vance",
    role: "HEAD OF COLOUR & BALAYAGE",
    bio: "Specializing in low-maintenance French balayage, tonal harmonization, and bespoke platinum transformations.",
    specialties: "French Balayage, Micro-Highlights, Corrective Colour",
    experience: "9+ Years",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80",
    instagram: "https://instagram.com",
    active: true,
    order: 2,
  },
  {
    id: "stf-3",
    name: "VIKRAM SINGHANIA",
    slug: "vikram-singhania",
    role: "MASTER STYLIST & SCALP SPECIALIST",
    bio: "Pioneer of holistic hair diagnostics, tailored texturizing shears, and reconstructive peptide therapy.",
    specialties: "Long Layers, Texture Rebalance, Japanese Head Spa",
    experience: "8+ Years",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
    instagram: "https://instagram.com",
    active: true,
    order: 3,
  },
  {
    id: "stf-4",
    name: "MAYA DUBOIS",
    slug: "maya-dubois",
    role: "SENIOR EDITORIAL ARTIST",
    bio: "Celebrated for effortless red-carpet wave architecture and minimalist modern bridal aesthetics.",
    specialties: "Editorial Wave, Curtain Bangs, Gloss Treatments",
    experience: "7+ Years",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80",
    instagram: "https://instagram.com",
    active: true,
    order: 4,
  },
];

const INITIAL_PACKAGES = [
  {
    id: "pkg-1",
    name: "THE ESSENTIAL RITUAL",
    slug: "essential-ritual",
    price: 6500,
    duration: 90,
    description: "The foundational curation for ongoing refinement, clean lines, and balanced hydration.",
    includedServices: JSON.stringify([
      "Bespoke Consultation & Scalp Analysis",
      "Signature Precision Cut",
      "Detoxifying Botanical Hair Wash",
      "Sculpted Editorial Blow Dry & Style",
    ]),
    active: true,
    order: 1,
  },
  {
    id: "pkg-2",
    name: "THE SIGNATURE COUTURE",
    slug: "signature-couture",
    price: 14500,
    duration: 150,
    description: "Our most requested comprehensive ritual combining structural cut, dimensional gloss, and cellular rejuvenation.",
    includedServices: JSON.stringify([
      "Comprehensive Stylist Consultation",
      "Precision Cut & Texture Sculpting",
      "Tonal Gloss or Single-Process Colour",
      "Micro-Peptide Deep Keratin Infusion",
      "Thermal Defense & Signature Finish",
    ]),
    active: true,
    order: 2,
  },
  {
    id: "pkg-3",
    name: "THE COMPLETE TRANSFORMATION",
    slug: "complete-transformation",
    price: 24000,
    duration: 240,
    description: "An immersive, half-day master atelier journey delivering a radical, harmonious metamorphosis.",
    includedServices: JSON.stringify([
      "Private 1-on-1 Creative Director Consultation",
      "Full Hand-Painted French Balayage / Foilayage",
      "Acidic Bonding Gloss & Scalp Rebalancing",
      "Master Silhouette Re-Design Cut",
      "Cellular Steam & Aromatherapy Massage",
      "Editorial Styling & Home Care Formulation Kit",
    ]),
    active: true,
    order: 3,
  },
];

const INITIAL_BEFORE_AFTER = [
  {
    id: "ba-1",
    title: "Dimensional Sunlit Balayage & French Layering",
    category: "BALAYAGE",
    stylistId: "stf-2",
    serviceName: "French Balayage Melt",
    beforeImageUrl: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
    description: "Shifted brassy warmth into cool creamy beige ribbons with face-framing illumination and seamless growth blending.",
    active: true,
    order: 1,
  },
  {
    id: "ba-2",
    title: "Architectural Precision Bob & Gloss Glaze",
    category: "CUT",
    stylistId: "stf-1",
    serviceName: "Precision Cut & Architecture",
    beforeImageUrl: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=1000&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1000&q=80",
    description: "Removed heavy split ends to establish a razor-clean blunt jawline silhouette with inward bevel and mirror gloss.",
    active: true,
    order: 2,
  },
  {
    id: "ba-3",
    title: "Rich Espresso Brunette Depth & Velvet Shine",
    category: "COLOUR",
    stylistId: "stf-2",
    serviceName: "Haute Couture Colour",
    beforeImageUrl: "https://images.unsplash.com/photo-1584297091622-af8e5fd643bd?auto=format&fit=crop&w=1000&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1000&q=80",
    description: "Infused faded blonde strands with rich molten mocha undertones and high-luster acidic sealing.",
    active: true,
    order: 3,
  },
  {
    id: "ba-4",
    title: "Complete Metamorphosis: Soft Shag & Copper Glow",
    category: "TRANSFORMATION",
    stylistId: "stf-4",
    serviceName: "The Complete Transformation",
    beforeImageUrl: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80",
    description: "Transitioned outgrown silhouette into textured French fringe with rich multi-tonal dimensional gloss.",
    active: true,
    order: 4,
  },
];

const INITIAL_GALLERY = [
  {
    id: "gal-1",
    title: "Minimal Travertine Styling Sanctuary",
    category: "INTERIOR",
    imageUrl: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=85",
    aspectRatio: "landscape",
    caption: "Private wash suites with acoustic dampening",
    active: true,
    order: 1,
  },
  {
    id: "gal-2",
    title: "Acoustic Hair Spa & Wash Station",
    category: "INTERIOR",
    imageUrl: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=1200&q=85",
    aspectRatio: "landscape",
    caption: "Sound-dampened travertine private styling stations",
    active: true,
    order: 2,
  },
  {
    id: "gal-3",
    title: "Master Japanese Shears Discipline",
    category: "CRAFT",
    imageUrl: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=85",
    aspectRatio: "landscape",
    caption: "Handcrafted high-carbon Japanese steel tools",
    active: true,
    order: 3,
  },
  {
    id: "gal-4",
    title: "Biodynamic Cold-Pressed Formulations",
    category: "DETAILS",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
    aspectRatio: "portrait",
    caption: "Cold-pressed Amazonian & Nordic botanicals",
    active: true,
    order: 4,
  },
  {
    id: "gal-5",
    title: "Editorial Sculpted Wave Silhouette",
    category: "PORTRAIT",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85",
    aspectRatio: "portrait",
    caption: "Signature effortless runway wave architecture",
    active: true,
    order: 5,
  },
  {
    id: "gal-6",
    title: "Private Consultation Lounge",
    category: "INTERIOR",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85",
    aspectRatio: "landscape",
    caption: "Quiet confidential diagnostic area",
    active: true,
    order: 6,
  },
];

const INITIAL_TESTIMONIALS = [
  {
    id: "tst-1",
    clientName: "Rhea Singhania",
    clientRole: "Fashion Creative Director, Mumbai",
    quote: "Atelier Élan is the only studio in Mumbai that understands hair as an architectural sculpture rather than just a quick trim. The consultation alone changed how I style myself every day.",
    rating: 5,
    serviceName: "French Balayage & Precision Cut",
    clientImageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    active: true,
    order: 1,
  },
  {
    id: "tst-2",
    clientName: "Kabir Malhotra",
    clientRole: "Architect & Designer, South Mumbai",
    quote: "The acoustic peace of this space is extraordinary. No chaotic salon noise, no chemical smell—just master-level precision and pure tranquility.",
    rating: 5,
    serviceName: "Masculine Scissor-Over-Comb",
    clientImageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    active: true,
    order: 2,
  },
  {
    id: "tst-3",
    clientName: "Ananya Deshmukh",
    clientRole: "Managing Partner, Worli",
    quote: "Finding a salon that uses authentic biodynamic ammonia-free colors without sacrificing rich depth was impossible until I visited Atelier Élan. My hair has never felt healthier.",
    rating: 5,
    serviceName: "Cellular Scalp Rejuvenation",
    clientImageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    active: true,
    order: 3,
  },
];

const INITIAL_STUDIO_SETTINGS = {
  id: "singleton",
  salonName: "ATELIER ÉLAN",
  tagline: "Haute Coiffure & Modern Hair Sanctuary",
  phone: "+91 98200 48192",
  whatsapp: "+919820048192",
  email: "concierge@atelier-elan.com",
  address: "14, Alipore Heritage Enclave, South Avenue, Mumbai 400001",
  openingHours: "Tue – Sun: 10:00 AM – 08:30 PM (Mondays Reserved for Master Classes)",
  instagram: "@atelier.elan.mumbai",
  googleMapsUrl: "https://maps.google.com",
};

async function main() {
  const prisma = new PrismaClient();

  try {
    console.log("Seeding database with Atelier Élan luxury initial assets...");

    // 1. Clear old data to prevent stale image links
    await prisma.booking.deleteMany();
    await prisma.beforeAfter.deleteMany();
    await prisma.galleryItem.deleteMany();
    await prisma.package.deleteMany();
    await prisma.service.deleteMany();
    await prisma.staff.deleteMany();
    await prisma.testimonial.deleteMany();
    await prisma.studioSettings.deleteMany();

    // 2. Insert Services
    for (const service of INITIAL_SERVICES) {
      await prisma.service.create({ data: service });
    }

    // 3. Insert Staff
    for (const staff of INITIAL_STAFF) {
      await prisma.staff.create({ data: staff });
    }

    // 4. Insert Packages
    for (const pkg of INITIAL_PACKAGES) {
      await prisma.package.create({ data: pkg });
    }

    // 5. Insert Before & After Transformations
    for (const ba of INITIAL_BEFORE_AFTER) {
      await prisma.beforeAfter.create({ data: ba });
    }

    // 6. Insert Gallery Items
    for (const item of INITIAL_GALLERY) {
      await prisma.galleryItem.create({ data: item });
    }

    // 7. Insert Testimonials
    for (const testimonial of INITIAL_TESTIMONIALS) {
      await prisma.testimonial.create({ data: testimonial });
    }

    // 8. Insert Studio Settings
    await prisma.studioSettings.create({ data: INITIAL_STUDIO_SETTINGS });

    console.log("✓ Successfully seeded database with unique, high-resolution assets.");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
