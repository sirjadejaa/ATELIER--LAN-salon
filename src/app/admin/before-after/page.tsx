"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { BeforeAfterItem, StaffItem } from "@/lib/types";

export default function AdminBeforeAfterPage() {
  const [items, setItems] = useState<BeforeAfterItem[]>([]);
  const [staffList, setStaffList] = useState<StaffItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BeforeAfterItem | null>(null);

  const [form, setForm] = useState({
    title: "",
    category: "BALAYAGE",
    serviceName: "French Balayage Melt",
    stylistId: "",
    beforeImageUrl: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1000&q=80",
    description: "",
    active: true,
  });

  const loadData = () => {
    Promise.all([
      fetch("/api/before-after").then((r) => r.json()),
      fetch("/api/staff").then((r) => r.json()),
    ])
      .then(([dataItems, dataStaff]) => {
        if (Array.isArray(dataItems)) setItems(dataItems);
        if (Array.isArray(dataStaff)) setStaffList(dataStaff);
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
      title: "",
      category: "BALAYAGE",
      serviceName: "French Balayage Melt",
      stylistId: staffList[0]?.id || "",
      beforeImageUrl: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80",
      afterImageUrl: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1000&q=80",
      description: "",
      active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: BeforeAfterItem) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      category: item.category,
      serviceName: item.serviceName,
      stylistId: item.stylistId || "",
      beforeImageUrl: item.beforeImageUrl,
      afterImageUrl: item.afterImageUrl,
      description: item.description || "",
      active: item.active,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await fetch(`/api/before-after/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/before-after", {
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
    if (!confirm("Are you sure you want to delete this transformation?")) return;
    try {
      await fetch(`/api/before-after/${id}`, { method: "DELETE" });
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
            TRANSFORMATION ARCHIVE
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light uppercase text-[#FBF9F5]">
            BEFORE & AFTER CASE STUDIES
          </h1>
        </div>

        <button
          onClick={openAddModal}
          className="btn-luxury-light text-xs py-2.5 px-6 tracking-[0.18em]"
        >
          <Plus className="w-3.5 h-3.5 mr-2" />
          <span>ADD TRANSFORMATION</span>
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="h-80 bg-[#1A1817] rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item) => (
          <div
            key={item.id}
            className="bg-[#1A1817] rounded-2xl border border-[rgba(251,249,245,0.08)] overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Split Image Preview */}
              <div className="grid grid-cols-2 aspect-[16/9] w-full bg-[#241D1A]">
                <div className="relative h-full border-r border-[#141312]">
                  <Image
                    src={item.beforeImageUrl}
                    alt="Before"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-[#141312]/80 text-[8px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded text-[#A39E99]">
                    BEFORE
                  </div>
                </div>
                <div className="relative h-full">
                  <Image
                    src={item.afterImageUrl}
                    alt="After"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-[#141312]/80 text-[8px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded text-[#A75D46]">
                    AFTER
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#A75D46]/20 text-[#A75D46] font-semibold">
                    {item.category}
                  </span>
                  <span className="text-xs text-[#A39E99]">{item.serviceName}</span>
                </div>
                <h3 className="font-serif-luxury text-2xl font-light uppercase text-[#FBF9F5] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#A39E99] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[rgba(251,249,245,0.08)] bg-[#241D1A] flex justify-end gap-2">
              <button
                onClick={() => openEditModal(item)}
                className="p-2 rounded-lg bg-[#141312] text-[#A39E99] hover:text-[#FBF9F5]"
                title="Edit Transformation"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-lg bg-[#141312] text-[#A39E99] hover:text-rose-400"
                title="Delete Transformation"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
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
                {editingItem ? "EDIT CASE STUDY" : "ADD NEW CASE STUDY"}
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
                  TRANSFORMATION TITLE *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Dimensional Sunlit Balayage & French Layering"
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
                    <option value="BALAYAGE">BALAYAGE</option>
                    <option value="CUT">CUT</option>
                    <option value="COLOUR">COLOUR</option>
                    <option value="TRANSFORMATION">TRANSFORMATION</option>
                  </select>
                </div>

                <div>
                  <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                    SERVICE NAME
                  </label>
                  <input
                    type="text"
                    value={form.serviceName}
                    onChange={(e) => setForm({ ...form, serviceName: e.target.value })}
                    placeholder="e.g. French Balayage Melt"
                    className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
                  />
                </div>
              </div>

              <div>
                <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                  BEFORE IMAGE URL *
                </label>
                <input
                  type="url"
                  required
                  value={form.beforeImageUrl}
                  onChange={(e) => setForm({ ...form, beforeImageUrl: e.target.value })}
                  className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
                />
              </div>

              <div>
                <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                  AFTER IMAGE URL *
                </label>
                <input
                  type="url"
                  required
                  value={form.afterImageUrl}
                  onChange={(e) => setForm({ ...form, afterImageUrl: e.target.value })}
                  className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
                />
              </div>

              <div>
                <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                  TRANSFORMATION DESCRIPTION
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
                  SAVE TRANSFORMATION
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
