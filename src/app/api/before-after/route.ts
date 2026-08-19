import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.beforeAfter.findMany({
      include: { stylist: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("Failed to fetch before/after items:", error);
    return NextResponse.json({ error: "Failed to fetch before/after items" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const item = await prisma.beforeAfter.create({
      data: {
        title: body.title,
        category: body.category || "ALL",
        stylistId: body.stylistId || null,
        serviceName: body.serviceName || "",
        beforeImageUrl: body.beforeImageUrl,
        afterImageUrl: body.afterImageUrl,
        description: body.description || "",
        active: body.active !== undefined ? body.active : true,
        order: parseInt(body.order) || 0,
      },
    });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Failed to create before/after item:", error);
    return NextResponse.json({ error: "Failed to create before/after item" }, { status: 500 });
  }
}
