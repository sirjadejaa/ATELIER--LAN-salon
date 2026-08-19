"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { StaffItem } from "@/lib/types";

export default function AdminStaffPage() {
  const [staffList, setStaffList] = useState<StaffItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffItem | null>(null);

  const [form, setForm] = useState({
    name: "",
    role: "CREATIVE DIRECTOR",
    bio: "",
    specialties: "Precision Cuts, Structural Bobs, Editorial Styling",
    experience: "10+ Years",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    instagram: "https://instagram.com",
    active: true,
  });

  const loadData = () => {
    fetch("/api/staff")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setStaffList(data);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingStaff(null);
    setForm({
      name: "",
      role: "CREATIVE DIRECTOR",
      bio: "",
      specialties: "Precision Cuts, Structural Bobs, Editorial Styling",
      experience: "10+ Years",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      instagram: "https://instagram.com",
      active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (stf: StaffItem) => {
    setEditingStaff(stf);
    setForm({
      name: stf.name,
      role: stf.role,
      bio: stf.bio,
      specialties: typeof stf.specialties === "string" ? stf.specialties : JSON.stringify(stf.specialties),
      experience: stf.experience,
      imageUrl: stf.imageUrl,
      instagram: stf.instagram || "",
      active: stf.active,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingStaff) {
        await fetch(`/api/staff/${editingStaff.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/staff", {
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
    if (!confirm("Are you sure you want to delete this artist profile?")) return;
    try {
      await fetch(`/api/staff/${id}`, { method: "DELETE" });
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
            ARTIST DIRECTORY
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light uppercase text-[#FBF9F5]">
            MASTER STYLISTS & COLORISTS
          </h1>
        </div>

        <button
          onClick={openAddModal}
          className="btn-luxury-light text-xs py-2.5 px-6 tracking-[0.18em]"
        >
          <Plus className="w-3.5 h-3.5 mr-2" />
          <span>ADD NEW ARTIST</span>
        </button>
      </div>

      {/* Staff Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-80 bg-[#1A1817] rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {staffList.map((stf) => (
          <div
            key={stf.id}
            className="bg-[#1A1817] rounded-2xl border border-[rgba(251,249,245,0.08)] overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[3/4] w-full bg-[#241D1A]">
                <Image
                  src={stf.imageUrl}
                  alt={stf.name}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-[#141312]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider text-[#A75D46] font-semibold">
                  {stf.experience}
                </div>
              </div>

              <div className="p-5">
                <span className="editorial-label text-[8px] text-[#A75D46] block mb-1">
                  {stf.role}
                </span>
                <h3 className="font-serif-luxury text-xl font-light uppercase text-[#FBF9F5] mb-2">
                  {stf.name}
                </h3>
                <p className="text-xs text-[#A39E99] font-light leading-relaxed line-clamp-2">
                  {stf.bio}
                </p>
              </div>
            </div>

            <div className="px-5 py-3 border-t border-[rgba(251,249,245,0.08)] bg-[#241D1A] flex items-center justify-between">
              <span
                className={`text-[9px] uppercase tracking-wider font-semibold ${
                  stf.active ? "text-emerald-400" : "text-[#6B6661]"
                }`}
              >
                {stf.active ? "AVAILABLE" : "DISABLED"}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(stf)}
                  className="p-1.5 rounded-md bg-[#141312] text-[#A39E99] hover:text-[#FBF9F5]"
                  title="Edit Artist"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(stf.id)}
                  className="p-1.5 rounded-md bg-[#141312] text-[#A39E99] hover:text-rose-400"
                  title="Delete Artist"
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
                {editingStaff ? "EDIT ARTIST PROFILE" : "ADD NEW ARTIST"}
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
                  ARTIST FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. AARAV SHAH"
                  className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                    ROLE TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="e.g. CREATIVE DIRECTOR"
                    className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
                  />
                </div>

                <div>
                  <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                    EXPERIENCE *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    placeholder="e.g. 12+ Years"
                    className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
                  />
                </div>
              </div>

              <div>
                <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                  SPECIALTIES (COMMA-SEPARATED)
                </label>
                <input
                  type="text"
                  value={form.specialties}
                  onChange={(e) => setForm({ ...form, specialties: e.target.value })}
                  placeholder="Precision cuts, Balayage, Textured bobs"
                  className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
                />
              </div>

              <div>
                <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                  PORTRAIT PHOTO URL
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
                  BIOGRAPHY / ARTISTIC APPROACH
                </label>
                <textarea
                  rows={3}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
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
                  SAVE ARTIST
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
