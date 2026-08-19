import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const pkg = await prisma.package.update({
      where: { id },
      data: {
        name: body.name,
        price: parseFloat(body.price),
        duration: parseInt(body.duration),
        description: body.description,
        includedServices: typeof body.includedServices === "string" ? body.includedServices : JSON.stringify(body.includedServices || []),
        active: body.active !== undefined ? body.active : true,
        order: parseInt(body.order) || 0,
      },
    });
    return NextResponse.json(pkg);
  } catch (error) {
    console.error("Failed to update package:", error);
    return NextResponse.json({ error: "Failed to update package" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.package.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete package:", error);
    return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
  }
}
