import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const item = await prisma.testimonial.update({
      where: { id },
      data: {
        clientName: body.clientName,
        clientRole: body.clientRole,
        quote: body.quote,
        rating: parseInt(body.rating) || 5,
        clientImageUrl: body.clientImageUrl,
        serviceName: body.serviceName,
        active: body.active !== undefined ? body.active : true,
        order: parseInt(body.order) || 0,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    console.error("Failed to update testimonial:", error);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete testimonial:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
