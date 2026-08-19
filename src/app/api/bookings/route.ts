import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const staffId = searchParams.get("staffId");
    const status = searchParams.get("status");

    const where: Prisma.BookingWhereInput = {};
    if (date) where.date = date;
    if (staffId && staffId !== "all") where.staffId = staffId;
    if (status && status !== "all") where.status = status;

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        service: true,
        staff: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.customerName || !body.customerPhone || !body.date || !body.timeSlot) {
      return NextResponse.json(
        { error: "Missing required booking fields (Name, Phone, Date, Time Slot)" },
        { status: 400 }
      );
    }

    const bookingNumber = `ELAN-${Math.floor(1000 + Math.random() * 9000)}`;

    const booking = await prisma.booking.create({
      data: {
        bookingNumber,
        customerName: body.customerName,
        customerEmail: body.customerEmail || "",
        customerPhone: body.customerPhone,
        date: body.date,
        timeSlot: body.timeSlot,
        serviceId: body.serviceId || null,
        staffId: body.staffId || null,
        packageId: body.packageId || null,
        notes: body.notes || "",
        status: "CONFIRMED",
      },
      include: {
        service: true,
        staff: true,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Failed to create booking:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
