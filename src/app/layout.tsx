import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollEffects from "@/components/ScrollEffects";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingModalWrapper from "@/components/BookingModalWrapper";
import CanvasDepth from "@/components/CanvasDepth";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atelier-elan.com"),
  title: "ATELIER ÉLAN — Haute Coiffure & Modern Hair Sanctuary",
  description:
    "A considered space where precision scissors technique, dimensional French balayage, and quiet architectural luxury converge. 5-Star luxury hair atelier in Mumbai & New Delhi.",
  keywords: [
    "Luxury Salon",
    "Haute Coiffure",
    "French Balayage",
    "Precision Cut",
    "Quiet Luxury Salon",
    "Editorial Hair Styling",
    "Atelier Élan",
    "Mumbai Luxury Salon",
  ],
  openGraph: {
    title: "ATELIER ÉLAN — Haute Coiffure & Modern Hair Sanctuary",
    description:
      "Crafted for your signature. Precision cuts, considered colour and effortless styling created around you in South Mumbai.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/hero-poster.webp",
        width: 1200,
        height: 630,
        alt: "Atelier Élan 5-Star Luxury Hair Studio Mumbai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ATELIER ÉLAN — Haute Coiffure",
    description: "Crafted for your signature. 5-star luxury hair sanctuary in Mumbai.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "ATELIER ÉLAN",
  image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80",
  telephone: "+91 98200 48192",
  email: "concierge@atelier-elan.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "14, Alipore Heritage Enclave, South Avenue",
    addressLocality: "Mumbai",
    addressRegion: "MH",
    postalCode: "400001",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "20:30",
    },
  ],
  priceRange: "₹₹₹₹",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} font-sans-clean scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#FBF9F5] text-[#141312] antialiased selection:bg-[#241D1A] selection:text-[#FBF9F5] overflow-x-hidden">
        <SmoothScroll>
          <CanvasDepth />
          <ScrollEffects />
          {children}
          <ScrollToTop />
          <WhatsAppButton />
          <BookingModalWrapper />
        </SmoothScroll>
      </body>
    </html>
  );
}
