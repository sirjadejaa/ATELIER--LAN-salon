"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { ServiceItem } from "@/lib/types";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  const [form, setForm] = useState({
    name: "",
    category: "CUT",
    description: "",
    price: 4500,
    duration: 60,
    imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80",
    active: true,
  });

  const loadData = () => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setServices(data);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingService(null);
    setForm({
      name: "",
      category: "CUT",
      description: "",
      price: 4500,
      duration: 60,
      imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80",
      active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (s: ServiceItem) => {
    setEditingService(s);
    setForm({
      name: s.name,
      category: s.category,
      description: s.description,
      price: s.price,
      duration: s.duration,
      imageUrl: s.imageUrl,
      active: s.active,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingService) {
        await fetch(`/api/services/${editingService.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setIsModalOpen(false);
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await fetch(`/api/services/${id}`, { method: "DELETE" });
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(251,249,245,0.08)]">
        <div>
          <span className="editorial-label text-[#A75D46] block mb-1">
            SERVICE DIRECTORY
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light uppercase text-[#FBF9F5]">
            HAIR & SCALP RITUALS
          </h1>
        </div>

        <button
          onClick={openAddModal}
          className="btn-luxury-light text-xs py-2.5 px-6 tracking-[0.18em]"
        >
          <Plus className="w-3.5 h-3.5 mr-2" />
          <span>ADD NEW SERVICE</span>
        </button>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 bg-[#1A1817] rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
          <div
            key={s.id}
            className="bg-[#1A1817] rounded-2xl border border-[rgba(251,249,245,0.08)] overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/9] w-full bg-[#241D1A]">
                <Image
                  src={s.imageUrl}
                  alt={s.name}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#141312]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider text-[#A75D46] font-semibold">
                  {s.category}
                </div>
                <div className="absolute top-3 right-3 bg-[#141312]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider text-[#EBE6DC]">
                  {s.duration} MINS
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif-luxury text-2xl font-light uppercase text-[#FBF9F5] mb-2">
                  {s.name}
                </h3>
                <p className="text-xs text-[#A39E99] font-light leading-relaxed mb-4 line-clamp-2">
                  {s.description}
                </p>
                <span className="font-serif-luxury text-2xl text-[#A75D46]">
                  ₹{s.price.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[rgba(251,249,245,0.08)] bg-[#241D1A] flex items-center justify-between">
              <span
                className={`text-[9px] uppercase tracking-wider font-semibold ${
                  s.active ? "text-emerald-400" : "text-[#6B6661]"
                }`}
              >
                {s.active ? "ACTIVE ON SITE" : "DISABLED"}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(s)}
                  className="p-2 rounded-lg bg-[#141312] text-[#A39E99] hover:text-[#FBF9F5] transition-colors"
                  title="Edit Service"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="p-2 rounded-lg bg-[#141312] text-[#A39E99] hover:text-rose-400 transition-colors"
                  title="Delete Service"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141312]/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#1A1817] text-[#FBF9F5] rounded-2xl p-6 sm:p-8 border border-[rgba(251,249,245,0.12)] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[rgba(251,249,245,0.08)]">
              <h3 className="font-serif-luxury text-2xl font-light uppercase">
                {editingService ? "EDIT SERVICE" : "ADD NEW SERVICE"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-[#A39E99] hover:text-[#FBF9F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                  SERVICE NAME *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. PRECISION CUT & ARCHITECTURE"
                  className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                    CATEGORY
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
                  >
                    <option value="CUT">CUT</option>
                    <option value="STYLING">STYLING</option>
                    <option value="COLOUR">COLOUR</option>
                    <option value="BALAYAGE">BALAYAGE</option>
                    <option value="TREATMENT">TREATMENT</option>
                    <option value="GROOMING">GROOMING</option>
                  </select>
                </div>

                <div>
                  <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                    PRICE (INR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                    DURATION (MINUTES)
                  </label>
                  <input
                    type="number"
                    value={form.duration}
                    onChange={(e) =>
                      setForm({ ...form, duration: parseInt(e.target.value) || 60 })
                    }
                    className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.active}
                      onChange={(e) => setForm({ ...form, active: e.target.checked })}
                      className="accent-[#A75D46] w-4 h-4 rounded"
                    />
                    <span className="text-[#EBE6DC] text-xs">Enabled & Active</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                  IMAGE URL
                </label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
                />
              </div>

              <div>
                <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                  DESCRIPTION
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46] resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[rgba(251,249,245,0.2)] text-[#A39E99] hover:text-[#FBF9F5]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="btn-luxury-light text-[10px] py-2.5 px-6 tracking-[0.2em]"
                >
                  SAVE SERVICE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
