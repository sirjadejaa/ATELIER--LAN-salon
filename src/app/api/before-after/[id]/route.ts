import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const item = await prisma.beforeAfter.update({
      where: { id },
      data: {
        title: body.title,
        category: body.category,
        stylistId: body.stylistId || null,
        serviceName: body.serviceName,
        beforeImageUrl: body.beforeImageUrl,
        afterImageUrl: body.afterImageUrl,
        description: body.description,
        active: body.active !== undefined ? body.active : true,
        order: parseInt(body.order) || 0,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    console.error("Failed to update transformation:", error);
    return NextResponse.json({ error: "Failed to update transformation" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.beforeAfter.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete transformation:", error);
    return NextResponse.json({ error: "Failed to delete transformation" }, { status: 500 });
  }
}
