"use client";

import { useState, useEffect } from "react";
import { Save, CheckCircle2, Building, Phone, MapPin } from "lucide-react";
import { INITIAL_SETTINGS } from "@/lib/data";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.salonName) setSettings(data);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 max-w-4xl animate-pulse">
        <div className="h-10 bg-[#1A1817] rounded-xl w-1/3" />
        <div className="h-64 bg-[#1A1817] rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Top Header */}
      <div className="pb-6 border-b border-[rgba(251,249,245,0.08)]">
        <span className="editorial-label text-[#A75D46] block mb-1">
          SANCTUARY CONFIGURATION
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light uppercase text-[#FBF9F5]">
          STUDIO SETTINGS & METADATA
        </h1>
      </div>

      <form onSubmit={handleSave} className="space-y-8 text-xs">
        {/* Studio Identity */}
        <div className="bg-[#1A1817] p-6 sm:p-8 rounded-2xl border border-[rgba(251,249,245,0.08)] space-y-4">
          <div className="flex items-center gap-2 pb-4 border-b border-[rgba(251,249,245,0.08)]">
            <Building className="w-4 h-4 text-[#A75D46]" />
            <h3 className="font-serif-luxury text-xl text-[#FBF9F5] uppercase">
              Brand & Wordmark
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                SALON BRAND NAME
              </label>
              <input
                type="text"
                value={settings.salonName}
                onChange={(e) =>
                  setSettings({ ...settings, salonName: e.target.value })
                }
                className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
              />
            </div>

            <div>
              <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                TAGLINE
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) =>
                  setSettings({ ...settings, tagline: e.target.value })
                }
                className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
              />
            </div>
          </div>
        </div>

        {/* Contact Channels */}
        <div className="bg-[#1A1817] p-6 sm:p-8 rounded-2xl border border-[rgba(251,249,245,0.08)] space-y-4">
          <div className="flex items-center gap-2 pb-4 border-b border-[rgba(251,249,245,0.08)]">
            <Phone className="w-4 h-4 text-[#A75D46]" />
            <h3 className="font-serif-luxury text-xl text-[#FBF9F5] uppercase">
              Concierge Channels
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                PHONE NUMBER
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) =>
                  setSettings({ ...settings, phone: e.target.value })
                }
                className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
              />
            </div>

            <div>
              <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                WHATSAPP NUMBER (NO SPACES/+)
              </label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) =>
                  setSettings({ ...settings, whatsapp: e.target.value })
                }
                className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
              />
            </div>

            <div>
              <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                CONCIERGE EMAIL
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings({ ...settings, email: e.target.value })
                }
                className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
              />
            </div>
          </div>
        </div>

        {/* Location & Hours */}
        <div className="bg-[#1A1817] p-6 sm:p-8 rounded-2xl border border-[rgba(251,249,245,0.08)] space-y-4">
          <div className="flex items-center gap-2 pb-4 border-b border-[rgba(251,249,245,0.08)]">
            <MapPin className="w-4 h-4 text-[#A75D46]" />
            <h3 className="font-serif-luxury text-xl text-[#FBF9F5] uppercase">
              Location & Timings
            </h3>
          </div>

          <div>
            <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
              PHYSICAL STUDIO ADDRESS
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) =>
                setSettings({ ...settings, address: e.target.value })
              }
              className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
            />
          </div>

          <div>
            <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
              OPENING HOURS SCHEDULE
            </label>
            <input
              type="text"
              value={settings.openingHours}
              onChange={(e) =>
                setSettings({ ...settings, openingHours: e.target.value })
              }
              className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                INSTAGRAM HANDLE
              </label>
              <input
                type="text"
                value={settings.instagram}
                onChange={(e) =>
                  setSettings({ ...settings, instagram: e.target.value })
                }
                className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
              />
            </div>

            <div>
              <label className="editorial-label text-[9px] text-[#A39E99] block mb-1.5">
                GOOGLE MAPS LINK
              </label>
              <input
                type="url"
                value={settings.googleMapsUrl}
                onChange={(e) =>
                  setSettings({ ...settings, googleMapsUrl: e.target.value })
                }
                className="w-full bg-[#141312] border border-[rgba(251,249,245,0.12)] rounded-xl px-4 py-3 text-[#FBF9F5] focus:outline-none focus:border-[#A75D46]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between pt-4">
          {saved && (
            <span className="inline-flex items-center gap-2 text-emerald-400 text-xs animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" />
              <span>Studio settings saved and published live.</span>
            </span>
          )}
          {!saved && <div />}

          <button
            type="submit"
            className="btn-luxury-light text-xs py-3 px-8 tracking-[0.2em]"
          >
            <Save className="w-4 h-4 mr-2" />
            <span>SAVE CONFIGURATION</span>
          </button>
        </div>
      </form>
    </div>
  );
}
