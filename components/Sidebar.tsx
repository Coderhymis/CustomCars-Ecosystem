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
    { name: "Garage Home", href: "/", icon: Home },
    { name: "3D Configurator", href: "/visualizer", icon: Aperture },
    { name: "Active Shop Bids", href: "/bids", icon: Zap },
    { name: "Shop Directory", href: "/directory", icon: MapPin },
    { name: "Cost Estimator", href: "/estimator", icon: Calculator },
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
    <aside className="w-[260px] bg-bg-secondary border-r border-border flex flex-col fixed h-screen z-50 transition-transform duration-300 md:translate-x-0 -translate-x-full">
      {/* Sidebar Logo */}
      <div className="p-6 border-b border-border flex items-center gap-3 text-xl font-extrabold tracking-tight">
        <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-accent-blue to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-accent-blue/20">
          R
        </div>
        <div className="text-text-primary">
          Ride<span className="bg-gradient-to-r from-text-primary to-accent-blue bg-clip-text text-transparent">Canvas</span>
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
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-sm font-medium text-xs transition-all duration-150 ${
                    active 
                      ? "bg-accent-blue/10 text-accent-blue border-l-2 border-accent-blue pl-[14px]" 
                      : "text-text-secondary hover:bg-bg-primary hover:text-text-primary"
                  }`}
                >
                  <Icon className={`w-[16px] h-[16px] ${active ? "text-accent-blue" : "text-text-secondary"}`} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Section divider */}
        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-text-muted px-4 block mb-2">Shop & Social</span>
          <ul className="space-y-1">
            {socialItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-sm font-medium text-xs transition-all duration-150 ${
                      active 
                        ? "bg-accent-blue/10 text-accent-blue border-l-2 border-accent-blue pl-[14px]" 
                        : "text-text-secondary hover:bg-bg-primary hover:text-text-primary"
                    }`}
                  >
                    <Icon className={`w-[16px] h-[16px] ${active ? "text-accent-blue" : "text-text-secondary"}`} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Section divider dashboards */}
        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-text-muted px-4 block mb-2">Portals</span>
          <ul className="space-y-1">
            {dashboardItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-sm font-medium text-xs transition-all duration-150 ${
                      active 
                        ? "bg-accent-blue/10 text-accent-blue border-l-2 border-accent-blue pl-[14px]" 
                        : "text-text-secondary hover:bg-bg-primary hover:text-text-primary"
                    }`}
                  >
                    <Icon className={`w-[16px] h-[16px] ${active ? "text-accent-blue" : "text-text-secondary"}`} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* User profile Summary footer */}
      <div className="p-4 border-t border-border bg-bg-primary/45">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-blue to-purple-600 flex items-center justify-center font-bold text-white border border-border">
            AD
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-text-primary">Arjun Das</span>
            <span className="text-[10px] text-text-muted font-medium">Car Enthusiast</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
