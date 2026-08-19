import { PrismaClient } from "@prisma/client";
import {
  INITIAL_SERVICES,
  INITIAL_STAFF,
  INITIAL_PACKAGES,
  INITIAL_BEFORE_AFTER,
  INITIAL_GALLERY,
  INITIAL_TESTIMONIALS,
  INITIAL_SETTINGS,
} from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Atelier Élan Luxury Salon Database...");

  // 1. Settings
  await prisma.studioSettings.upsert({
    where: { id: "singleton" },
    update: INITIAL_SETTINGS,
    create: INITIAL_SETTINGS,
  });

  // 2. Services
  for (const s of INITIAL_SERVICES) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }

  // 3. Staff
  for (const stf of INITIAL_STAFF) {
    await prisma.staff.upsert({
      where: { slug: stf.slug },
      update: stf,
      create: stf,
    });
  }

  // 4. Packages
  for (const pkg of INITIAL_PACKAGES) {
    await prisma.package.upsert({
      where: { slug: pkg.slug },
      update: pkg,
      create: pkg,
    });
  }

  // 5. Before & After
  await prisma.beforeAfter.deleteMany();
  for (const ba of INITIAL_BEFORE_AFTER) {
    await prisma.beforeAfter.create({
      data: {
        id: ba.id,
        title: ba.title,
        category: ba.category,
        stylistId: ba.stylistId,
        serviceName: ba.serviceName,
        beforeImageUrl: ba.beforeImageUrl,
        afterImageUrl: ba.afterImageUrl,
        description: ba.description,
        active: ba.active,
        order: ba.order,
      },
    });
  }

  // 6. Gallery
  await prisma.galleryItem.deleteMany();
  for (const gal of INITIAL_GALLERY) {
    await prisma.galleryItem.create({
      data: gal,
    });
  }

  // 7. Testimonials
  await prisma.testimonial.deleteMany();
  for (const t of INITIAL_TESTIMONIALS) {
    await prisma.testimonial.create({
      data: t,
    });
  }

  // 8. Sample initial bookings
  await prisma.booking.deleteMany();
  const sampleBookings = [
    {
      bookingNumber: "ELAN-8921",
      customerName: "Radhika Singhania",
      customerEmail: "radhika.s@outlook.com",
      customerPhone: "+91 98201 11223",
      date: new Date().toISOString().split("T")[0],
      timeSlot: "11:30 AM",
      serviceId: "srv-1",
      staffId: "stf-1",
      notes: "Looking for a sharper blunt bob with jawline framing.",
      status: "CONFIRMED",
    },
    {
      bookingNumber: "ELAN-8922",
      customerName: "Priyanka Mehra",
      customerEmail: "priyanka.mehra@gmail.com",
      customerPhone: "+91 98110 44556",
      date: new Date().toISOString().split("T")[0],
      timeSlot: "02:00 PM",
      serviceId: "srv-4",
      staffId: "stf-2",
      notes: "Previous balayage is 5 months old; needs root blend.",
      status: "CONFIRMED",
    },
    {
      bookingNumber: "ELAN-8923",
      customerName: "Siddharth Sen",
      customerEmail: "siddharth.sen@studio.co",
      customerPhone: "+91 99200 77889",
      date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      timeSlot: "04:30 PM",
      serviceId: "srv-7",
      staffId: "stf-3",
      notes: "Japanese scalp treatment + clean neck taper.",
      status: "PENDING",
    },
    {
      bookingNumber: "ELAN-8924",
      customerName: "Zoya Al-Hassan",
      customerEmail: "zoya.hassan@vogue.in",
      customerPhone: "+91 98700 99881",
      date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
      timeSlot: "10:00 AM",
      serviceId: "srv-3",
      staffId: "stf-2",
      notes: "Warm mocha gloss transformation.",
      status: "COMPLETED",
    },
  ];

  for (const b of sampleBookings) {
    await prisma.booking.create({ data: b });
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
