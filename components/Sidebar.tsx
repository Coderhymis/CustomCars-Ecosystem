// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, Aperture, MapPin, Calculator, Columns, 
  ShoppingBag, Users, Wallet, User, Store, ShieldCheck, Zap 
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "AI Visualizer", href: "/visualizer", icon: Aperture },
    { name: "Shop Directory", href: "/directory", icon: MapPin },
    { name: "Price Estimator", href: "/estimator", icon: Calculator },
  ];

  const socialItems = [
    { name: "Marketplace", href: "/marketplace", icon: ShoppingBag },
    { name: "Community", href: "/community", icon: Users },
    { name: "Finance & BNPL", href: "/finance", icon: Wallet },
  ];

  const dashboardItems = [
    { name: "User Dashboard", href: "/dashboard/user", icon: User },
    { name: "Shop Dashboard", href: "/dashboard/shop", icon: Store },
    { name: "Admin Portal", href: "/dashboard/admin", icon: ShieldCheck },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <aside className="w-[260px] bg-bg-secondary border-r border-white/10 flex flex-col fixed h-screen z-50 transition-transform duration-300 md:translate-x-0 -translate-x-full">
      {/* Sidebar Logo */}
      <div className="p-6 border-b border-white/10 flex items-center gap-3 text-xl font-extrabold tracking-tight">
        <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-accent-red to-accent-blue flex items-center justify-center font-bold text-white shadow-lg shadow-accent-blue/30">
          C
        </div>
        <div className="text-white">
          Custom<span className="bg-gradient-to-r from-white to-accent-blue bg-clip-text text-transparent">Cars</span>
        </div>
      </div>

      {/* Sidebar Menu List */}
      <nav className="flex-grow overflow-y-auto px-3 py-4 space-y-6">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-sm font-medium text-sm transition-all duration-150 ${
                    active 
                      ? "bg-gradient-to-r from-accent-blue/15 to-accent-blue/2 text-white border-l-3 border-accent-blue pl-[13px]" 
                      : "text-text-secondary hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className={`w-[18px] h-[18px] ${active ? "text-accent-blue" : "text-text-secondary"}`} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Section divider */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted px-4 block mb-2">Shop & Social</span>
          <ul className="space-y-1">
            {socialItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-sm font-medium text-sm transition-all duration-150 ${
                      active 
                        ? "bg-gradient-to-r from-accent-blue/15 to-accent-blue/2 text-white border-l-3 border-accent-blue pl-[13px]" 
                        : "text-text-secondary hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className={`w-[18px] h-[18px] ${active ? "text-accent-blue" : "text-text-secondary"}`} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Section divider dashboards */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted px-4 block mb-2">Portals</span>
          <ul className="space-y-1">
            {dashboardItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-sm font-medium text-sm transition-all duration-150 ${
                      active 
                        ? "bg-gradient-to-r from-accent-blue/15 to-accent-blue/2 text-white border-l-3 border-accent-blue pl-[13px]" 
                        : "text-text-secondary hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className={`w-[18px] h-[18px] ${active ? "text-accent-blue" : "text-text-secondary"}`} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* User profile Summary footer */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-blue to-purple-600 flex items-center justify-center font-bold text-white border-2 border-white/10">
            AD
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white">Arjun Das</span>
            <span className="text-[10px] text-text-muted">Car Enthusiast</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
