"use client";

import { useState, useEffect } from "react";
import { Search, Trash2 } from "lucide-react";
import { BookingItem } from "@/lib/types";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const loadData = () => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBookings(data);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this appointment record?")) return;
    try {
      await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = bookings.filter((b) => {
    const matchesStatus = filterStatus === "all" || b.status === filterStatus;
    const matchesSearch =
      b.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bookingNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerPhone?.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(251,249,245,0.08)]">
        <div>
          <span className="editorial-label text-[#A75D46] block mb-1">
            CLIENT APPOINTMENTS
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light uppercase text-[#FBF9F5]">
            ALL SCHEDULED SESSIONS
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A39E99]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client or ref..."
              className="bg-[#1A1817] border border-[rgba(251,249,245,0.1)] rounded-xl pl-9 pr-4 py-2 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#1A1817] border border-[rgba(251,249,245,0.1)] rounded-xl px-3 py-2 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
          >
            <option value="all">All Statuses</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-[#1A1817] rounded-2xl border border-[rgba(251,249,245,0.08)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#241D1A] text-[#A39E99] uppercase tracking-wider text-[9px]">
              <tr>
                <th className="px-6 py-4 font-semibold">REF #</th>
                <th className="px-6 py-4 font-semibold">CLIENT INFO</th>
                <th className="px-6 py-4 font-semibold">RITUAL</th>
                <th className="px-6 py-4 font-semibold">MASTER ARTIST</th>
                <th className="px-6 py-4 font-semibold">DATE & TIME</th>
                <th className="px-6 py-4 font-semibold">NOTES</th>
                <th className="px-6 py-4 font-semibold">STATUS</th>
                <th className="px-6 py-4 font-semibold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(251,249,245,0.06)] text-[#EBE6DC]">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-[#A39E99] animate-pulse">
                    Loading appointments...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-[#241D1A]/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-[#A75D46] font-semibold">
                      {b.bookingNumber}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#FBF9F5]">{b.customerName}</div>
                      <div className="text-[11px] text-[#A39E99]">{b.customerPhone}</div>
                      {b.customerEmail && (
                        <div className="text-[10px] text-[#6B6661]">{b.customerEmail}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-[#FBF9F5]">
                      {b.service?.name || "Bespoke Hair Ritual"}
                      {b.service?.price && (
                        <span className="block text-[10px] text-[#A39E99]">
                          ₹{b.service.price.toLocaleString("en-IN")}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-[#A39E99]">
                      {b.staff?.name || "First Available Master"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#FBF9F5]">{b.date}</div>
                      <div className="text-[11px] text-[#A75D46]">{b.timeSlot}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs text-[11px] text-[#A39E99] truncate">
                      {b.notes || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusChange(b.id, e.target.value)}
                        className={`text-[10px] font-semibold rounded-lg px-2.5 py-1 uppercase tracking-wider bg-[#141312] border border-[rgba(251,249,245,0.1)] ${
                          b.status === "CONFIRMED"
                            ? "text-emerald-400"
                            : b.status === "COMPLETED"
                            ? "text-blue-400"
                            : b.status === "CANCELLED"
                            ? "text-rose-400"
                            : "text-amber-400"
                        }`}
                      >
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="PENDING">PENDING</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="p-1.5 rounded-md hover:bg-rose-950 text-[#A39E99] hover:text-rose-400 transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-[#A39E99]">
                    No appointments matching criteria.
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
