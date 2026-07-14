// app/marketplace/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Search, Plus, Star } from "lucide-react";

export default function MarketplacePage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");

  const parts = [
    { name: "Forged Monoblock Alloys", brand: "BBS Wheels", price: "₹1,80,000", type: "Wheels", rating: 4.9, img: "https://images.unsplash.com/photo-1611245801314-e0e562b22ee7?auto=format&fit=crop&q=80&w=400" },
    { name: "Slip-On Titanium Exhaust", brand: "Akrapovic", price: "₹2,40,000", type: "Exhaust", rating: 4.8, img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400" },
    { name: "GT4 Carbon Fiber Wing", brand: "Vorsteiner", price: "₹85,000", type: "Spoilers", rating: 4.7, img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=400" },
    { name: "V-Spec Carbon Side Skirts", brand: "DMC", price: "₹62,000", type: "Body Kits", rating: 4.5, img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=400" },
    { name: "Aero Wrap Vinyl Series", brand: "Avery Dennison", price: "₹48,000", type: "Wraps", rating: 4.6, img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=400" }
  ];

  const categories = [
    { id: "all", label: "All Equipment" },
    { id: "Wheels", label: "Wheels & Alloys" },
    { id: "Body Kits", label: "Body Aero Kits" },
    { id: "Exhaust", label: "Exhaust Systems" },
    { id: "Wraps", label: "Vinyl Wraps" }
  ];

  const filteredParts = activeCategory === "all" 
    ? parts 
    : parts.filter(p => p.type === activeCategory);

  return (
    <div className="flex flex-col gap-6 pb-16">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h2 className="text-xl md:text-2xl font-extrabold text-white">Parts Marketplace</h2>
          <p className="text-text-secondary text-xs mt-0.5">Order premium OEM and aftermarket performance components shipped directly to verified modification studios.</p>
        </div>
      </div>

      {/* Horizontal categories selectors */}
      <div className="flex flex-wrap gap-3 bg-bg-secondary border border-white/10 p-3 rounded-md">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${
              activeCategory === cat.id 
                ? "bg-accent-blue text-white shadow-md shadow-accent-blue/15" 
                : "bg-white/4 border border-white/5 text-text-secondary hover:bg-white/8 hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredParts.map((item, index) => (
          <div key={index} className="glass-panel p-4 rounded-md flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="aspect-[1.2] rounded-sm overflow-hidden border border-white/10 bg-black/40">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">{item.brand}</span>
                <h4 className="text-xs font-bold text-white leading-snug">{item.name}</h4>
              </div>
            </div>

            <div className="flex justify-between items-center mt-5 border-t border-white/5 pt-3">
              <span className="text-sm font-extrabold text-white">{item.price}</span>
              <button 
                onClick={() => {
                  alert(`${item.name} configured on active build configurations! Opening visualizer...`);
                  router.push("/visualizer");
                }}
                className="w-8 h-8 rounded-full bg-white/4 border border-white/10 hover:bg-accent-blue hover:border-accent-blue text-white flex items-center justify-center transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
