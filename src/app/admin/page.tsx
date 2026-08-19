"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";
import { BookingItem } from "@/lib/types";

interface DashboardStats {
  totalBookings: number;
  todayBookings: number;
  pendingBookings: number;
  completedBookings: number;
  confirmedBookings: number;
  totalServices: number;
  totalStaff: number;
  totalRevenue: number;
  recentBookings: BookingItem[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadData = () => {
    fetch("/api/stats")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch stats");
        return res.json();
      })
      .then((data) => setStats(data))
      .catch((e) => console.error("Failed to load stats:", e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateBookingStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    // Optimistic update
    setStats((prevStats) => {
      if (!prevStats?.recentBookings) return prevStats;
      const updatedList = prevStats.recentBookings.map((b) =>
        b.id === id ? { ...b, status: newStatus } : b
      );
      return { ...prevStats, recentBookings: updatedList };
    });

    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        console.error("Failed to update status on server");
        loadData(); // Revert on failure
      } else {
        loadData(); // Refresh stats counters
      }
    } catch (e) {
      console.error(e);
      loadData();
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(251,249,245,0.08)]">
        <div>
          <span className="editorial-label text-[#A75D46] block mb-1">
            EXECUTIVE DASHBOARD
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light uppercase text-[#FBF9F5]">
            ATELIER ÉLAN STUDIO MANAGEMENT
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1817] border border-[rgba(251,249,245,0.08)] text-xs text-[#EBE6DC] hover:text-[#FBF9F5] hover:border-[rgba(251,249,245,0.2)] transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>REFRESH</span>
          </button>
          <Link
            href="/admin/bookings"
            className="btn-luxury-light text-xs py-2.5 px-6 tracking-[0.18em]"
          >
            MANAGE ALL BOOKINGS
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Today's Appointments */}
        <div className="bg-[#1A1817] p-6 rounded-2xl border border-[rgba(251,249,245,0.08)] flex items-center justify-between">
          <div>
            <span className="editorial-label text-[9px] text-[#A39E99] block mb-1">
              TODAY&apos;S SESSIONS
            </span>
            <span className="font-serif-luxury text-4xl text-[#FBF9F5]">
              {stats?.todayBookings ?? 0}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#A75D46]/15 text-[#A75D46] flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Pending Confirmations */}
        <div className="bg-[#1A1817] p-6 rounded-2xl border border-[rgba(251,249,245,0.08)] flex items-center justify-between">
          <div>
            <span className="editorial-label text-[9px] text-[#A39E99] block mb-1">
              PENDING INQUIRIES
            </span>
            <span className="font-serif-luxury text-4xl text-[#EBE6DC]">
              {stats?.pendingBookings ?? 0}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Total Bookings */}
        <div className="bg-[#1A1817] p-6 rounded-2xl border border-[rgba(251,249,245,0.08)] flex items-center justify-between">
          <div>
            <span className="editorial-label text-[9px] text-[#A39E99] block mb-1">
              TOTAL APPOINTMENTS
            </span>
            <span className="font-serif-luxury text-4xl text-[#FBF9F5]">
              {stats?.totalBookings ?? 0}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#241D1A] text-[#EBE6DC] flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Est. Revenue */}
        <div className="bg-[#1A1817] p-6 rounded-2xl border border-[rgba(251,249,245,0.08)] flex items-center justify-between">
          <div>
            <span className="editorial-label text-[9px] text-[#A39E99] block mb-1">
              RECORDED REVENUE
            </span>
            <span className="font-serif-luxury text-3xl sm:text-4xl text-[#A75D46]">
              ₹{(stats?.totalRevenue ?? 42500).toLocaleString("en-IN")}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#A75D46]/20 text-[#A75D46] flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Bookings Live Table */}
      <div className="bg-[#1A1817] rounded-2xl border border-[rgba(251,249,245,0.08)] overflow-hidden">
        <div className="p-6 border-b border-[rgba(251,249,245,0.08)] flex items-center justify-between">
          <div>
            <span className="editorial-label text-[9px] text-[#A75D46] block mb-1">
              LIVE SCHEDULE STREAM
            </span>
            <h2 className="font-serif-luxury text-2xl font-light uppercase text-[#FBF9F5]">
              RECENT CLIENT APPOINTMENTS
            </h2>
          </div>
          <Link
            href="/admin/bookings"
            className="text-xs uppercase tracking-wider text-[#A75D46] hover:underline flex items-center gap-1"
          >
            <span>View Full Schedule</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#241D1A] text-[#A39E99] uppercase tracking-wider text-[9px]">
              <tr>
                <th className="px-6 py-4 font-semibold">REF #</th>
                <th className="px-6 py-4 font-semibold">CLIENT</th>
                <th className="px-6 py-4 font-semibold">RITUAL</th>
                <th className="px-6 py-4 font-semibold">ARTIST</th>
                <th className="px-6 py-4 font-semibold">SCHEDULE</th>
                <th className="px-6 py-4 font-semibold">STATUS</th>
                <th className="px-6 py-4 font-semibold text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(251,249,245,0.06)] text-[#EBE6DC]">
              {stats && stats.recentBookings && stats.recentBookings.length > 0 ? (
                stats.recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#241D1A]/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-[#A75D46]">
                      {b.bookingNumber}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#FBF9F5]">{b.customerName}</div>
                      <div className="text-[11px] text-[#A39E99]">{b.customerPhone}</div>
                    </td>
                    <td className="px-6 py-4 text-[#FBF9F5]">
                      {b.service?.name || "Bespoke Hair Ritual"}
                    </td>
                    <td className="px-6 py-4 text-[#A39E99]">
                      {b.staff?.name || "First Available"}
                    </td>
                    <td className="px-6 py-4">
                      <div>{b.date}</div>
                      <div className="text-[11px] text-[#A39E99]">{b.timeSlot}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full font-semibold ${
                          b.status === "CONFIRMED"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : b.status === "COMPLETED"
                            ? "bg-blue-500/20 text-blue-400"
                            : b.status === "CANCELLED"
                            ? "bg-rose-500/20 text-rose-400"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        {b.status !== "CONFIRMED" && (
                          <button
                            onClick={() => updateBookingStatus(b.id, "CONFIRMED")}
                            disabled={updatingId === b.id}
                            className="px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-400 hover:bg-emerald-900 text-[10px] transition-opacity disabled:opacity-50"
                          >
                            Confirm
                          </button>
                        )}
                        {b.status !== "COMPLETED" && (
                          <button
                            onClick={() => updateBookingStatus(b.id, "COMPLETED")}
                            disabled={updatingId === b.id}
                            className="px-2.5 py-1 rounded-md bg-blue-950 text-blue-400 hover:bg-blue-900 text-[10px] transition-opacity disabled:opacity-50"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-[#A39E99]">
                    No appointments recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
