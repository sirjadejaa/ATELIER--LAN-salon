import Link from "next/link";
import {
  Calendar,
  Scissors,
  Users,
  Package,
  Sparkles,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  LayoutDashboard,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

export const metadata = {
  title: "Admin Sanctuary | ATELIER ÉLAN",
  description: "Back-office management suite for Atelier Élan",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Bookings", href: "/admin/bookings", icon: Calendar },
    { label: "Services", href: "/admin/services", icon: Scissors },
    { label: "Staff / Artists", href: "/admin/staff", icon: Users },
    { label: "Packages", href: "/admin/packages", icon: Package },
    { label: "Before & After", href: "/admin/before-after", icon: Sparkles },
    { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#141312] text-[#FBF9F5] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1A1817] border-r border-[rgba(251,249,245,0.08)] flex flex-col justify-between p-6 flex-shrink-0">
        <div>
          {/* Brand header */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[rgba(251,249,245,0.08)]">
            <Link href="/admin" className="flex flex-col">
              <span className="font-serif-luxury text-xl font-light text-[#FBF9F5]">
                ATELIER ÉLAN
              </span>
              <span className="editorial-label text-[8px] text-[#A75D46] tracking-[0.25em]">
                MANAGEMENT SUITE
              </span>
            </Link>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Live" />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#A39E99] hover:text-[#FBF9F5] hover:bg-[#241D1A] transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#A75D46]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom studio switch */}
        <div className="pt-6 mt-6 border-t border-[rgba(251,249,245,0.08)]">
          <Link
            href="/"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-[#EBE6DC] bg-[#241D1A] hover:bg-[#2F2723] transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#A75D46]" />
              <span>View Public Studio</span>
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#A39E99]" />
          </Link>
        </div>
      </aside>

      {/* Main Admin Content View */}
      <main className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto max-h-screen bg-[#141312]">
        {children}
      </main>
    </div>
  );
}
