import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StudioIntro from "@/components/StudioIntro";
import ServicesSection from "@/components/ServicesSection";
import SignatureExperience from "@/components/SignatureExperience";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import ArtistsSection from "@/components/ArtistsSection";
import EditorialGallery from "@/components/EditorialGallery";
import PackagesSection from "@/components/PackagesSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import InstagramSection from "@/components/InstagramSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import {
  INITIAL_SERVICES,
  INITIAL_STAFF,
  INITIAL_PACKAGES,
  INITIAL_BEFORE_AFTER,
  INITIAL_GALLERY,
  INITIAL_TESTIMONIALS,
} from "@/lib/data";
import {
  ServiceItem,
  StaffItem,
  PackageItem,
  BeforeAfterItem,
  GalleryImageItem,
  TestimonialItem,
} from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let services: ServiceItem[] = INITIAL_SERVICES;
  let staff: StaffItem[] = INITIAL_STAFF;
  let packages: PackageItem[] = INITIAL_PACKAGES;
  let beforeAfter: BeforeAfterItem[] = INITIAL_BEFORE_AFTER;
  let gallery: GalleryImageItem[] = INITIAL_GALLERY;
  let testimonials: TestimonialItem[] = INITIAL_TESTIMONIALS;

  try {
    const [dbServices, dbStaff, dbPackages, dbBeforeAfter, dbGallery, dbTestimonials] =
      await Promise.all([
        prisma.service.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
        prisma.staff.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
        prisma.package.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
        prisma.beforeAfter.findMany({
          where: { active: true },
          include: { stylist: true },
          orderBy: { order: "asc" },
        }),
        prisma.galleryItem.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
        prisma.testimonial.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
      ]);

    if (dbServices.length > 0) services = dbServices as unknown as ServiceItem[];
    if (dbStaff.length > 0) staff = dbStaff as unknown as StaffItem[];
    if (dbPackages.length > 0) packages = dbPackages as unknown as PackageItem[];
    if (dbBeforeAfter.length > 0) beforeAfter = dbBeforeAfter as unknown as BeforeAfterItem[];
    if (dbGallery.length > 0) gallery = dbGallery as unknown as GalleryImageItem[];
    if (dbTestimonials.length > 0) testimonials = dbTestimonials as unknown as TestimonialItem[];
  } catch (error) {
    console.error("Database query fallback to initial data:", error);
  }

  return (
    <main className="relative min-h-screen bg-[#FBF9F5] text-[#141312] overflow-x-hidden selection:bg-[#241D1A] selection:text-[#FBF9F5]">
      <Navbar />
      <Hero />
      <StudioIntro />
      <ServicesSection initialServices={services} />
      <SignatureExperience />
      <BeforeAfterSection initialItems={beforeAfter} />
      <ArtistsSection initialStaff={staff} />
      <EditorialGallery initialItems={gallery} />
      <PackagesSection initialPackages={packages} />
      <AboutSection />
      <TestimonialsSection initialTestimonials={testimonials} />
      <FAQSection />
      <InstagramSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
