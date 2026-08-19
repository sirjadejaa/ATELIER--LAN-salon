import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const service = await prisma.service.update({
      where: { id },
      data: {
        name: body.name,
        category: body.category,
        description: body.description,
        price: parseFloat(body.price),
        duration: parseInt(body.duration),
        imageUrl: body.imageUrl,
        active: body.active !== undefined ? body.active : true,
        order: parseInt(body.order) || 0,
        featured: Boolean(body.featured),
      },
    });
    return NextResponse.json(service);
  } catch (error) {
    console.error("Failed to update service:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete service:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
