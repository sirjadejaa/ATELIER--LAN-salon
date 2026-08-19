import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const todayStr = new Date().toISOString().split("T")[0];

    const [
      totalBookings,
      todayBookings,
      pendingBookings,
      completedBookings,
      confirmedBookings,
      totalServices,
      totalStaff,
      recentBookings,
    ] = await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { date: todayStr } }),
      prisma.booking.count({ where: { status: "PENDING" } }),
      prisma.booking.count({ where: { status: "COMPLETED" } }),
      prisma.booking.count({ where: { status: "CONFIRMED" } }),
      prisma.service.count({ where: { active: true } }),
      prisma.staff.count({ where: { active: true } }),
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { service: true, staff: true },
      }),
    ]);

    // Estimated revenue calculation
    const allCompletedAndConfirmed = await prisma.booking.findMany({
      where: { status: { in: ["CONFIRMED", "COMPLETED"] } },
      include: { service: true },
    });

    const totalRevenue = allCompletedAndConfirmed.reduce(
      (acc, b) => acc + (b.service?.price || 4500),
      0
    );

    return NextResponse.json({
      totalBookings,
      todayBookings,
      pendingBookings,
      completedBookings,
      confirmedBookings,
      totalServices,
      totalStaff,
      totalRevenue,
      recentBookings,
    });
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
