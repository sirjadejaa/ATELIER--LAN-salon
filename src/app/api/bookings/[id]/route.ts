import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const dataToUpdate: Prisma.BookingUpdateInput = {};
    if (body.status !== undefined) dataToUpdate.status = body.status;
    if (body.notes !== undefined) dataToUpdate.notes = body.notes;
    if (body.timeSlot !== undefined) dataToUpdate.timeSlot = body.timeSlot;
    if (body.date !== undefined) dataToUpdate.date = body.date;
    if (body.staffId !== undefined) {
      dataToUpdate.staff = body.staffId ? { connect: { id: body.staffId } } : { disconnect: true };
    }
    if (body.serviceId !== undefined) {
      dataToUpdate.service = body.serviceId ? { connect: { id: body.serviceId } } : { disconnect: true };
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: dataToUpdate,
      include: {
        service: true,
        staff: true,
      },
    });
    return NextResponse.json(booking);
  } catch (error) {
    console.error("Failed to update booking:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.booking.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete booking:", error);
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 });
  }
}
