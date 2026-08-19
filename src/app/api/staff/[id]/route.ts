import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const member = await prisma.staff.update({
      where: { id },
      data: {
        name: body.name,
        role: body.role,
        bio: body.bio,
        specialties: typeof body.specialties === "string" ? body.specialties : JSON.stringify(body.specialties || []),
        experience: body.experience,
        imageUrl: body.imageUrl,
        instagram: body.instagram,
        active: body.active !== undefined ? body.active : true,
        order: parseInt(body.order) || 0,
      },
    });
    return NextResponse.json(member);
  } catch (error) {
    console.error("Failed to update staff member:", error);
    return NextResponse.json({ error: "Failed to update staff member" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.staff.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete staff member:", error);
    return NextResponse.json({ error: "Failed to delete staff member" }, { status: 500 });
  }
}
