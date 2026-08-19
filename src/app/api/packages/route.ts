import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(packages);
  } catch (error) {
    console.error("Failed to fetch packages:", error);
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
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

    const pkg = await prisma.package.create({
      data: {
        name: body.name,
        slug,
        price: parseFloat(body.price) || 0,
        duration: parseInt(body.duration) || 60,
        description: body.description || "",
        includedServices: typeof body.includedServices === "string" ? body.includedServices : JSON.stringify(body.includedServices || []),
        active: body.active !== undefined ? body.active : true,
        order: parseInt(body.order) || 0,
      },
    });
    return NextResponse.json(pkg, { status: 201 });
  } catch (error) {
    console.error("Failed to create package:", error);
    return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
  }
}
