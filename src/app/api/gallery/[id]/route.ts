import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const item = await prisma.galleryItem.update({
      where: { id },
      data: {
        title: body.title,
        category: body.category,
        imageUrl: body.imageUrl,
        aspectRatio: body.aspectRatio,
        caption: body.caption,
        active: body.active !== undefined ? body.active : true,
        order: parseInt(body.order) || 0,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    console.error("Failed to update gallery item:", error);
    return NextResponse.json({ error: "Failed to update gallery item" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.galleryItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete gallery item:", error);
    return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 });
  }
}
