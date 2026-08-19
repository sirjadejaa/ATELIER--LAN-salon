"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit2, Star, X } from "lucide-react";
import { TestimonialItem } from "@/lib/types";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);

  const [form, setForm] = useState({
    clientName: "",
    clientRole: "Architect",
    quote: "",
    rating: 5,
    clientImageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    serviceName: "Precision Cut & Architecture",
  });

  const loadData = () => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTestimonials(data);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setForm({
      clientName: "",
      clientRole: "Creative Producer",
      quote: "",
      rating: 5,
      clientImageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      serviceName: "Precision Cut & Architecture",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (t: TestimonialItem) => {
    setEditingItem(t);
    setForm({
      clientName: t.clientName,
      clientRole: t.clientRole || "",
      quote: t.quote,
      rating: t.rating,
      clientImageUrl: t.clientImageUrl || "",
      serviceName: t.serviceName || "",
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await fetch(`/api/testimonials/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/testimonials", {
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
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
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
            CLIENT VOICES
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light uppercase text-[#FBF9F5]">
            EDITORIAL TESTIMONIALS
          </h1>
        </div>

        <button
          onClick={openAddModal}
          className="btn-luxury-light text-xs py-2.5 px-6 tracking-[0.18em]"
        >
          <Plus className="w-3.5 h-3.5 mr-2" />
          <span>ADD TESTIMONIAL</span>
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-[#1A1817] rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-[#1A1817] rounded-2xl border border-[rgba(251,249,245,0.08)] p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 mb-4 text-[#A75D46]">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#A75D46]" />
                ))}
              </div>

              <blockquote className="font-serif-luxury text-lg italic text-[#FBF9F5] mb-6 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </div>

            <div className="pt-4 border-t border-[rgba(251,249,245,0.08)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                {t.clientImageUrl && (
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[#241D1A]">
                    <Image
                      src={t.clientImageUrl}
                      alt={t.clientName}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-serif-luxury text-sm uppercase text-[#FBF9F5]">
                    {t.clientName}
                  </h4>
                  {t.clientRole && (
                    <span className="text-[10px] text-[#A39E99] block">
                      {t.clientRole}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(t)}
                  className="p-1.5 rounded-md bg-[#241D1A] text-[#A39E99] hover:text-[#FBF9F5]"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-1.5 rounded-md bg-[#241D1A] text-[#A39E99] hover:text-rose-400"
                >
                  <Trash2 className="w-3 h-3" />
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
          <div className="relative w-full max-w-lg bg-[#1A1817] text-[#FBF9F5] rounded-2xl p-6 sm:p-8 border border-[rgba(251,249,245,0.12)]">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[rgba(251,249,245,0.08)]">
              <h3 className="font-serif-luxury text-2xl font-light uppercase">
                {editingItem ? "EDIT TESTIMONIAL" : "ADD NEW TESTIMONIAL"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-[#A39E99] hover:text-[#FBF9F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                    CLIENT NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.clientName}
                    onChange={(e) =>
                      setForm({ ...form, clientName: e.target.value })
                    }
                    placeholder="e.g. ANANYA MEHTA"
                    className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
                  />
                </div>

                <div>
                  <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                    CLIENT ROLE / PROFESSION
                  </label>
                  <input
                    type="text"
                    value={form.clientRole}
                    onChange={(e) =>
                      setForm({ ...form, clientRole: e.target.value })
                    }
                    placeholder="e.g. Architect & Designer"
                    className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
                  />
                </div>
              </div>

              <div>
                <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                  QUOTE *
                </label>
                <textarea
                  rows={3}
                  required
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  placeholder="Share the client's reflection..."
                  className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                    RATING (1 - 5)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={form.rating}
                    onChange={(e) =>
                      setForm({ ...form, rating: parseInt(e.target.value) || 5 })
                    }
                    className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
                  />
                </div>

                <div>
                  <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                    SERVICE EXPERIENCED
                  </label>
                  <input
                    type="text"
                    value={form.serviceName}
                    onChange={(e) =>
                      setForm({ ...form, serviceName: e.target.value })
                    }
                    placeholder="Precision Cut & Architecture"
                    className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
                  />
                </div>
              </div>

              <div>
                <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                  CLIENT PHOTO URL
                </label>
                <input
                  type="url"
                  value={form.clientImageUrl}
                  onChange={(e) =>
                    setForm({ ...form, clientImageUrl: e.target.value })
                  }
                  className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
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
                  SAVE TESTIMONIAL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
