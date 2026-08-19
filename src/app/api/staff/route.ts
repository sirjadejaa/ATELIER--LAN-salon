import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const staff = await prisma.staff.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(staff);
  } catch (error) {
    console.error("Failed to fetch staff:", error);
    return NextResponse.json({ error: "Failed to fetch staff" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const member = await prisma.staff.create({
      data: {
        name: body.name,
        slug,
        role: body.role,
        bio: body.bio || "",
        specialties: typeof body.specialties === "string" ? body.specialties : JSON.stringify(body.specialties || []),
        experience: body.experience || "5+ Years",
        imageUrl: body.imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
        instagram: body.instagram || null,
        active: body.active !== undefined ? body.active : true,
        order: parseInt(body.order) || 0,
      },
    });
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error("Failed to create staff member:", error);
    return NextResponse.json({ error: "Failed to create staff member" }, { status: 500 });
  }
}
