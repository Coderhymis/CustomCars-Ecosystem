// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, MessageSquare, Sparkles, Sun, Moon } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Sync theme on mount
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") as "light" | "dark" || "dark";
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/directory?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header className="h-[70px] bg-bg-primary/75 backdrop-blur-md border-b border-border flex items-center justify-between px-6 md:px-8 sticky top-0 z-40">
      
      {/* Apple-style Search Bar */}
      <form 
        onSubmit={handleSearchSubmit} 
        className="flex items-center bg-bg-secondary border border-border rounded-sm px-4 py-2 w-72 md:w-80 gap-2 focus-within:border-accent-blue/50 focus-within:bg-bg-secondary/90 transition-all duration-300"
      >
        <Search className="w-4 h-4 text-text-muted" />
        <input
          type="text"
          placeholder="Search cars, shops, or modifications..."
          className="bg-transparent border-none outline-none text-text-primary text-xs w-full placeholder:text-text-muted font-medium"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* Sleek Theme Switcher Button */}
        <button 
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="relative w-9 h-9 rounded-full border border-border bg-bg-secondary hover:bg-bg-primary flex items-center justify-center text-text-secondary hover:text-text-primary transition-all duration-300 shadow-sm"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-accent-yellow transition-transform duration-300 rotate-0 scale-100" />
          ) : (
            <Moon className="w-4 h-4 text-accent-blue transition-transform duration-300 rotate-0 scale-100" />
          )}
        </button>

        <button className="relative w-9 h-9 rounded-full border border-border bg-bg-secondary hover:bg-bg-primary flex items-center justify-center text-text-secondary hover:text-text-primary transition-all duration-300 shadow-sm">
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-[8px] right-[8px] w-2 h-2 bg-accent-red rounded-full border-2 border-bg-secondary"></span>
        </button>
        
        <button className="relative w-9 h-9 rounded-full border border-border bg-bg-secondary hover:bg-bg-primary flex items-center justify-center text-text-secondary hover:text-text-primary transition-all duration-300 shadow-sm">
          <MessageSquare className="w-4.5 h-4.5" />
          <span className="absolute top-[8px] right-[8px] w-2 h-2 bg-accent-red rounded-full border-2 border-bg-secondary"></span>
        </button>

        <button 
          onClick={() => router.push("/visualizer")}
          className="bg-accent-blue hover:bg-accent-blue-hover text-white text-xs font-bold px-4 py-2 rounded-sm flex items-center gap-1.5 shadow-md shadow-accent-blue/10 hover:shadow-accent-blue/20 hover:-translate-y-0.5 transition-all duration-300"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Configurator</span>
        </button>
      </div>
    </header>
  );
}
