import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { INITIAL_SETTINGS } from "@/lib/data";

export async function GET() {
  try {
    let settings = await prisma.studioSettings.findUnique({
      where: { id: "singleton" },
    });
    if (!settings) {
      settings = await prisma.studioSettings.create({
        data: INITIAL_SETTINGS,
      });
    }
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const settings = await prisma.studioSettings.upsert({
      where: { id: "singleton" },
      update: {
        salonName: body.salonName,
        tagline: body.tagline,
        phone: body.phone,
        whatsapp: body.whatsapp,
        email: body.email,
        address: body.address,
        openingHours: body.openingHours,
        instagram: body.instagram,
        googleMapsUrl: body.googleMapsUrl,
      },
      create: {
        id: "singleton",
        salonName: body.salonName || "ATELIER ÉLAN",
        tagline: body.tagline || "Modern Hair Studio & Sanctuary",
        phone: body.phone || "+91 98200 48192",
        whatsapp: body.whatsapp || "+919820048192",
        email: body.email || "concierge@atelier-elan.com",
        address: body.address || "14, Alipore Heritage Enclave, South Avenue, Mumbai",
        openingHours: body.openingHours || "Tue – Sun: 10:00 AM – 08:30 PM",
        instagram: body.instagram || "@atelier.elan",
        googleMapsUrl: body.googleMapsUrl || "https://maps.google.com",
      },
    });
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to update settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
