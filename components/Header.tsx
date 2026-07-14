// components/Header.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, MessageSquare, Sparkles } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/directory?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header className="h-[70px] bg-bg-primary/75 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 md:px-8 sticky top-0 z-40">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex items-center bg-white/5 border border-white/10 rounded-sm px-4 py-2 w-72 md:w-80 gap-2 focus-within:border-accent-blue focus-within:bg-white/8 transition-all">
        <Search className="w-4 h-4 text-text-muted" />
        <input
          type="text"
          placeholder="Search cars, shops, or modifications..."
          className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-text-muted"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {/* Header Actions */}
      <div className="flex items-center gap-4">
        <button className="relative w-9 h-9 rounded-full flex items-center justify-center text-text-secondary hover:bg-white/5 hover:text-white transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-[6px] right-[6px] w-[7px] h-[7px] bg-accent-red rounded-full border border-bg-secondary"></span>
        </button>
        
        <button className="relative w-9 h-9 rounded-full flex items-center justify-center text-text-secondary hover:bg-white/5 hover:text-white transition-all">
          <MessageSquare className="w-5 h-5" />
          <span className="absolute top-[6px] right-[6px] w-[7px] h-[7px] bg-accent-red rounded-full border border-bg-secondary"></span>
        </button>

        <button 
          onClick={() => router.push("/visualizer")}
          className="bg-gradient-to-r from-accent-blue to-blue-800 hover:from-accent-blue-hover hover:to-blue-700 text-white text-xs font-bold px-4 py-2 rounded-sm flex items-center gap-2 shadow-lg shadow-accent-blue/20 hover:shadow-accent-blue/40 transition-all hover:-translate-y-0.5 duration-200"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Visualizer</span>
        </button>
      </div>
    </header>
  );
}
