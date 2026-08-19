"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Check, X } from "lucide-react";
import { PackageItem } from "@/lib/types";

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageItem | null>(null);

  const [form, setForm] = useState({
    name: "",
    price: 14500,
    duration: 150,
    description: "",
    includedServices: '["Bespoke Consultation", "Precision Cut", "Tonal Gloss", "Deep Treatment"]',
    active: true,
  });

  const loadData = () => {
    fetch("/api/packages")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPackages(data);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingPackage(null);
    setForm({
      name: "",
      price: 14500,
      duration: 150,
      description: "",
      includedServices: '["Bespoke Consultation", "Precision Cut", "Tonal Gloss", "Deep Treatment"]',
      active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (pkg: PackageItem) => {
    setEditingPackage(pkg);
    setForm({
      name: pkg.name,
      price: pkg.price,
      duration: pkg.duration,
      description: pkg.description,
      includedServices:
        typeof pkg.includedServices === "string"
          ? pkg.includedServices
          : JSON.stringify(pkg.includedServices),
      active: pkg.active,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPackage) {
        await fetch(`/api/packages/${editingPackage.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/packages", {
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
    if (!confirm("Are you sure you want to delete this package?")) return;
    try {
      await fetch(`/api/packages/${id}`, { method: "DELETE" });
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
            RITUAL CURATION
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light uppercase text-[#FBF9F5]">
            CURATED PACKAGES
          </h1>
        </div>

        <button
          onClick={openAddModal}
          className="btn-luxury-light text-xs py-2.5 px-6 tracking-[0.18em]"
        >
          <Plus className="w-3.5 h-3.5 mr-2" />
          <span>ADD NEW PACKAGE</span>
        </button>
      </div>

      {/* Packages Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-[#1A1817] rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => {
          const serviceList =
            typeof pkg.includedServices === "string"
              ? JSON.parse(pkg.includedServices || "[]")
              : Array.isArray(pkg.includedServices)
              ? pkg.includedServices
              : [];

          return (
            <div
              key={pkg.id}
              className="bg-[#1A1817] rounded-2xl border border-[rgba(251,249,245,0.08)] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="editorial-label text-[8px] text-[#A75D46]">
                    {pkg.duration} MINS
                  </span>
                  <span
                    className={`text-[9px] uppercase tracking-wider font-semibold ${
                      pkg.active ? "text-emerald-400" : "text-[#6B6661]"
                    }`}
                  >
                    {pkg.active ? "ACTIVE" : "DISABLED"}
                  </span>
                </div>

                <h3 className="font-serif-luxury text-2xl font-light uppercase text-[#FBF9F5] mb-2">
                  {pkg.name}
                </h3>
                <p className="text-xs text-[#A39E99] font-light leading-relaxed mb-6">
                  {pkg.description}
                </p>

                <div className="mb-6 pb-4 border-b border-[rgba(251,249,245,0.08)]">
                  <span className="font-serif-luxury text-3xl text-[#A75D46]">
                    ₹{pkg.price.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  <span className="editorial-label text-[8px] text-[#A39E99] block mb-2">
                    INCLUSIONS:
                  </span>
                  {serviceList.map((s: string) => (
                    <div key={s} className="flex items-center gap-2 text-xs text-[#EBE6DC]">
                      <Check className="w-3.5 h-3.5 text-[#A75D46]" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(251,249,245,0.08)] flex justify-end gap-2">
                <button
                  onClick={() => openEditModal(pkg)}
                  className="p-2 rounded-lg bg-[#241D1A] text-[#A39E99] hover:text-[#FBF9F5]"
                  title="Edit Package"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className="p-2 rounded-lg bg-[#241D1A] text-[#A39E99] hover:text-rose-400"
                  title="Delete Package"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141312]/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#1A1817] text-[#FBF9F5] rounded-2xl p-6 sm:p-8 border border-[rgba(251,249,245,0.12)] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[rgba(251,249,245,0.08)]">
              <h3 className="font-serif-luxury text-2xl font-light uppercase">
                {editingPackage ? "EDIT PACKAGE" : "ADD NEW PACKAGE"}
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
                  PACKAGE NAME *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. THE SIGNATURE COUTURE"
                  className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div>
                <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                  INCLUDED SERVICES (JSON ARRAY FORMAT)
                </label>
                <textarea
                  rows={3}
                  value={form.includedServices}
                  onChange={(e) =>
                    setForm({ ...form, includedServices: e.target.value })
                  }
                  className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] font-mono text-[11px] focus:outline-none focus:border-[#A75D46]"
                />
              </div>

              <div>
                <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                  DESCRIPTION
                </label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
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
                  SAVE PACKAGE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
